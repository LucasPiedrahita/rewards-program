import axios from 'axios'

const baseUrl = 'http://localhost:3001/transactions'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const services = { getAll }

export default services
