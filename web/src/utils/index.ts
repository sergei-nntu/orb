export function convertDeegreToRadian(value: number) {
    return (value * Math.PI) / 180;
}

export function convertRadianToDegree(value: number) {
    return +((value * 180) / Math.PI).toFixed(0);
}

// export const updateFlagsLoading = (axis: string, value: boolean, type: 'position' | 'orientation') => {
//     setFlagsLoading((prev) => ({
//         ...prev,
//         [type]: {
//             ...prev[type],
//             [type === 'position' ? `flagLoading${axis.toUpperCase()}` : `flagLoading${axis}`]: value,
//         },
//     }));
// };
