import { getMonthNameByNumber } from './dateUtils'

describe('testing dateUtils', () => {
  describe('testing getMonthNameByNumber function', () => {
    test.each([
      [0, 'January'],
      [1, 'February'],
      [2, 'March'],
      [3, 'April'],
      [4, 'May'],
      [5, 'June'],
      [6, 'July'],
      [7, 'August'],
      [8, 'September'],
      [9, 'October'],
      [10, 'November'],
      [11, 'December'],
    ])('%i should return %s', (monthNumber, monthName) => {
      expect(getMonthNameByNumber(monthNumber)).toBe(monthName)
    })

    test('negative number should return undefined', () => {
      expect(getMonthNameByNumber(-1)).toBeUndefined()
    })

    test('number greater than 11 should return undefined', () => {
      expect(getMonthNameByNumber(12)).toBeUndefined()
    })

    test('string should return undefined', () => {
      expect(getMonthNameByNumber('January')).toBeUndefined()
    })
  })
})
