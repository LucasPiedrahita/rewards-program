import React from 'react'

const DateSelectionForm = ({ transactions }) => {
  const transactionMonths = [
    ...new Set(transactions.map((transaction) => new Date(transaction.date).getMonth())),
  ]
  console.log(transactionMonths)
  const earliestMonth = Math.min(...transactionMonths)
  const latestMonth = Math.max(...transactionMonths)
  return (
    <>
      <p>{earliestMonth}</p>
      <p>{latestMonth}</p>
    </>
  )
}

export default DateSelectionForm
