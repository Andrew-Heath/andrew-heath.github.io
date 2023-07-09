import { WeaponStats } from "../_models/items"
import { uuid } from "../_utils/misc"

/*
    Weapon
    -- Defined item with stat thresholds

    returns just the weapon info
*/
class Weapon implements WeaponStats {
    name: string
    id: string
    accMod: number
    dexMod: number
    dmgMod: number
    strMod: number
    dmgAbility: "str" | "dex" | "casting" | "none"

    constructor(name: string, { accMod, dexMod, dmgMod, strMod, dmgAbility }: WeaponStats) {
        this.name = name
        this.id = uuid(name)
        this.accMod = accMod
        this.dexMod = dexMod
        this.dmgMod = dmgMod
        this.strMod = strMod
        this.dmgAbility = dmgAbility || "str"
    }
}