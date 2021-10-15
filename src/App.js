import React, { useState, useEffect } from 'react'
import DisplayCustomers from './components/DisplayCustomers'
import DateSelectionForm from './components/DateSelectionForm'
import transactionService from './services/transactions'
import calculateRewardsForAllCustomers from './utils/calculateRewards'
import { getMonthNameByNumber } from './utils/dateUtils'
import GlobalStyles from './styles/Global.styled'
import { ThemeProvider } from 'styled-components'
import { Container } from './styles/Container.styled'

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

  /**
   * Function that updates state for firstMonth and selectedMonths based on DateSelectionForm change
   * @author   Lucas Piedrahita
   * @param    {Object} event    onChange event
   */
  const onDateSelection = (event) => {
    const firstMonth = parseInt(event.target.value)
    setFirstMonth(firstMonth)
    setSelectedMonths([
      getMonthNameByNumber(firstMonth),
      getMonthNameByNumber(firstMonth + 1),
      getMonthNameByNumber(firstMonth + 2),
    ])
  }

  const theme = {
    colors: {
      white: '#fff',
      lightAccent: '#0099d8',
      main: '#2a5c9e',
      darkAccent: '#001d38',
      darkGrey: '#333',
      action: '#f66200',
      black: '#2c2c2c',
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Container bg={theme.colors.darkAccent}>
          <h1>Rewards Program Calculator</h1>
        </Container>
        <Container bg={theme.colors.white}>
          <DateSelectionForm
            transactions={transactions}
            onChange={onDateSelection}
            firstMonth={firstMonth}
          />
          <DisplayCustomers customers={customers} selectedMonths={selectedMonths} />
        </Container>
        <Container bg={theme.colors.darkGrey}>
          <footer>Placeholder footer text</footer>
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App
