export function calcDist(x1:number, y1:number, x2:number, y2:number) :number {
    let a = (x2 - x1) * (x2 - x1)
    let b = (y2 - y1) * (y2 - y1)
    return Math.sqrt(a + b)
}