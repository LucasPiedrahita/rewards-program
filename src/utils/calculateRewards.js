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

export default calculateRewardsForAllCustomers
