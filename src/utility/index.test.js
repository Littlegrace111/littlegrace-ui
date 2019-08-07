import { parseToYearAndMonth } from './index'

test('test parseToYearAndMonth', () => {
    console.log(parseToYearAndMonth('0000'))
    console.log(parseToYearAndMonth())
    console.log(parseToYearAndMonth('2018-01'))
})