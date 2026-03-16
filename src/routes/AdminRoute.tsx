import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

const AdminRoute = ({ children }: any) => {

  const { user } = useSelector((state: RootState) => state.auth)

  if(user?.role !== "Admin"){
    return <Navigate to="/dashboard"/>
  }

  return children
}

export default AdminRoute