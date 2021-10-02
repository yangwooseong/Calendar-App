import IDateRange from '../_interfaces/IDateRange'
import { IModalState } from '../_interfaces/IModalState'
import Contants from './Contants'

async function createPlan(requestBody: IModalState) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  }

  try {
    const response = await fetch(`${Contants.ENDPOINT}/plans`, requestOptions)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw await response.json()
    }
  } catch (err) {
    throw err
  }
}

async function planList(requestBody: IDateRange) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  }

  try {
    const response = await fetch(
      `${Contants.ENDPOINT}/request_plan`,
      requestOptions
    )
    if (response.ok) {
      const data = await response.json()
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
  planList,
}

export default api
