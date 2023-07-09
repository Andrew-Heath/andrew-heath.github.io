import { Dice } from "../_models/dice"

/*
    DiceSet
    -- Takes an XdY formatted string
    -- can return type and roll to return a result.

    DiceSet.type - string, "XdY"
    DiceSet.roll - number, dice roll result
    DiceSet.min - number, minimum result possible (X)
    diceSet.max - number, maximum result possible(X*Y)
*/
export class DiceSet {
    _dice: Dice
    num: number
    sides: number

    constructor(dice: Dice) {
        const [num, sides] = dice.split('d')
        this._dice = dice
        this.num = Number(num)
        this.sides = Number(sides)
    }

    get type() {
        return `${this.num}d${this.sides}`
    }

    get min() {
        return this.num
    }

    get max() {
        return this.num * this.sides
    }

    roll() {
        let total = 0
        for (let i = 0; i < this.num; i++) total += this._rollDie()
        return total
    }

    _rollDie() {
        const out = Math.floor(Math.random() * this.sides) + 1
        return out
    }
}