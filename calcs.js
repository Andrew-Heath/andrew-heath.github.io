// CONSTS
const DEBUG = false
const ADV = "ADV", NORM = "NORM", DADV = "DADV"

// run on page interactive
document.addEventListener("readystatechange", event => {
    if (event.target.readyState === "interactive") {
        displayArmorProps()
        displayWeaponProps()
        runCalculations()
    }
})

// runs the main calculation
function runCalculations() {
    makeBar()
    const startTime = new Date()
    toggleButton()


    // make target
    const target = new Target()
    // make attacker
    const attacker = new Attacker()

    // calculate accuracy
    // target numbers
    const hitTN = max(min(target.EC - attacker.ACC, 19),3)
    const critTN = min(hitTN + 10, 20)
    const grazeTN = max(hitTN - 10, 2)

    displayValue.accuracy.tn.crit(critTN)
    displayValue.accuracy.tn.hit(hitTN)
    displayValue.accuracy.tn.graze(grazeTN)

    // percentages
    const critPer = attacker.d20[critTN]
    const hitPer = attacker.d20[hitTN] - critPer
    const grazePer = attacker.d20[grazeTN] - critPer - hitPer
    const missPer = 1 - critPer - hitPer - grazePer

    displayValue.accuracy.percent.crit(formatPercent(critPer))
    displayValue.accuracy.percent.hit(formatPercent(hitPer))
    displayValue.accuracy.percent.graze(formatPercent(grazePer))
    displayValue.accuracy.percent.miss(formatPercent(missPer))

    
    // calculate damage

    // calc DR, halved if rolls is at ADV
    const drMod = attacker.d20[0] === ADV ? .5 : 1
    const totalDr = Math.floor(target.DR * drMod)

    // min graze damage: (numWepDice + numBonusDice + static)/2 - DR
    const minGraze = Math.floor((attacker.DICE[0].min + attacker.DICE[1].min + attacker.DMG) / 2) - totalDr
    // add sneak attack
    let minHit = (attacker.DICE[0].min + attacker.DICE[1].min + attacker.DMG) - totalDr
    if (minHit > 0) minHit += attacker.sa.min
    // add sneak attack
    let minCrit = (attacker.DICE[0].min + attacker.DICE[1].min + attacker.DMG) * 2 - totalDr
    if (minCrit > 0) minCrit += attacker.sa.min * 2

    displayValue.damage.graze.min(max(minGraze, 0))
    displayValue.damage.hit.min(max(minHit, 0))
    displayValue.damage.crit.min(max(minCrit, 0))

    // max graze damage: (numWepDice + numBonusDice + static)/2 - DR
    const maxGraze = Math.floor((attacker.DICE[0].max + attacker.DICE[1].max + attacker.DMG) / 2) - totalDr
    // add sneak attack
    let maxHit = (attacker.DICE[0].max + attacker.DICE[1].max + attacker.DMG) - totalDr
    if (maxHit > 0) maxHit += attacker.sa.max
    // add sneak attack
    let maxCrit = (attacker.DICE[0].max + attacker.DICE[1].max + attacker.DMG) * 2 - totalDr
    if (maxCrit > 0) maxCrit += attacker.sa.max * 2

    displayValue.damage.graze.max(max(maxGraze, 0))
    displayValue.damage.hit.max(max(maxHit, 0))
    displayValue.damage.crit.max(max(maxCrit, 0))

    // actual dice calculations
    const testIterations = 100000
    const testRolls = rollSets(testIterations, attacker.DICE)

    // average graze logic
    const avgGraze = average(testRolls, attacker, target, .5)
    displayValue.damage.graze.avg(avgGraze)

    // average hit logic
    const avgHitSa = average(testRolls, attacker, target, 1, {canSa: true})
    const avgHit = average(testRolls, attacker, target, 1)
    displayValue.damage.hit.avg(avgHitSa)

    // average crit logic
    const avgCritSa = average(testRolls, attacker, target, 2, {canSa: true})
    const avgCrit = average(testRolls, attacker, target, 2)
    displayValue.damage.crit.avg(avgCritSa)

    // calculate DPR
    // need accuracy percentages
    // need avg graze, hit, and crit damages
    const grazeDpr = avgGraze * grazePer
    const hitDpr = avgHit * hitPer
    const hitDprSa = avgHitSa * hitPer
    const critDpr = avgCrit * critPer
    const critDprSa = avgCritSa * critPer

    const subDprSa = grazeDpr + hitDprSa + critDprSa
    const subDpr = grazeDpr + hitDpr + critDpr

    const totalDpr = formatDecimal(subDprSa + subDpr * max((attacker.numAtk - 1), 0))

    displayValue.dpr(totalDpr)
        
    toggleButton()
    logDuration(startTime, new Date())
}

