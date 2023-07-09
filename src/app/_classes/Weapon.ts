import { Dice } from "../_models/dice"
import { WeaponStats } from "../_models/items"
import { median, uuid } from "../_utils/misc"

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
    dmgAbility: "STR" | "DEX" | "CAST" | "NONE"

    constructor({
        name,
        dice='1d8',
        accMod=1,
        dexMod=1,
        dmgMod=1,
        strMod=1,
        magic=0,
        dmgAbility="STR",
    }: WeaponStats) {

        this.name = name
        this.id = uuid(name)
        this.dice = dice
        this.accMod = accMod
        this.dexMod = dexMod
        this.dmgMod = dmgMod
        this.strMod = strMod
        this.magic = median(0, magic, 3)
        this.dmgAbility = dmgAbility
    }
}