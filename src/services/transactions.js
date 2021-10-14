import axios from 'axios'

const baseUrl = 'http://localhost:3001/transactions'

/**
 * Function that fetches transaction data asynchronously
 * @author   Lucas Piedrahita
 * @return   {Array.<{_id: String, amount: Number, customerId: String, date: String}>}  Array of transactions
 */
const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const services = { getAll }

export default services
