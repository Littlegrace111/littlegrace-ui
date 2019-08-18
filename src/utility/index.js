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

// 从当前时间的年份往前推10年
export const generateYearArr = () => {
    const date = new Date()
    return rangeArr(date.getFullYear(), -9, 10)
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

/**
 * array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * total 必需，初始值和计算后返回值
 * currentValue 必需，当前元素
 * currentIndex 可选，当前元素索引
 * arr 可选，当前元素所属数组
 * initialValue 可选，传递给函数的初始值，相当于total初始值
 * @param {Array} arr 
 */
export const flattenArr = (arr) => {
    return arr.reduce((origin, item) => {
        origin[item.id] = item
        return origin
    }, {})
}

export const ID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
}

export const calculateItems = (items, type = 'outcome') => {
    const CategoryMap = {}
    items.filter( item => item.category.type === type).forEach( item => {
        if(CategoryMap[item.cid]) { //if have 
                CategoryMap[item.cid].vaule += (item.price * 1)
                CategoryMap[item.cid].items.push(item.id)
        } else {
            CategoryMap[item.cid] = {
                name: item.category.name,
                value: item.price * 1,
                items: [item.id]
            }
        }
    })

    console.log(CategoryMap)
    return Object.keys(CategoryMap).map( id => ({...CategoryMap[id], id}))
}

/**
 * 函数节流
 * @param {Function} callback 延迟dalay毫秒后之执行的函数，上下文和所有参数都按照原样传递
 * @param {Number} delay 对于事件回调，大约100或250毫秒的延迟是最有用的
 * @param {Boolean} noTrailing 可选，默认false, 
 *                              noTrailing = true, callback 每隔delay毫秒执行一次
 *                              noTrailing = false, callback delay毫秒执行一次后清空timeout
 */
export const throttle = (callback, delay) => {
    let lastExec = 0;
    // 返回一个函数
    return (...args) => {
        let elapsed = Number(new Date()) - lastExec;
        console.log('elapsed = ', elapsed)
        const exec = () => {
            lastExec = Number(new Date())
            console.log('exec')
            callback(...args)
        }

        if(elapsed > delay) {
            exec()
        }
    }   
}

export const throttleV2 = (delay, callback) => {
    var currentTime = 0
    return function wrapper() {
        var self = this
        var startTime = Number(new Date())
        var elapsed = startTime - currentTime
        var args = arguments
        console.log('wrapper, elapsed = ', elapsed)
        function exec() {
            console.log('exec')
            currentTime = Number(new Date())
            callback.apply(self, args)
        }

        if(elapsed > delay) {
            exec()
        } 
    }
}

