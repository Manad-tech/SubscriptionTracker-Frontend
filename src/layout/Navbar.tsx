import { User } from "lucide-react"
import NotificationBell from "@/components/NotificationBell"

const Navbar = () => {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">

      {/* Page Title */}
      <h1 className="text-lg font-semibold">Dashboard</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Notification Bell */}
        <NotificationBell />

        {/* Account */}
        <div className="flex items-center gap-2 cursor-pointer">
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Account</span>
        </div>

      </div>
    </div>
  )
}

export default Navbar