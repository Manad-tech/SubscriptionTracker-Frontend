import axios from "axios";

const API_URL = 'http://localhost:5000/api/subscriptions'

export const getSubscriptionById = async (id: string) => {

  const token = localStorage.getItem("token")

  const res = await axios.get(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}

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

export const createSubscription = async (data: any) => {
  const res = await axios.post(
    "http://localhost:5000/api/subscriptions",
    data
  )

  return res.data
}

export const updateSubscription = async (id: string, data: any) => {

  const token = localStorage.getItem("token")

  const res = await axios.patch(
    `http://localhost:5000/api/subscriptions/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}

export const deleteSubscription = async (id: string) => {
  const token = localStorage.getItem("token")

  const res = await axios.delete(
    `http://localhost:5000/api/subscriptions/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}