// takes a test iteration of sets of XdY dice, rolls each set
// returns array of results
function rollSets(iter, dice) {
    // determin one set or multiple
    let toRoll = []
    if (Array.isArray(dice)) toRoll = [...dice]
    else toRoll = [dice]

    let sets = []
    DEBUG && console.log(`  rolling ${toRoll(dice => dice.type)}`)
    // loop based on iter sets
    DEBUG && console.log(`    rolling sets`)
    for (let i = 0; i < iter; i++) {
        // roll each dice and save to array
        let sum = toRoll.reduce((acc, curr) => acc + curr.roll(), 0)
        DEBUG && console.log(`      sum: ${sum}`)
        sets.push(sum)
    }
    
    return sets
}

// takes an array of numbers, min value 0
// returns the average of them, applying bonuses and penalties
function average(source, attacker, target, mod=1, {canSa=false, minDmg=0}={canCa: false, minDmg: 0}) {
    DEBUG && console.log(`      source sets: ${source}`)

    const static = attacker.DMG
    const dr = target.DR
    const _minDmg = minDmg > 0 ? minDmg : 0

    // reduce source list, and apply bonuses and penalties
    const total = source.reduce((total, curr) => {
        // get result of roll, add static, subtract dr
        const result = (curr + static) * mod - dr
        DEBUG && console.log(`        ${result} = (${curr} + ${static}) * ${mod} - ${dr}`)

        DEBUG && console.log(`        ${total} + ${result}`)
        // if roll results in 0 damage, ignore
        if (result < _minDmg) return total + _minDmg
        const netResult = result + (canSa ? attacker.sa.avg : 0)
        if (netResult < _minDmg) return total + _minDmg
        return total + netResult
    })
    DEBUG && console.log(`      total: ${total}`)

    return formatDecimal(total / source.length)
}

// toggles button disabled and toggles loader
function toggleButton() {
    // const button = document.getElementById('runCalcButton')
    // button.disabled = !button.disabled

    // toggleLoader(button.disabled)
}

// toggles overlay and loader
function toggleLoader(show) {
    DEBUG && console.log('toggle loader')
    var overlay = document.getElementById("overlay")
    if (show) {
        DEBUG && console.log('remove hidden')
        document.getElementById("overlay").classList.remove('hidden')
    } else {
        DEBUG && console.log('add hidden')
        document.getElementById("overlay").classList.add('hidden')
    }
}

/*
    DiceSet
    -- Takes an XdY formatted string
    -- can return type and roll to return a result.

    DiceSet.type - string, "XdY"
    DiceSet.roll - number, dice roll result
    DiceSet.min - number, minimum result possible (X)
    diceSet.max - number, maximum result possible(X*Y)
*/
class DiceSet {    
    constructor(dice) {
        const [num, sides] = dice.split('d')
        this.num = Number(num)
        this.sides = Number(sides)
    }

    get type() {
        return `${this.num}d${this.sides}`
    }

    get min() {
        return this.num
    }

    get max() {
        return this.num * this.sides
    }

    roll() {
        DEBUG && console.log(`      rolling ${this.type}`)
        let total = 0
        for (let i = 0; i < this.num; i++) total += this._rollDie(this.sides)
        DEBUG && console.log(`      ${dice} result: ${total}`)
        return total
    }

    _rollDie() {
        const out = Math.floor(Math.random() * this.sides) + 1
        DEBUG && console.log(`        rolling a d${this.sides}: ${out}`)
        return out
    }
}

/*
    Target
    -- Defined by target fields
    -- Sets Target EC and DR for Attacker

    Target.EC - number, Target's EC value
    Target.DR - number, Target's DR value
*/
class Target {
    _propList = [
        ['prof', 'tar_prof'],
        ['dex', 'tar_dex'],
        ['con', 'tar_con'],
        ['armType', 'tar_armor_type'],
        ['magic', 'tar_magic'],
        ['miscEc', 'tar_misc_ec'],
        ['miscDr', 'tar_misc_dr'],
    ]
    constructor() {
        this._propList.map(([key, id]) => this[key] = getValue(id) )
        this.armor = new Armor(this.armType)
    }

