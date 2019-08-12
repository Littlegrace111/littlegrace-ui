import { parseToYearAndMonth, isValidDate, generateYearArr } from './index'

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