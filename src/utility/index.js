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

// 传入日期str解析年月，不传则解析当前年月
export const parseToYearAndMonth = (str) => {
    const date = str ? new Date(str) : new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }
}

export const isValidDate = (dateStr) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateStr.match(regEx))   
        return false // Invaild format
    const d = new Date(dateStr)
    console.log('d', d.toISOString().slice(0, 10)) // not a number
    if(Number.isNaN(d.getTime()))
        return false // Invaild date
    
    return d.toISOString().slice(0, 10) === dateStr
}