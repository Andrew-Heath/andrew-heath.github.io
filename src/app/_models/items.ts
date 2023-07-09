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