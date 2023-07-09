import { ABSORPTION, DEFLECT, COVER, NONE } from "./consts";
import { ArmorLib, ShieldLib, WeaponLib } from "./items";

// base armor stats to initialize with
export const armorLib: ArmorLib = {
    unarmored: {
        name: "Unarmored",
        ecMod: 0,
        acMod: 0,
        drMod: 0,
        maxDex: 5,
        maxCon: 0,
        magic: 0,
        conApplies: "acMod"
    },
    light: {
        name: "Light Armor",
        ecMod: 2,
        acMod: 4,
        drMod: 1,
        maxDex: 5,
        maxCon: 1,
        magic: 0,
        conApplies: "acMod"
    },
    medium: {
        name: "Medium Armor",
        ecMod: 1,
        acMod: 4,
        drMod: 4,
        maxDex: 3,
        maxCon: 3,
        magic: 0,
        conApplies: "acMod"
    },
    heavy: {
        name: "Heavy Armor",
        magic: 0,
        ecMod: 0,
        acMod: 5,
        drMod: 8,
        maxDex: 1,
        maxCon: 5,
        conApplies: "acMod"
    },
    lNatural: {
        name: "Natural Armor (Light)",
        magic: 0,
        ecMod: 1,
        acMod: 3,
        drMod: 3,
        maxDex: 5,
        maxCon: 3,
        conApplies: "acMod"
    },
    hNatural: {
        name: "Natural Armor (Heavy)",
        magic: 0,
        ecMod: 0,
        acMod: 3,
        drMod: 6,
        maxDex: 3,
        maxCon: 5,
        conApplies: "acMod"
    },
    mage: {
        name: "Mage Armor (Spell)",
        magic: 0,
        ecMod: 0,
        acMod: 3,
        drMod: 3,
        maxDex: 5,
        maxCon: 5,
        conApplies: "acMod"
    },
    unaBarb: {
        name: "Unarmored (Barbarian)",
        magic: 0,
        ecMod: 0,
        acMod: 3,
        drMod: 5,
        maxDex: 5,
        maxCon: 7,
        conApplies: "acMod"
    },
    unaMonk: {
        name: "Unarmored (Monk)",
        magic: 0,
        ecMod: 2,
        acMod: 0,
        drMod: 0,
        maxDex: 5,
        maxCon: 5,
        conApplies: "acMod"
    }
}

export const weaponLib: WeaponLib = {
    finesse: {
        name: "Finesse Weapon",
        dice: '1d6',
        magic: 0,
        accMod: 1,
        dexMod: 1,
        dmgMod: 1,
        strMod: .5,
        dmgAbility: "str"
    },
    balance: {
        name: "Balanced Weapon",
        dice: '1d8',
        magic: 0,
        accMod: 1,
        dexMod: 1,
        dmgMod: .5,
        strMod: 1,
        dmgAbility: "str"
    },
    heavy: {
        name: "Heavy Weapon",
        dice: '1d12',
        magic: 0,
        accMod: 1,
        dexMod: .5,
        dmgMod: .5,
        strMod: 1,
        dmgAbility: "str"
    },
    mech: {
        name: "Mechanical Weapon",
        dice: '1d10',
        magic: 0,
        accMod: 1,
        dexMod: 1,
        dmgMod: 1,
        strMod: 0,
        dmgAbility: "none"
    },
    spell: {
        name: "Spell Attack",
        dice: '1d10',
        magic: 0,
        accMod: 1,
        dexMod: 1,
        dmgMod: 1,
        strMod: 1,
        dmgAbility: "casting"
    }
}

export const shieldLib: ShieldLib = {
    buckler: {
        name: "Buckler",
        ecMod: 1,
        acMod: 0
    },
    heater: {
        name: "Heater Sheald",
        ecMod: 2,
        acMod: 0
    },
    tower: {
        name: "Tower Shield",
        ecMod: 0,
        acMod: 2
    }
}