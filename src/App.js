import React, { useState, useEffect } from 'react'
import DisplayCustomers from './components/DisplayCustomers'
import DateSelectionForm from './components/DateSelectionForm'
import transactionService from './services/transactions'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [customers, setCustomers] = useState([])
  const [firstMonth, setFirstMonth] = useState(0)
  const [selectedMonths, setSelectedMonths] = useState(['January', 'February', 'March'])

  // set initial transactions
  useEffect(() => {
    transactionService.getAll().then((initialTransactions) => {
      setTransactions(initialTransactions)
    })
  }, [])

  // set customers on transaction state change
  useEffect(() => {
    const customerIds = [...new Set(transactions.map((transaction) => transaction.customerId))]
    const customers = customerIds.map((customerId) => {
      return {
        customerId,
        firstMonthRewards: '-',
        secondMonthRewards: '-',
        thirdMonthRewards: '-',
        totalRewards: '-',
      }
    })
    setCustomers(customers)
  }, [transactions])

  // set filteredTransactions on firstMonth or transactions state change
  useEffect(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionMonth = new Date(transaction.date).getMonth()
      return transactionMonth >= firstMonth && transactionMonth <= firstMonth + 2
    })
    console.log(filteredTransactions)
  }, [firstMonth, transactions])

  const onDateSelection = (event) => {
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
    const firstMonth = parseInt(event.target.value)
    setFirstMonth(firstMonth)
    setSelectedMonths([months[firstMonth], months[firstMonth + 1], months[firstMonth + 2]])
  }

  return (
    <div>
      <h1>Rewards Program Calculator</h1>
      <DateSelectionForm
        transactions={transactions}
        onChange={onDateSelection}
        firstMonth={firstMonth}
      />
      <DisplayCustomers customers={customers} selectedMonths={selectedMonths} />
    </div>
  )
}

export default App
