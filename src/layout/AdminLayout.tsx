import { Outlet } from "react-router-dom";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden ">
      <AdminSidebar />

      <div className="flex flex-col flex-1 ">
        <Navbar />

        <main className="p-6 flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;