import { API_URL } from "../constants/api"

export async function fetchSpecs(): Promise<any> {
  const response = await fetch(`${API_URL}/spec`)
  const resultData = await response.json()
  return Promise.resolve(resultData)
}

export async function fetchSpecsByFaction(faction: string): Promise<any> {
  const response = await fetch(`${API_URL}/faction/${faction}/spec`)
  const resultData = await response.json()
  return Promise.resolve(resultData)
}

export async function fetchSpecsByClassForFaction(
  faction: string,
): Promise<any> {
  const response = await fetch(`${API_URL}/faction/${faction}/specByClass`)
  const resultData = await response.json()
  return Promise.resolve(resultData)
}

export async function fetchDebuffs(): Promise<any> {
  const response = await fetch(`${API_URL}/debuff`)
  const resultData = await response.json()
  return Promise.resolve(resultData)
}

export async function fetchItems(): Promise<any> {
  const response = await fetch(`${API_URL}/item`)
  const resultData = await response.json()
  return Promise.resolve(resultData)
}
