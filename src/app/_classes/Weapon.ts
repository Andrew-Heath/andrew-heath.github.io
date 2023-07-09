import { Dice } from "../_models/dice"
import { WeaponStats } from "../_models/items"
import { uuid } from "../_utils/misc"

/*
    Weapon
    -- Defined item with stat thresholds

    returns just the weapon info
*/
export class Weapon implements WeaponStats {
    name: string
    id: string
    dice: Dice
    accMod: number
    dexMod: number
    dmgMod: number
    strMod: number
    magic: number
    dmgAbility: "str" | "dex" | "casting" | "none"

    constructor({
        name,
        dice='1d8',
        accMod=1,
        dexMod=1,
        dmgMod=1,
        strMod=1,
        magic=0,
        dmgAbility="str",
    }: WeaponStats) {

        this.name = name
        this.id = uuid(name)
        this.dice = dice
        this.accMod = accMod
        this.dexMod = dexMod
        this.dmgMod = dmgMod
        this.strMod = strMod
        this.magic = Math.min(3, Math.max(0, magic))
        this.dmgAbility = dmgAbility
    }
}