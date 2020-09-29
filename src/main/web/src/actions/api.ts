import { API_URL } from "../constants/api"
import axios, { AxiosResponse } from "axios"
import { ClassSpec } from "../types/api"

// TODO: Fix type checks for Promises in this file, aka do not use "any"

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

export async function postRaid(
  gridValues: ClassSpec[][] | undefined[][],
): Promise<string> {
  return (await axios.post(`${API_URL}/raid`, gridValues)).data
}

export async function putRaid(
  gridValues: ClassSpec[][] | undefined[][],
  raidId: string,
): Promise<AxiosResponse> {
  return (await axios.put(`${API_URL}/raid/${raidId}`, gridValues)).data
}

export async function fetchRaid(raidId: string): Promise<ClassSpec[][]> {
  return (await axios.get(`${API_URL}/raid/${raidId}`)).data
}
