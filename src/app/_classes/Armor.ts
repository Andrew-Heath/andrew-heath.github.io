import { BOTH, NONE } from "../_models/consts"
import { ArmorStats } from "../_models/items"
import { median, uuid } from "../_utils/misc"

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
    magic: number
    conApplies: 'ACMOD' | 'DRMOD' | 'BOTH'

    constructor({
        name,
        ecMod=2,
        acMod=2,
        drMod=2,
        maxDex=2,
        maxCon=2,
        magic=0,
        conApplies=BOTH,
    }: ArmorStats) {

        this.name = name
        this.id = uuid(name)
        this.ecMod = ecMod
        this.acMod = acMod
        this.drMod = drMod
        this.maxDex = maxDex
        this.maxCon = maxCon
        this.magic = median(0, magic, 3)
        this.conApplies = conApplies
    }
}
