import React from 'react'

const DateSelectionForm = ({ transactions, onChange, firstMonth }) => {
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
  const transactionMonths = [
    ...new Set(transactions.map((transaction) => new Date(transaction.date).getMonth())),
  ].sort((a, b) => a - b)
  const finalMonth = transactionMonths[transactionMonths.length - 1]
  const selectionOptions = transactionMonths
    .filter((month) => month <= finalMonth - 2)
    .map((month) => {
      return {
        label: `${months[month]} - ${months[month + 2]}`,
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
