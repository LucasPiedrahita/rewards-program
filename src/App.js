import React, { useState, useEffect } from 'react'
import DisplayCustomerRewardsTable from './components/DisplayCustomerRewardsTable'
import DateSelectionForm from './components/DateSelectionForm'
import transactionService from './services/transactions'
import calculateRewardsForAllCustomers from './utils/calculateRewards'
import GlobalStyles from './styles/Global.styled'
import { ThemeProvider } from 'styled-components'
import Container from './styles/Container.styled'

const App = () => {
  const [transactions, setTransactions] = useState([])
  const [customerRewardsSummary, setCustomerRewardsSummary] = useState([])
  const [firstMonth, setFirstMonth] = useState(0)

  // set initial transactions
  useEffect(() => {
    transactionService.getAll().then((initialTransactions) => {
      setTransactions(initialTransactions)
    })
  }, [])

  // set customerRewardsSummary on transaction or firstMonth state change
  useEffect(() => {
    const customerIds = [
      ...new Set(transactions.map((transaction) => transaction.customerId)),
    ].sort()
    const customerRewardsSummary = calculateRewardsForAllCustomers(
      transactions,
      customerIds,
      firstMonth
    )
    setCustomerRewardsSummary(customerRewardsSummary)
  }, [transactions, firstMonth])

  /**
   * Function that updates state for firstMonth based on DateSelectionForm change
   * @author   Lucas Piedrahita
   * @param    {Object} event    onChange event
   */
  const dateSelectionChangeHandler = (event) => {
    setFirstMonth(parseInt(event.target.value))
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
          <DateSelectionForm onChange={dateSelectionChangeHandler} firstMonth={firstMonth} />
          <DisplayCustomerRewardsTable
            customerRewardsSummary={customerRewardsSummary}
            firstMonth={firstMonth}
          />
        </Container>
        <Container bg={theme.colors.darkGrey}>
          <footer>Placeholder footer text</footer>
        </Container>
      </>
    </ThemeProvider>
  )
}

export default App
