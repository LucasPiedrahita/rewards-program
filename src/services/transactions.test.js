import axios from 'axios'
import transactionService from './transactions'

jest.mock('axios')

describe('testing getAll', () => {
  describe('when API call is successful', () => {
    it('should return list of transactions', async () => {
      const transactions = [
        {
          _id: '6166cfcf11e1eb3a84802a53',
          amount: 59.99,
          customerId: 'Campbell.Bolton',
          date: '2021-08-05T10:28:37',
        },
        {
          _id: '6166cfcfe47a008c5f4a7ebb',
          amount: 60.15,
          customerId: 'Erika.Murphy',
          date: '2021-08-10T07:31:14',
        },
        {
          _id: '6166cfcfa7af034adc06c42c',
          amount: 36.52,
          customerId: 'Erika.Murphy',
          date: '2021-05-17T05:12:35',
        },
      ]
      const response = { data: transactions }
      axios.get.mockResolvedValueOnce(response)

      // Act
      const result = await transactionService.getAll()

      // Assert
      expect(result).toEqual(transactions)
    })
  })

  describe('when API call fails', () => {
    it('should return an empty list of transactions', async () => {
      // Arrange
      const errorMsg = 'Network Error'
      axios.get.mockRejectedValueOnce(new Error(errorMsg))

      // Act
      const result = await transactionService.getAll()

      // Assert
      expect(result).toEqual([])
    })
  })
})
