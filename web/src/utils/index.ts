export function convertDeegreToRadian(value: number) {
    return (value * Math.PI) / 180;
}

export function convertRadianToDegree(value: number) {
    return +((value * 180) / Math.PI).toFixed(0);
}
