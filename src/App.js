/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import DisplayCustomers from './components/DisplayCustomers'
import transactionService from './services/transactions'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    transactionService.getAll().then((initialTransactions) => {
      setTransactions(initialTransactions)
      const initialCustomers = [
        ...new Set(initialTransactions.map((transaction) => transaction.userId)),
      ]
      setCustomers(initialCustomers)
    })
  }, [])

  return (
    <div>
      <h1>Rewards Program Calculator</h1>
      <DisplayCustomers customers={customers} />
    </div>
  )
}

export default App
