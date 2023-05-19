export const slice_from_both_sides = (str, count) => {
    const fPart = str.slice(0, count)
    const lPart = str.slice(str.length - count)
    return `${fPart}..${lPart}`
}
