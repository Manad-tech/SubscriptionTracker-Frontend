import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../../features/auth/authSlice";
import { CirclePlus, Clock, LayoutDashboard, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { RootState } from "@/store/store";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const linkClasses =
    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors gap-3 ";
  return (
    <aside className="w-64 h-screen border-r border-border bg-card flex flex-col p-4 ">
      <h2 className="text-xl font-semibold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-2 flex-1 ">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive ? "bg-primary text-primaryForeground" : "hover:bg-muted"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="users"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive ? "bg-primary text-primaryForeground" : "hover:bg-muted"
            }`
          }
        >
          <CirclePlus size={18} />
          Users
        </NavLink>
        <NavLink
          to="subscriptions"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive ? "bg-primary text-primaryForeground" : "hover:bg-muted"
            }`
          }
        >
          <Clock size={18} />
          All Subscriptions
        </NavLink>

        <NavLink
          to="analytics"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive ? "bg-primary text-primaryForeground" : "hover:bg-muted"
            }`
          }
        >
          <Clock size={18} />
          Analytics
        </NavLink>
      </nav>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="text-red-500">Logout</Button>
        </DialogTrigger>

        <DialogContent className="text-cardForeground">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will need to login again to
              access your account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive" className="bg-red-500" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
};

export default AdminSidebar;
