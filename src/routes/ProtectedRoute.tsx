import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '@/store/store'
import type React from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

const ProtectedRoute = ({ children , adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  )

  const token = localStorage.getItem('token')

  if (!token || !isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (adminOnly && user?.role !== 'Admin') {
    return <Navigate to='/dashboard' replace />
  }

  return <>{children} </>
}

export default ProtectedRoute