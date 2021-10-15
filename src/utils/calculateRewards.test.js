import {
  calculateRewardsForOneAmount,
  calculateRewardsForOneMonth,
  calculateRewardsForOneCustomer,
  calculateRewardsForAllCustomers,
} from './calculateRewards'

describe('testing calculateRewards utilities', () => {
  let customerIds
  let transactions
  let oneCustomerTransactions

  beforeAll(() => {
    customerIds = ['Lucas.Piedrahita', 'Erika.Murphy']
    transactions = [
      {
        _id: '6166cfcfd4451f9a67e11159',
        amount: 326.99, // 502 reward points
        customerId: 'Erika.Murphy',
        date: '2021-01-09T04:51:12',
      },
      {
        _id: '6166cfcfb050ff2fce3dded6',
        amount: 1.8, // 0 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-01-19T11:41:05',
      },
      {
        _id: '6166cfcfcbc4bfd54261630f',
        amount: 95.75, // 45 reward points
        customerId: 'Erika.Murphy',
        date: '2021-01-27T01:12:47',
      },
      {
        _id: '6166cfcfc87ca423e90439cd',
        amount: 420.57, // 690 reward points
        customerId: 'Erika.Murphy',
        date: '2021-01-10T10:12:22',
      },
      {
        _id: '6166cfcf3b6c8a4c9c03df7b',
        amount: 21.37, // 0 reward points
        customerId: 'Erika.Murphy',
        date: '2021-01-22T08:38:46',
      },
      {
        _id: '6166cfcf835478d32ab44060',
        amount: 230.51, // 310 reward points
        customerId: 'Erika.Murphy',
        date: '2021-02-02T09:09:40',
      },
      {
        _id: '6166cfcf163d4c8638a23fae',
        amount: 87.67, // 37 reward points
        customerId: 'Erika.Murphy',
        date: '2021-02-19T03:36:10',
      },
      {
        _id: '6166cfcfb0ef77f9a449b653',
        amount: 88.85, // 38 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-02-20T04:22:40',
      },
      {
        _id: '6166cfcf21dc5005d7cd89d1',
        amount: 145.93, // 140 reward points
        customerId: 'Erika.Murphy',
        date: '2021-02-20T04:53:05',
      },
      {
        _id: '6166cfcf24b4b68977c8f915',
        amount: 118.33, // 86 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-02-26T08:44:50',
      },
      {
        _id: '6166cfcf628723582714bcb4',
        amount: 180.9, // 210 reward points
        customerId: 'Erika.Murphy',
        date: '2021-03-07T07:13:27',
      },
      {
        _id: '6166cfcfdebdabd930deacf2',
        amount: 202.07, // 254 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-03-08T12:12:13',
      },
      {
        _id: '6166cfcfc76ed88b52c955a8',
        amount: 125.74, // 100 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-03-24T01:32:28',
      },
      {
        _id: '6166cfcfd3a7a7831a777fee',
        amount: 124.99, // 98 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-03-16T09:39:43',
      },
    ]
    oneCustomerTransactions = [
      {
        _id: '6166cfcfb050ff2fce3dded6',
        amount: 1.8, // 0 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-01-19T11:41:05',
      },
      {
        _id: '6166cfcfb0ef77f9a449b653',
        amount: 88.85, // 38 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-02-20T04:22:40',
      },
      {
        _id: '6166cfcf24b4b68977c8f915',
        amount: 118.33, // 86 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-02-26T08:44:50',
      },
      {
        _id: '6166cfcfdebdabd930deacf2',
        amount: 202.07, // 254 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-03-08T12:12:13',
      },
      {
        _id: '6166cfcfc76ed88b52c955a8',
        amount: 125.74, // 100 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-03-24T01:32:28',
      },
      {
        _id: '6166cfcfd3a7a7831a777fee',
        amount: 124.99, // 98 reward points
        customerId: 'Lucas.Piedrahita',
        date: '2021-03-16T09:39:43',
      },
    ]
  })

  describe('testing calculateRewardsForOneAmount function', () => {
    test.each([
      [-100, 0],
      [-1.2, 0],
      [0, 0],
      [25, 0],
      [49.99, 0],
      [50.99, 0],
      [51, 1],
      [99.99, 49],
      [100, 50],
      [101, 52],
      [101.01, 52],
      [150, 150],
      [500, 850],
      [1000, 1850],
    ])('%i amount should be worth %i reward points', (amount, rewards) => {
      expect(calculateRewardsForOneAmount(amount)).toBe(rewards)
    })
  })

  describe('testing calculateRewardsForOneMonth function', () => {
    test.each([
      [0, 0],
      [1, 124],
      [2, 452],
      [3, 0],
    ])('the reward points for month %i should be %i', (month, rewards) => {
      expect(calculateRewardsForOneMonth(oneCustomerTransactions, month)).toBe(rewards)
    })
  })

  describe('testing calculateRewardsForOneCustomer function', () => {
    const expectedResultForOneCustomerLucas = {
      customerId: 'Lucas.Piedrahita',
      firstMonthRewards: 0,
      secondMonthRewards: 124,
      thirdMonthRewards: 452,
      totalRewards: 576,
    }
    const expectedResultForOneCustomerErika = {
      customerId: 'Erika.Murphy',
      firstMonthRewards: 1237,
      secondMonthRewards: 487,
      thirdMonthRewards: 210,
      totalRewards: 1934,
    }
    const expectedResultForOneCustomerInvalid = {
      customerId: 'Nonexistent.Customer',
      firstMonthRewards: 0,
      secondMonthRewards: 0,
      thirdMonthRewards: 0,
      totalRewards: 0,
    }
    test.each([
      ['Lucas.Piedrahita', expectedResultForOneCustomerLucas],
      ['Erika.Murphy', expectedResultForOneCustomerErika],
      ['Nonexistent.Customer', expectedResultForOneCustomerInvalid],
    ])('the reward points for %s are correct', (customerId, expectedResult) => {
      expect(calculateRewardsForOneCustomer(transactions, customerId, 0)).toEqual(expectedResult)
    })
  })

  describe('testing calculateRewardsForAllCustomers function', () => {
    const expectedResultForAllCustomers = [
      {
        customerId: 'Lucas.Piedrahita',
        firstMonthRewards: 0,
        secondMonthRewards: 124,
        thirdMonthRewards: 452,
        totalRewards: 576,
      },
      {
        customerId: 'Erika.Murphy',
        firstMonthRewards: 1237,
        secondMonthRewards: 487,
        thirdMonthRewards: 210,
        totalRewards: 1934,
      },
    ]
    const expectedResultForAllCustomersNoTransactions = [
      {
        customerId: 'Lucas.Piedrahita',
        firstMonthRewards: 0,
        secondMonthRewards: 0,
        thirdMonthRewards: 0,
        totalRewards: 0,
      },
      {
        customerId: 'Erika.Murphy',
        firstMonthRewards: 0,
        secondMonthRewards: 0,
        thirdMonthRewards: 0,
        totalRewards: 0,
      },
    ]
    test('an nonempty array of transactions and nonempty array of customers', () => {
      expect(calculateRewardsForAllCustomers(transactions, customerIds, 0)).toEqual(
        expectedResultForAllCustomers
      )
    })

    test('an empty array of transactions and nonempty array of customers', () => {
      expect(calculateRewardsForAllCustomers([], customerIds, 0)).toEqual(
        expectedResultForAllCustomersNoTransactions
      )
    })

    test('an empty array of customers returns an empty array', () => {
      expect(calculateRewardsForAllCustomers(transactions, [], 0)).toEqual([])
    })
  })
})
