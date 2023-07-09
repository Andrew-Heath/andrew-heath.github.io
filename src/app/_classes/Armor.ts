import { ArmorStats } from "../_models/items"
import { uuid } from "../_utils/misc"

/*
    Armor
    -- Defined item with stat thresholds

    returns just the armor info
*/
export class Armor implements ArmorStats {
    name: string
    id: string
    ecMod: number
    acMod: number
    drMod: number
    maxDex: number
    maxCon: number
    conApplies: "acMod" | "drMod" | "both"

    constructor(name: string, { ecMod, acMod, drMod, maxDex, maxCon, conApplies}: ArmorStats) {
        this.name = name
        this.id = uuid(name)
        this.ecMod = ecMod
        this.acMod = acMod
        this.drMod = drMod
        this.maxDex = maxDex
        this.maxCon = maxCon
        this.conApplies = conApplies || "acMod"
    }
}
