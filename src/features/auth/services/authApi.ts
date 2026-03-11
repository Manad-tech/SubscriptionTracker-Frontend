import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api",
})

export const loginUser = async (data: any) => {
  const res = await API.post("/auth/login", data)
  return res.data
}