import { 
    parseToYearAndMonth, 
    isValidDate, 
    generateYearArr, 
    flattenArr, 
    calculateItems,
    throttle,
    throttleV2,
    debounce,
} from './index'
import { priceList, categories, categoryList } from '../store/mockData'

// test('test parseToYearAndMonth', () => {
//     console.log(parseToYearAndMonth('0000'))
//     console.log(parseToYearAndMonth())
//     console.log(parseToYearAndMonth('2018-01'))
// })

// test('test isValidDate', () => {
//     console.log(isValidDate('2018/06/03'))
//     console.log(isValidDate('2018-06-03'))
// })

// test('test generateYearArr', () => {
//     console.log(generateYearArr())
// })

// test('test flattenArr', () => {
//     const priceMap = flattenArr(priceList)
//     console.log(priceMap)
//     const categoryMap = flattenArr(categories)
//     console.log(categoryMap)
// })

// test('test calculateItems', () => {
//     calculateItems()
// })

describe('test throttle function', () => {
    it(' throttle(200, () => true, true) with trailing should reture true ', (done) => {
        let num = 0, interval = null;
        let startTime = +(new Date())
        const throttled = throttle(() => {
            num ++ 
            const execTime = +(new Date())
            console.log('throttled, num = ' + num, 'elapsed = ', (execTime - startTime))
            return true 
        }, 200, true)

        // 20ms 触发一次throttled
        throttled()
        interval = setInterval(() => {
            throttled()
        }, 20)

        // 计算805ms触发了几次
        setTimeout( () => {
            console.log(num === Math.ceil(805 / 200))
            done()
            clearInterval(interval)
        }, 805)
    })

    it(' throttle(200, () => true) should reture true ', (done) => {
        let num = 0, interval = null;
        let startTime = +(new Date())
        const throttled = throttle(() => {
            num ++ 
            const execTime = +(new Date())
            console.log('throttled, num = ' + num, 'elapsed = ', (execTime - startTime))
            return true 
        }, 200)

        // 20ms 触发一次throttled
        throttled()
        interval = setInterval(() => {
            throttled()
        }, 20)

        // 计算805ms触发了几次
        setTimeout( () => {
            console.log(num === Math.floor(805 / 200))
            done()
            clearInterval(interval)
        }, 805)
    })
})

describe('test debounce', () => {
    it('debounce(200, ()=>true) should return true', (done) => {
        let num = 0, interval = null
        let startTime = +(new Date())
        // console.log('debounce test, startTime = ', startTime)
        const debounced = debounce(200, () => {
            num++
            const execTime = +(new Date())
            console.log('debounced, num = ', num, 'elapsed = ', (execTime - startTime))
            console.log( num === 1)
            done()
            return (num === 1)
        })

        const biu = () => { console.log('biu biu biu', new Date().Format('HH:mm:ss'))}
        const boom = () => {
            console.log('boom boom boom', new Date().Format('HH:mm:ss'))
        }

        interval = setInterval( () => {
            debounced()
        }, 20)

        setTimeout( () => {
            clearInterval(interval)
        }, 800)
    })
})