import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { fetchNotifications } from "@/features/notifications/notificationSlice"

const Notifications = () => {
  const dispatch = useDispatch<AppDispatch>()

  const notifications =
    useSelector((state: RootState) => state.notifications.notifications) || []

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  return (
    <div className="p-6 bg-background text-foreground">
      <h1 className="text-xl font-semibold mb-6">Notifications</h1>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-muted-foreground">No notifications</p>
        ) : (
          notifications.map((n: any) => (
            <div
              key={n._id}
              className={`p-4 rounded-lg border ${
                !n.read ? "bg-card" : ""
              }`}
            >
              {n.message}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notifications