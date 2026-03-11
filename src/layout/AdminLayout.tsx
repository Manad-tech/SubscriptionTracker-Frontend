import { Outlet } from "react-router-dom";
import AdminSidebar from "@/features/admin/components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      <AdminSidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;