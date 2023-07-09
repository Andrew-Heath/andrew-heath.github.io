import { Armor } from "../_classes/Armor";
import { Shield } from "../_classes/Shield";
import { Weapon } from "../_classes/Weapon";
import { Dice } from "./dice";

export interface ArmorStats {
    name: string;
    ecMod: number;
    acMod: number;
    drMod: number;
    maxDex: number;
    maxCon: number;
    magic: number;
    conApplies: 'ACMOD' | 'DRMOD' | 'BOTH';
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
    dmgAbility: "STR" | "DEX" | "CAST" | "NONE";
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

export interface CharacterModel {
    name: string;
    level?: number;
    prof?: number | null;
    STR: number;
    DEX: number;
    CON: number;
    CAST: number;
    armor: Armor;
    weapon: Weapon;
    shield: Shield | null;
    sneakAttack: number;
}