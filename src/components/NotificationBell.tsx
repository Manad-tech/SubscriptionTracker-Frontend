import { Bell } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { useNavigate } from "react-router-dom"

const NotificationBell = () => {
  const navigate = useNavigate()

  const notifications =
    useSelector((state: RootState) => state.notifications.notifications) || []

  const unreadCount = notifications.filter((n: any) => !n.read).length

  return (
    <button
      onClick={() => navigate("/notifications")}
      className="relative p-2 rounded-md hover:bg-muted transition"
    >
      <Bell className="w-5 h-5" />

      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
          {unreadCount}
        </span>
      )}
    </button>
  )
}

export default NotificationBell