import axios from "axios";
import { data } from "react-router";

const API_URL = 'http://localhost:5000/api/subscriptions'

export const getSubscriptions = async () => {
  const res = await axios.get(API_URL)
  return res.data
}

export const createSubscriptions = async (data: any) => {
  const res = await axios.post(API_URL, data)
  return res.data
}

export const deleteSubscription = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`)
}