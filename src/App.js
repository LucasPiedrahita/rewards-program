import React, { useState, useEffect } from 'react'
import DisplayCustomers from './components/DisplayCustomers'
import DateSelectionForm from './components/DateSelectionForm'
import transactionService from './services/transactions'
import calculateRewardsForAllCustomers from './utils/calculateRewards'
import getMonthNameByNumber from './utils/getMonthNameByNumber'

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

  // set customers on transaction or firstMonth state change
  useEffect(() => {
    const customerIds = [...new Set(transactions.map((transaction) => transaction.customerId))]
    const customers = calculateRewardsForAllCustomers(transactions, customerIds, firstMonth)
    setCustomers(customers)
  }, [transactions, firstMonth])

  const onDateSelection = (event) => {
    const firstMonth = parseInt(event.target.value)
    setFirstMonth(firstMonth)
    setSelectedMonths([
      getMonthNameByNumber(firstMonth),
      getMonthNameByNumber(firstMonth + 1),
      getMonthNameByNumber(firstMonth + 2),
    ])
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
