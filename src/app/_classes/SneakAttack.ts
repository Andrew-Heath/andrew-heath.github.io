/*
    Sneak Attack
    -- Shorthand class for referencing SA props

    SneakAttack.min - number, minimum damage (num)
    SneakAttack.avg - number, average damage (num * 3.5)
    SneakAttack.max - number, maximum damage (num * 6)
*/

class SneakAttack {
    num: number
    min: number
    avg: number
    max: number

    constructor(num: number) {
        this.num = num
        this.min = num
        this.avg = num * 3.5
        this.max = num * 6
    }
}