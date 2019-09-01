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
 * 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
 * @param {Function} callback 延迟dalay毫秒后之执行的函数，上下文和所有参数都按照原样传递
 * @param {Number} delay 对于事件回调，大约100或250毫秒的延迟是最有用的
 * @param {Boolean} noTrailing 可选，默认false, 
 *                              noTrailing = true, callback 每隔delay毫秒执行一次
 *                              noTrailing = false, callback delay毫秒执行一次后清空timeout
 */
export const throttle = (callback, delay, trailing = false) => {
    let timeoutId, lastExec = 0;
    // 返回一个函数
    return (...args) => {
        let elapsed = Number(new Date()) - lastExec;
        // console.log('elapsed = ', elapsed, 'timeoutId = ', timeoutId)
        const exec = () => {
            lastExec = Number(new Date())
            // console.log('exec')
            callback(...args)
        }

        if(elapsed > delay) {
            exec()
        } else if(trailing){ 
            // 在trailing 尾调模式下，未超时，设置回调在200ms后
            timeoutId && clearTimeout(timeoutId)
            timeoutId = setTimeout( () => {
                exec()
            }, delay - elapsed)
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
        // console.log('wrapper, elapsed = ', elapsed)
        function exec() {
            // console.log('exec')
            currentTime = Number(new Date())
            callback.apply(self, args)
        }

        if(elapsed > delay) {
            exec()
        } 
    }
}

/**
 * 函数防抖： 在事件被触发delay毫秒后再执行回调，若在这delay毫秒内又被触发，则重新计时
 * 如果在时间间隔内执行函数，会重新触发计时。
 * 通俗理解：函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条
 * @param {Number} delay 
 * @param {Function} callback 
 */
export const debounce = (delay, callback) => {
    let timeoutId
    return (...args) => {
        timeoutId && clearTimeout(timeoutId)
        timeoutId = setTimeout( () => {
            callback(...args)
        }, delay)
    }
}

/**
 * 判断浏览器是否支持webp图片
 */
export const isSupportWebp = () => {
    let isSupportWebp = localStorage.getItem('damai_support_webp') || false

    const checkWebpFeature = (feature, callback) => {
        if(navigator.userAgent.match(/Android|AlipayClient|UCBrowser|Chrome|Opera/)) {
            callback(true)
            return true
        }
        const kTestImages = {
            base64: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
            aliwebp: '//damaipimg.oss-cn-beijing.aliyuncs.com/cfs/src/cf23ea3e-558b-4a2b-9dbd-0ee51ebba97d.png?x-oss-process=image/resize,w_1/format,webp'
        }
        const img = new Image()
        img.onload = () => {
            const result = (img.width > 0) && (img.height > 0)
            callback(result)
        }
        img.onerror = () => {
            callback(false)
        }
        img.src = kTestImages[feature]
    }

    const checkCallback = (isWebp) => {
        if(isWebp) {
            isSupportWebp = true
            localStorage.setItem('damai_support_webp', true)
        }
    }

    (function () {
        checkWebpFeature('base64', checkCallback);
        checkWebpFeature('aliwebp', checkCallback);
    }());
}

