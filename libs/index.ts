

export function setPrecision(number: number, precision: number): number {

    const result = parseFloat(number.toFixed(precision));
    return result;
}

