import axios from "axios";

const API_URL = 'http://localhost:5000/api/subscriptions'

export const getSubscriptions = async () => {

  const token = localStorage.getItem('token')

  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  return res.data
}

export const createSubscriptions = async (data: any) => {

  const token = localStorage.getItem('token')

  const res = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}

export const deleteSubscription = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`)

}

export const createSubscription = async (data: any) => {
  const res = await axios.post(
    "http://localhost:5000/api/subscriptions",
    data
  )

  return res.data
}