export const D20 = {
    adv: INIT_ADV(),
    normal: INIT_NORMAL(),
    dadv: INIT_DADV()
}

function INIT_ADV() {
    return new Array(21).fill(0).map((v, i) => {
        if (i === 0) return 'ADV'
        const chance =  (1 - Math.pow((i - 1) / 20, 2))
        return Math.round(chance * 10000) / 10000
    })
}

function INIT_NORMAL () {
    return new Array(21).fill(0).map((v, i) => {
        if (i === 0) return 'NORM'
        return (21 - i) / 20
    })
}

function INIT_DADV () {
    return new Array(21).fill(0).map((v, i) => {
        if (i === 0) return ''
        const chance = Math.pow((21 - i) / 20, 2)
        return Math.round(chance * 10000) / 10000
    })
}