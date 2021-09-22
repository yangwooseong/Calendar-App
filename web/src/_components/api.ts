import Contants from './Contants'
import { modalState } from '../_interfaces/modalState'

async function createPlan(requestBody: modalState) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  }

  try {
    const response = await fetch(`${Contants.ENDPOINT}/plans`, requestOptions)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return data
    } else {
      throw await response.json()
    }
  } catch (err) {
    throw err
  }
}

const api = {
  createPlan,
}

export default api
