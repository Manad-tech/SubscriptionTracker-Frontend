import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/auth/authSlice";
import { LayoutDashboard, Shield } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Clock } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  
  const MotionButton = motion(Button);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  const linkClasses =
    "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors gap-3 ";
  return (
    <div className="w-64 h-screen border-r border-border bg-card flex flex-col p-4 ">
      <div className="mb-8 ">
        <h2 className="text-lg font-semibold text-primary ">SubTracker</h2>
      </div>

      <nav className="flex flex-col gap-2 flex-1 ">
        <NavLink
          to="/dashboard"
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
          to="/add"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive ? "bg-primary text-primaryForeground" : "hover:bg-muted"
            }`
          }
        >
          <CirclePlus size={18} />
          Add Subscriptions
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive ? "bg-primary text-primaryForeground" : "hover:bg-muted"
            }`
          }
        >
          <Clock size={18} />
          History
        </NavLink>

        {user?.role === "Admin" && (
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "bg-primary text-primaryForeground"
                  : "hover:bg-muted"
              }`
            }
          >
            <Shield size={18} />
            Admin Panel
          </NavLink>
        )}
      </nav>

      <Dialog>
        <DialogTrigger asChild>
          <MotionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            variant="secondary"
            className="text-red-500"
          >
            Logout
          </MotionButton>
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log("Hover Started")}
            >
              <Button variant="outline">Cancel</Button>
            </motion.button>
            <MotionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => console.log("Hover Started")}
              variant="destructive"
              className="bg-red-500 rounded-md pl-3 pr-3"
              onClick={handleLogout}
            >
              Logout
            </MotionButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
