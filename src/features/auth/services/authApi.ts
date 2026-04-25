import axios from "axios"

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
})

export const loginUser = async (data: any) => {
  const res = await API.post("/auth/login", data)
  return res.data
}