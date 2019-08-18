import { 
    parseToYearAndMonth, 
    isValidDate, 
    generateYearArr, 
    flattenArr, 
    calculateItems,
    throttle,
    throttleV2,
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
    it(' throttle(200, () => true) should reture true ', (done) => {
        let num = 0, interval = null;
        const throttled = throttle(() => {
            console.log('throttled, num = ' + num)
            num ++ 
            return true 
        }, 200)

        // 20ms 触发一次throttled
        interval = setInterval(() => {
            throttled()
        }, 20)

        setTimeout( () => {
            console.log(num === Math.floor(805 / 200))
            done()
            clearInterval(interval)
        }, 805)
    })
})

// describe('throttle', () => {
//     it('throttle(200, () => true) should return true', (done) => {
//         let num = 0, interval = null
//         let throttled = throttleV2(200, () => {
//             console.log('throttled, num = ' , num)
//             num ++
//             return true
//         })

//         // 每20ms 触发一次throttled
//         interval = setInterval(() => {
//             throttled()
//         }, 20)

//         // 计算805ms触发了几次，expect
//         setTimeout( () => {
//             console.log(num === Math.floor(805 / 200))
//             done()
//             clearInterval(interval)
//         }, 805)
//     })
// })