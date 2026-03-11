import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-[var(--card)] border-r border-[var(--border)] p-4">

      <h2 className="text-xl font-semibold mb-6">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-3">

        <Link to="/admin/dashboard" className="hover:text-primary">
          Dashboard
        </Link>

        <Link to="/admin/users" className="hover:text-primary">
          Users
        </Link>

        <Link to="/admin/subscriptions" className="hover:text-primary">
          Subscriptions
        </Link>

        <Link to="/admin/analytics" className="hover:text-primary">
          Analytics
        </Link>

      </nav>

    </aside>
  );
};

export default AdminSidebar;