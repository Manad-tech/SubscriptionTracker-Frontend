import { User, Settings } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import NotificationBell from "@/components/NotificationBell"
import { Card } from "@/components/ui/card"

const Navbar = () => {

  const [open,setOpen] = useState(false)

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">

      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4 relative">

        <NotificationBell />

        <div
          onClick={()=>setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <User className="w-5 h-5" />
        </div>

        {open && (

          <Card className="absolute right-0 top-10 w-44 bg-card border rounded-lg shadow-md">

            <Link
              to="/account"
              className="flex items-center gap-2 px-4 py-2"
            >
              <User className="w-4 h-4"/>
              Account
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Settings className="w-4 h-4"/>
              Settings
            </Link>

          </Card>

        )}

      </div>
    </div>
  )
}

export default Navbar