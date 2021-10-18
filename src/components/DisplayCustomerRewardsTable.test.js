import React from 'react'
import { render, screen } from '@testing-library/react'
import DisplayCustomerRewardsTable from './DisplayCustomerRewardsTable'

describe('test DisplayCustomerRewardsTable', () => {
  describe('test that "customerRewardsSummary" prop affects render correctly', () => {
    test('when customerRewardsSummary is an empty array, no customer rows are rendered', () => {
      const customerRewardsSummary = []
      render(
        <DisplayCustomerRewardsTable
          customerRewardsSummary={customerRewardsSummary}
          firstMonth={0}
        />
      )
      expect(screen.getByRole('table').querySelector('tbody')).toBeEmptyDOMElement()
    })

    describe('when customerRewardsSummary is an array of one valid customer', () => {
      const customerRewardsSummary = [
        {
          customerId: 'Customer.Name',
          firstMonthRewards: 1,
          secondMonthRewards: 2,
          thirdMonthRewards: 3000,
          totalRewards: 3003,
        },
      ]
      beforeEach(() => {
        render(
          <DisplayCustomerRewardsTable
            customerRewardsSummary={customerRewardsSummary}
            firstMonth={0}
          />
        )
      })

      test("the customer's name is rendered", () => {
        expect(screen.getByRole('cell', { name: /customer name/i })).toBeInTheDocument()
      })

      test('the CustomerId is not rendered', () => {
        expect(screen.queryByRole('cell', { name: /customer\.name/i })).not.toBeInTheDocument()
      })

      test("the customer's first month rewards are rendered", () => {
        expect(screen.getByRole('table').querySelector('td.first-month').textContent).toBe('1')
      })

      test("the customer's second month rewards are rendered", () => {
        expect(screen.getByRole('table').querySelector('td.second-month').textContent).toBe('2')
      })

      test("the customer's third month rewards are rendered", () => {
        expect(screen.getByRole('table').querySelector('td.third-month').textContent).toBe('3,000')
      })

      test("the customer's total rewards are rendered", () => {
        expect(screen.getByRole('table').querySelector('td.total').textContent).toBe('3,003')
      })
    })

    describe('when customerRewardsSummary is an array of multiple valid customers', () => {
      const customerRewardsSummary = [
        {
          customerId: 'Joshua.Chung',
          firstMonthRewards: 7987,
          secondMonthRewards: 3326,
          thirdMonthRewards: 1898,
          totalRewards: 13211,
        },
        {
          customerId: 'Lucas.Piedrahita',
          firstMonthRewards: 9528,
          secondMonthRewards: 6186,
          thirdMonthRewards: 4742,
          totalRewards: 20456,
        },
        {
          customerId: 'Lulu.Arose',
          firstMonthRewards: 5264,
          secondMonthRewards: 4265,
          thirdMonthRewards: 1871,
          totalRewards: 11400,
        },
        {
          customerId: 'Dianne.Ellis',
          firstMonthRewards: 7571,
          secondMonthRewards: 4472,
          thirdMonthRewards: 1408,
          totalRewards: 13451,
        },
        {
          customerId: 'Erika.Murphy',
          firstMonthRewards: 5326,
          secondMonthRewards: 4054,
          thirdMonthRewards: 2039,
          totalRewards: 11419,
        },
        {
          customerId: 'Campbell.Bolton',
          firstMonthRewards: 5117,
          secondMonthRewards: 3761,
          thirdMonthRewards: 2842,
          totalRewards: 11720,
        },
      ]

      test('all customers are rendered', () => {
        render(
          <DisplayCustomerRewardsTable
            customerRewardsSummary={customerRewardsSummary}
            firstMonth={0}
          />
        )
        expect(screen.getByRole('table').querySelector('tbody').querySelectorAll('tr').length).toBe(
          customerRewardsSummary.length
        )
      })
    })
  })

  describe('test that "firstMonth" prop affects render correctly', () => {
    const customerRewardsSummary = [
      {
        customerId: 'Joshua.Chung',
        firstMonthRewards: 7987,
        secondMonthRewards: 3326,
        thirdMonthRewards: 1898,
        totalRewards: 13211,
      },
      {
        customerId: 'Lucas.Piedrahita',
        firstMonthRewards: 9528,
        secondMonthRewards: 6186,
        thirdMonthRewards: 4742,
        totalRewards: 20456,
      },
    ]

    test.each([
      [0, ['January', 'February', 'March']],
      [1, ['February', 'March', 'April']],
      [2, ['March', 'April', 'May']],
      [3, ['April', 'May', 'June']],
      [4, ['May', 'June', 'July']],
      [5, ['June', 'July', 'August']],
      [6, ['July', 'August', 'September']],
      [7, ['August', 'September', 'October']],
      [8, ['September', 'October', 'November']],
      [9, ['October', 'November', 'December']],
    ])('when firstMonth is %i, table headers are %s', (firstMonth, expectedTableHeaders) => {
      render(
        <DisplayCustomerRewardsTable
          customerRewardsSummary={customerRewardsSummary}
          firstMonth={firstMonth}
        />
      )

      const firstMonthTableHeaderText = screen
        .getByRole('table')
        .querySelector('th.first-month').textContent
      const secondMonthTableHeaderText = screen
        .getByRole('table')
        .querySelector('th.second-month').textContent
      const thirdMonthTableHeaderText = screen
        .getByRole('table')
        .querySelector('th.third-month').textContent

      expect([
        firstMonthTableHeaderText,
        secondMonthTableHeaderText,
        thirdMonthTableHeaderText,
      ]).toEqual(expectedTableHeaders)
    })
  })
})
