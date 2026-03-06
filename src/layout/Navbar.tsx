import { Button } from "@/components/ui/button"
import { Bell , User } from "lucide-react"

const Navbar = () => {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      
      <h1 className="text-lg font-semibold ">Dashboard</h1>

      <div className="flex items-center gap-4 ">
        <Button className="p-2 rounded-md hover:bg-muted">
          <Bell className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-1">
          <User className="w-5 h-5" />
          <span className="text-md ">Account</span>
        </div>

      </div>
    </div>
  )
}

export default Navbar
