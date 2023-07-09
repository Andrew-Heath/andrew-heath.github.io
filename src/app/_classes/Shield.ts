import { DEFLECT, ABSORPTION, COVER, NONE } from "../_models/consts"
import { ShieldStats } from "../_models/items"
import { uuid } from "../_utils/misc"

/*
    Armor
    -- Defined item with stat thresholds

    returns just the armor info
*/
export class Armor implements ShieldStats {
    name: string
    id: string
    ecMod: number
    acMod: number
    minStr: number | null = null
    special: string = NONE

    constructor(name: string, { ecMod=0, acMod=0 }: ShieldStats) {
        this.name = name
        this.id = uuid(name)
        this.ecMod = ecMod
        this.acMod = acMod
    }
}
