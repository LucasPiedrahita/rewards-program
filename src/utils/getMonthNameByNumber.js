/**
 * Function that converts a number to full month name
 * @author   Lucas Piedrahita
 * @param    {Number} monthNumber    Zero-based number of the month, where January is 0
 * @return   {String}                Full name of month
 */
const getMonthNameByNumber = (monthNumber) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return months[monthNumber]
}

export default getMonthNameByNumber
