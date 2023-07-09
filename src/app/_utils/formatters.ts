import { Dice } from "../_models/dice"

// takes a number
// returns the number to 2 decimal places
export function formatDecimal(dec: number): number {
    const out = Math.floor(dec * 100) / 100
    return out
}

// give a dice object
// returns dice in "XdY+AdB" format
export function formatDiceSets(dice: Dice): string {
    return (Array.isArray(dice) ? dice : [dice]).map(d => d.type).join('+')
}

// give a decimal percent
// returns a string, "00.00%" format
export function formatPercent(num: number): string {
    return `${Math.round(num * 10000) / 100}%`
}