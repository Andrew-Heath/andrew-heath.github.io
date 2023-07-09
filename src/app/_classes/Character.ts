import { ACMOD, BOTH, CAST, DEX, DRMOD, NONE } from "../_models/consts"
import { CharacterModel } from "../_models/items"
import { median, uuid } from "../_utils/misc"
import { Armor } from "./Armor"
import { Shield } from "./Shield"
import { Weapon } from "./Weapon"

/*
    Character
    -- Defined by several combined factors
    -- Abilities Scores (STR, DEX, CON, CAST)
    -- Has Armor, Weapon, Shield (opt), Sneak Attack (opt)
    -- Has level, which determined proficiency (which could be set manually instead)

    Character.name - string, the name of the Character
    Character.id - string, id to reference the Character by
    Character.EC - number, the Character's EC Value
    Character.AC - number, the Character's AC Value
    Character.DR - number, the Character's DR Value
    Character.ACC - number, the Character's Attack Bonus
    Character.DICE - Dice, the Character's Weapon Dice and Bonus Dice
    Character.DMG - number, the Character's Static Damage
    Character.SA - SneakAttack | null, the character's Sneak Attack ammount
*/
export class Character {
    public name: string
    public id: string
    private armor: Armor
    private weapon: Weapon
    private shield: Shield | null = null
    public SA: SneakAttack | null = null
    
    private STR:  number = 0
    private DEX:  number = 0
    private CON:  number = 0
    private CAST: number = 0

    private PROF: number = 2

    public EC: number = 0
    public AC: number = 0
    public DR: number = 0
    public ACC: number = 0
    public DICE: string = ''
    public DMG: number = 0

    constructor({
        name='',
        level=1,
        prof=null,
        STR=0,
        DEX=0,
        CON=0,
        CAST=0,
        armor,
        weapon,
        shield=null,
        sneakAttack=0
    }: CharacterModel) {
        this.name = name
        this.id = uuid(name)
        this.PROF = prof || Math.ceil(level / 4) + 1
        this.STR = STR
        this.DEX = DEX
        this.CON = CON
        this.CAST = CAST
        this.armor = armor
        this.weapon = weapon
        this.shield = shield
        this.SA = new SneakAttack(sneakAttack)
    }

    private setEC() {
        const {
            ecMod: armorEc,
            maxDex,
            magic
        } = this.armor

        const dex = this.DEX

        const shieldEc = this.shield?.ecMod || 0

        const finalEc = 10 + armorEc + shieldEc + magic + Math.min(maxDex, dex)

        this.EC = finalEc
    }

    private setAC() {
        const {
            acMod: armorAc,
            maxCon,
            conApplies
        } = this.armor

        const con = [ACMOD, BOTH].includes(conApplies) ? median(0, this.CON, maxCon) : 0

        const shieldAc = this.shield?.acMod || 0

        const finalAC = this.EC + armorAc + shieldAc + con

        this.AC = finalAC
    }

    private setDR() {
        const {
            drMod: armorDr,
            maxCon,
            conApplies,
            magic
        } = this.armor

        const con = [DRMOD, BOTH].includes(conApplies) ? median(0, this.CON, maxCon) : 0

        const finalDr = armorDr + con + magic

        this.DR = finalDr
    }

    private setACC() {
        const {
            accMod,
            dexMod,
            magic
        } = this.weapon

        const {
            DEX: dex,
            PROF: prof
        } = this

        const finalAcc = Math.floor(accMod * prof) + Math.floor(dexMod * dex) + magic

        this.ACC = finalAcc
    }

    private setDICE() {
        this.DICE = this.weapon.dice
    }

    private setDMG() {
        const {
            dmgMod,
            strMod,
            magic,
            dmgAbility
        } = this.weapon

        const {
            STR: str,
            DEX: dex,
            CAST: cast,
            PROF: prof
        } = this

        let ability
        switch (dmgAbility) {
            case DEX:
                ability = dex
                break;

            case CAST:
                ability = cast
                break;

            case NONE:
                ability = 0
                break;
        
            default:
                ability = str
                break;
        }

        const finalDmg = Math.floor(dmgMod * prof) + Math.floor(strMod * ability) + magic

        this.DMG = finalDmg
    }
    
}