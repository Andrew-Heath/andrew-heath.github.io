import { ArmorLib } from "./items";

// base armor stats to initialize with
export const armorLib: ArmorLib = {
    unarmored: {
        ecMod: 0,
        acMod: 0,
        drMod: 0,
        maxDex: 5,
        maxCon: 0,
        conApplies: "acMod"
    },
    light: {
        ecMod: 2,
        acMod: 4,
        drMod: 1,
        maxDex: 5,
        maxCon: 1,
        conApplies: "acMod"
    },
    medium: {
        ecMod: 1,
        acMod: 4,
        drMod: 4,
        maxDex: 3,
        maxCon: 3,
        conApplies: "acMod"
    },
    heavy: {
        ecMod: 0,
        acMod: 5,
        drMod: 8,
        maxDex: 1,
        maxCon: 5,
        conApplies: "acMod"
    },
    lNatural: {
        ecMod: 1,
        acMod: 3,
        drMod: 3,
        maxDex: 5,
        maxCon: 3,
        conApplies: "acMod"
    },
    hNatural: {
        ecMod: 0,
        acMod: 3,
        drMod: 6,
        maxDex: 3,
        maxCon: 5,
        conApplies: "acMod"
    },
    mage: {
        ecMod: 0,
        acMod: 3,
        drMod: 3,
        maxDex: 5,
        maxCon: 5,
        conApplies: "acMod"
    },
    unaBarb: {
        ecMod: 0,
        acMod: 3,
        drMod: 5,
        maxDex: 5,
        maxCon: 7,
        conApplies: "acMod"
    },
    unaMonk: {
        ecMod: 2,
        acMod: 0,
        drMod: 0,
        maxDex: 5,
        maxCon: 5,
        conApplies: "acMod"
    }
}