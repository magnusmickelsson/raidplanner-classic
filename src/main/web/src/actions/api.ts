import { API_URL } from "../constants/api"

export async function fetchSpecs(): Promise<any> {
  const response = await fetch(`${API_URL}/spec`)
  const resultData = await response.json()
  return Promise.resolve(resultData)
}