    get EC() {
        // EC = 10 + Armor Prof + DEX + Magic + Misc
        // Armor Prof = Prof * armor.ecMod
        // DEX = minimum(dex, maxDex)
        const armorProf = Math.floor(this.prof * this.armor.ecMod)
        const armorDex = min(this.armor.maxDex, this.dex)
        return 10 + armorProf + armorDex + this.magic + this.miscEc
    }

    get DR() {
        // DR = Armor Prof + CON + Magic + Misc
        // Armor Prof = Prof * armor.drMod
        // CON = minimum(con, maxCon)
        const armorProf = this.prof * this.armor.drMod
        const armorCon = min(this.armor.maxCon, this.con)
        return armorProf + armorCon + this.magic + this.miscDr
    }
}

/*
    Armor
    -- Defined item with stat thresholds

    returns just the armor info
*/
class Armor {
    _armorLib = {
        unarmored: {
            ecMod: 1,
            drMod: 0,
            maxDex: 6,
            maxCon: 0
        },
        light: {
            ecMod: 1,
            drMod: .5,
            maxDex: 6,
            maxCon: 1
        },
        medium: {
            ecMod: 1,
            drMod: 1,
            maxDex: 3,
            maxCon: 3
        },
        heavy: {
            ecMod: .5,
            drMod: 1,
            maxDex: 1,
            maxCon: 6
        },
        lNatural: {
            ecMod: 1,
            drMod: .5,
            maxDex: 6,
            maxCon: 3
        },
        hNatural: {
            ecMod: .5,
            drMod: 1,
            maxDex: 3,
            maxCon: 6
        },
        mage: {
            ecMod: 1,
            drMod: .5,
            maxDex: 6,
            maxCon: 6
        },
        unaBarb: {
            ecMod: .5,
            drMod: 1,
            maxDex: 6,
            maxCon: 6
        },
        unaMonk: {
            ecMod: 1,
            drMod: 0,
            maxDex: 6,
            maxCon: 0
        }
    }

    constructor(type) {
        this.type = type
        Object.entries(this._armorLib[type]).forEach(([key, value]) => {
            this[key] = value
        })
    }
}

/*
    Attacker
    -- Defined by attacker fields
    -- sets Attacker accuracy, damage dice, and static damage
    -- also controls number of attacks, bonus dice, and sneak attack

    Attacker.ACC - number, the Attacker's Attack Bonus
    Attacker.DICE - [Dice], the Attacker's Weapon Dice and Bonus Dice
    Attacker.DMG - number, the Attacker's Static Damage
*/
class Attacker {
    _propList = [
        ['prof','atk_prof'],
        ['str','atk_str'],
        ['dex','atk_dex'],
        ['wepType','atk_wep_type'],
        ['magic', 'atk_magic'],
        ['miscAcc', 'atk_bonus_acc'],
        ['miscDmg', 'atk_bonus_dmg'],
        ['numAtk','atk_num_attacks']
    ]
    
    constructor() {
        this._propList.map(([key, id]) => this[key] = getValue(id) )
        this.weapon = new Weapon(this.wepType)

        this.special = SPECIAL_ATTACKS[getValue('atk_special_attack')]

        this.weaponDice = getDice('atk_wep_die_num', 'atk_wep_die_size', this.special.diceMod)
        this.bonusDice = getDice('atk_bonus_die_num', 'atk_bonus_die_size')

        this.sa = new SneakAttack(getValue('atk_num_sa'))

        this.d20 = D20[getValue('atk_roll_type')]
    }

    get ACC() {
        // ACC = Wep Prof + DEX + Magic + Misc
        // Wep Prof = Prof * (wep.accMod || this.special.accMod)
        // DEX = dex * wep.dexMod
        const wepProf = this.prof * (Number(this.special.accMod) || this.weapon.accMod)
        const wepDex = this.dex * this.weapon.dexMod
        return wepProf + wepDex + this.magic + this.miscAcc
    }

    get DMG() {
        // DMG = Wep Prof + STR + Magic + Misc
        // Wep Prof = Prof * (wep.accMod || this.special.accMod)
        // DEX = dex * wep.dexMod
        const wepProf = Math.floor(this.prof * (Number(this.special.dmgMod) || this.weapon.dmgMod))
        const wepStr = Math.floor(this.str * (Number(this.special.strMod) || this.weapon.strMod))
        return wepProf + wepStr + this.magic + this.miscDmg
    }

