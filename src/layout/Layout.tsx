import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NotificationBell from "@/components/NotificationBell";

const Layout = () => {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden ">
      <Sidebar />

      <div className="flex flex-col flex-1 ">
        <Navbar />

        <main className="p-6 flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
