export interface ArmorStats {
    ecMod: number;
    acMod: number;
    drMod: number;
    maxDex: number;
    maxCon: number;
    conApplies: "acMod" | "drMod" | "both";
}

export interface ArmorLib {
    [key: string]: ArmorStats;
}

export interface WeaponStats {
    accMod: number;
    dexMod: number;
    dmgMod: number;
    strMod: number;
    dmgAbility: "str" | "dex" | "casting" | "none";
}

export interface WeaponLib {
    [key: string]: WeaponStats;
}

export interface ShieldStats {
    name?: string,
    ecMod: number;
    acMod: number;
    minStr: number | null;
    special: string
}

export interface ShieldLib {
    [key: string]: ShieldStats
}