    get DICE() {
        return [this.weaponDice, this.bonusDice]
    }
}

// Special Attacks
// obj to track effects of special attacks
const SPECIAL_ATTACKS = {
    none: {},
    power_attack: {
        accMod: 0,
        diceMod: 2,
        strMod: 2
    },
    two_wep_fight: {
        accMod: .5,
        dmgMod: .5,
        strMod: .5
    },
    twin_fang: {
        // combine damage before DR
        accMod: .5,
        dmgMod: .5
    }
}

/*
    Weapon
    -- Defined item with stat thresholds

    returns just the weapon info
*/
class Weapon {
    _wepLib = {
        finesse: {
            accMod: 1,
            dexMod: 1,
            dmgMod: 1,
            strMod: .5,
        },
        balance: {
            accMod: 1,
            dexMod: 1,
            dmgMod: .5,
            strMod: 1
        },
        heavy: {
            accMod: .5,
            dexMod: 1,
            dmgMod: .5,
            strMod: 1
        },
        prop: {
            accMod: 1,
            dexMod: 1,
            dmgMod: 1,
            strMod: .5
        },
        mech: {
            accMod: 1,
            dexMod: 1,
            dmgMod: 1,
            strMod: 0
        },
        spell: {
            accMod: 1,
            dexMod: 1,
            dmgMod: 1,
            strMod: 1
        }
    }

    constructor(type) {
        this.type = type
        Object.entries(this._wepLib[type]).forEach(([key, value]) => {
            this[key] = value
        })
    }
}

/*
    Sneak Attack
    -- Shorthand class for referencing SA props

    SneakAttack.min - number, minimum damage (num)
    SneakAttack.avg - number, average damage (num * 3.5)
    SneakAttack.max - number, maximum damage (num * 6)
*/
class SneakAttack {
    constructor(num) {
        this.num = num
    }

    get min() {
        return this.num
    }

    get avg() {
        return this.num * 3.5
    }

    get max() {
        return this.num * 6
    }
}
    

// GETTERS
// These functions get values from the form

// gets a value by passing in the matchin element id
const getValue = id => {
    const value = document.getElementById(id).value
    const numVal = Number(value)
    return !Number.isNaN(numVal) ? numVal : value
}

// given num and side ids, optionally dice number multiplier
// returns DiceSet from ids, num adjusted by number multiplier (power attack, etc)
function getDice(numId, sideId, mod=1) {
    const num = getValue(numId) * (Number(mod) || 1)
    const sides = getValue(sideId)

    return new DiceSet(`${num}${sides}`)
}


// DISPLAYERS
// These functions set values on the results column

// sets element with id to text
const changeTextContent = (id, text) => {
    document.getElementById(id).textContent = text
}

const changeDisplay = id => text => changeTextContent(id, text)

// lib of all setters
const displayValue = {
    target: {
        ec: changeDisplay('target_total_ec'),
        dr: changeDisplay('target_total_dr')
    },
    armor: {
        ec: changeDisplay('value_armor_ec'),
        dr: changeDisplay('value_armor_dr'),
        maxDex: changeDisplay('value_armor_max_dex'),
        maxCon: changeDisplay('value_armor_max_con')
    },
    attacker: {
        acc: changeDisplay('attacker_total_acc'),
        dmg: changeDisplay('attacker_total_dmg')
    },
    weapon: {
        acc: changeDisplay('value_weapon_acc'),
        dmg: changeDisplay('value_weapon_dmg'),
    },
    accuracy: {
        tn: {
            crit: changeDisplay('result_crit_tn'),
            hit: changeDisplay('result_hit_tn'),
            graze: changeDisplay('result_graze_tn')
        },
        percent: {
            crit: changeDisplay('result_crit_percent'),
            hit: changeDisplay('result_hit_percent'),
            graze: changeDisplay('result_graze_percent'),
            miss: changeDisplay('result_miss_percent')
        }
    },
    damage: {
        graze: {
            min: changeDisplay('graze_min_dmg'),
            avg: changeDisplay('graze_avg_dmg'),
            max: changeDisplay('graze_max_dmg')
        },
        hit: {
            min: changeDisplay('hit_min_dmg'),
            avg: changeDisplay('hit_avg_dmg'),
            max: changeDisplay('hit_max_dmg')
        },
        crit: {
            min: changeDisplay('crit_min_dmg'),
            avg: changeDisplay('crit_avg_dmg'),
            max: changeDisplay('crit_max_dmg')
        }
    },
    dpr: changeDisplay('total_average_dpr')
}

