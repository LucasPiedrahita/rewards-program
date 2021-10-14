import React, { useState, useEffect } from 'react'
import DisplayCustomers from './components/DisplayCustomers'
import DateSelectionForm from './components/DateSelectionForm'
import transactionService from './services/transactions'

const calculateRewardsForOneAmount = (amount) => {
  // A customer receives 2 points for every dollar spent over $100 in each transaction,
  // plus 1 point for every dollar spent over $50 in each transaction
  if (amount < 51) return 0
  if (amount <= 100) return Math.floor(amount - 50)
  if (amount > 100) return Math.floor(amount - 100) * 2 + 50
}

const calculateRewardsForOneMonth = (transactions, month) => {
  return transactions
    .filter((transaction) => new Date(transaction.date).getMonth() === month)
    .reduce(
      (totalRewards, transaction) =>
        totalRewards + calculateRewardsForOneAmount(transaction.amount),
      0
    )
}

const calculateRewardsForOneCustomer = (transactions, customerId, firstMonth) => {
  const customerTransactions = transactions.filter(
    (transaction) => transaction.customerId === customerId
  )
  const firstMonthRewards = calculateRewardsForOneMonth(customerTransactions, firstMonth)
  const secondMonthRewards = calculateRewardsForOneMonth(customerTransactions, firstMonth + 1)
  const thirdMonthRewards = calculateRewardsForOneMonth(customerTransactions, firstMonth + 2)
  const totalRewards = firstMonthRewards + secondMonthRewards + thirdMonthRewards
  return {
    customerId,
    firstMonthRewards,
    secondMonthRewards,
    thirdMonthRewards,
    totalRewards,
  }
}

const calculateRewardsForAllCustomers = (transactions, customerIds, firstMonth) => {
  const customers = customerIds.map((customerId) =>
    calculateRewardsForOneCustomer(transactions, customerId, firstMonth)
  )
  return customers
}

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
    const customers = calculateRewardsForAllCustomers(transactions, customerIds, firstMonth)
    setCustomers(customers)
  }, [transactions, firstMonth])

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
