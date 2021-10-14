import React from 'react'
import getMonthNameByNumber from '../utils/getMonthNameByNumber'

const DateSelectionForm = ({ transactions, onChange, firstMonth }) => {
  const transactionMonths = [
    ...new Set(transactions.map((transaction) => new Date(transaction.date).getMonth())),
  ].sort((a, b) => a - b)
  const finalMonth = transactionMonths[transactionMonths.length - 1]
  const selectionOptions = transactionMonths
    .filter((month) => month <= finalMonth - 2)
    .map((month) => {
      return {
        label: `${getMonthNameByNumber(month)} - ${getMonthNameByNumber(month + 2)}`,
        firstMonth: month,
      }
    })
  return (
    <form>
      <select value={firstMonth} name='dateSelection' onChange={onChange}>
        {selectionOptions.map(({ label, firstMonth }) => (
          <option key={firstMonth} value={firstMonth}>
            {label}
          </option>
        ))}
      </select>
    </form>
  )
}

export default DateSelectionForm
