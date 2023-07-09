import { Dice } from "./dice";

export interface ArmorStats {
    name: string;
    ecMod: number;
    acMod: number;
    drMod: number;
    maxDex: number;
    maxCon: number;
    magic: number;
    conApplies: "acMod" | "drMod" | "both";
}

export interface ArmorLib {
    [key: string]: ArmorStats;
}

export interface WeaponStats {
    name: string;
    dice: Dice;
    accMod: number;
    dexMod: number;
    dmgMod: number;
    strMod: number;
    magic: number;
    dmgAbility: "str" | "dex" | "casting" | "none";
}

export interface WeaponLib {
    [key: string]: WeaponStats;
}

export interface ShieldStats {
    name: string,
    ecMod: number;
    acMod: number;
}

export interface ShieldLib {
    [key: string]: ShieldStats
}