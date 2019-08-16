import { parseToYearAndMonth, isValidDate, generateYearArr, flattenArr, calculateItems } from './index'
import { priceList, categories, categoryList } from '../store/mockData'

test('test parseToYearAndMonth', () => {
    console.log(parseToYearAndMonth('0000'))
    console.log(parseToYearAndMonth())
    console.log(parseToYearAndMonth('2018-01'))
})

test('test isValidDate', () => {
    console.log(isValidDate('2018/06/03'))
    console.log(isValidDate('2018-06-03'))
})

test('test generateYearArr', () => {
    console.log(generateYearArr())
})

test('test flattenArr', () => {
    const priceMap = flattenArr(priceList)
    console.log(priceMap)
    const categoryMap = flattenArr(categories)
    console.log(categoryMap)
})

test('test calculateItems', () => {
    calculateItems()
})