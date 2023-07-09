import { v5 } from 'uuid'

const NAMESPACE = "b80d5497-5bc8-40a7-aef0-4ab829c7c784" 

export const uuid = (text: string) => v5(text, NAMESPACE)

export const median = (min: number, val: number, max: number): number => Math.min(max, (Math.max(val, min)))