// update armor property fields on armor select
function displayArmorProps() {
    const target = new Target()
    const attacker = new Attacker()

    displayValue.target.ec(target.EC)
    const isAdv = attacker.d20[0] === ADV
    const drText = isAdv ? `${Math.floor(target.DR / 2)} (${target.DR})` : target.DR
    displayValue.target.dr(drText)

    displayValue.armor.ec(Math.floor(target.armor.ecMod * target.prof))
    displayValue.armor.maxDex(target.armor.maxDex)

    displayValue.armor.dr(Math.floor(target.armor.drMod * target.prof))
    displayValue.armor.maxCon(target.armor.maxCon)
}

// update weapon property fields on weapon select
function displayWeaponProps() {
    const attacker = new Attacker()

    displayValue.attacker.acc(`+${attacker.ACC}`)
    const [wepDice, bonusDice] = attacker.DICE
    const saDice = attacker.sa.num
    const saText = `\nSneak Attack +${saDice}d6`
    let damageText = `${wepDice.type}+${attacker.DMG}`
    if (bonusDice.num > 0) damageText += `+${bonusDice.type}`
    if (attacker.weapon.type === 'finesse' && saDice > 0 ) damageText += saText
    displayValue.attacker.dmg(damageText)

    const acc = Math.floor((Number(attacker.special.accMod) || attacker.weapon.accMod) * attacker.prof)
    displayValue.weapon.acc(`Prof +${acc}, Dex +${attacker.dex}`)
    const dmg = Math.floor((Number(attacker.special.dmgMod) || attacker.weapon.dmgMod) * attacker.prof)
    const str = Math.floor(attacker.weapon.strMod * attacker.str)
    displayValue.weapon.dmg(`Prof +${dmg}, Str +${str}`)
}


// FORMATTERS
// These functions convert values into human readable text

// takes a number
// returns the number to 2 decimal places
function formatDecimal(dec) {
    const out = Math.floor(dec * 100) / 100
    DEBUG && console.log(`        formatDecimal: ${out}`)
    return out
}

// give a dice object
// returns dice in "XdY+AdB" format
function formatDiceSets(dice) {
    return (Array.isArray(dice) ? dice : [dice]).map(d => d.type).join('+')
}

// give a decimal percent
// returns a string, "00.00%" format
function formatPercent(num) {
    return `${Math.round(num * 10000) / 100}%`
}


// LOGGERS
// These functions log items to the console for debugging/tracking
// makes log bar to separate tests
function makeBar() {
    console.log('= = = = = = = = = =')
}

// telemetry tool to check calc duration
function logDuration(start, end) {
    const duration = end - start

    const totalSeconds = duration / 1000
    const reportSeconds = totalSeconds % 60

    const totalMinutes = (totalSeconds - reportSeconds) / 60
    const reportMinutes = totalMinutes % 60

    const totalHours = (totalMinutes - reportMinutes) / 60
    const reportHours = totalHours % 60

    let output = 'Duration:'
    if (reportHours > 0) output += ` ${reportHours}h`
    if (reportMinutes > 0) output += ` ${reportMinutes}m`
    if (reportSeconds > 0) output += ` ${reportSeconds}s`

    console.log(output)
}


// HELPERS
const min = (...nums) => Math.min(...nums)
const max = (...nums) => Math.max(...nums)

const D20 = {
    adv: INIT_ADV(),
    normal: INIT_NORMAL(),
    dadv: INIT_DADV()
}

function INIT_ADV() {
    return new Array(21).fill(0).map((v, i) => {
        if (i === 0) return 'ADV'
        const chance =  (1 - Math.pow((i - 1) / 20, 2))
        return Math.round(chance * 10000) / 10000
    })
}

function INIT_NORMAL () {
    return new Array(21).fill(0).map((v, i) => {
        if (i === 0) return 'NORM'
        return (21 - i) / 20
    })
}

function INIT_DADV () {
    return new Array(21).fill(0).map((v, i) => {
        if (i === 0) return ''
        const chance = Math.pow((21 - i) / 20, 2)
        return Math.round(chance * 10000) / 10000
    })
}