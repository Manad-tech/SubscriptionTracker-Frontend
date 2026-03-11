export const saveAuth = (data: any) => {
  localStorage.setItem("token", data.token)
  localStorage.setItem("role", data.user.role)
  localStorage.setItem("user", JSON.stringify(data.user))
}

export const getRole = () => {
  return localStorage.getItem("role")
}

export const logout = () => {
  localStorage.clear()
}