export const TAB_LIST = 'tab/list';
export const TAB_CHART = 'tab/chart';

export const padLeft = (number) => {
    return parseInt(number) > 9 ? number : '0' + number
}

export const rangeArr = (base, start = 0, size) => {
    const numberArr = []
    for(let i=0; i<size; i++) {
        numberArr.push(base + start + i)
    }
    return numberArr;
}