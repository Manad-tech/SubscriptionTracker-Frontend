import { Route, Routes } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

import Dashboard from "../features/subscriptions/pages/Dashboard";
import AddSubscription from "../features/subscriptions/pages/AddSubscription";
import History from "../features/subscriptions/pages/History";
import EditSubscription from "@/features/subscriptions/pages/EditSubscription";

import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import Users from "@/features/admin/pages/Users";
import AllSubscriptions from "@/features/admin/pages/AllSubscriptions";
import AdminLayout from "@/layout/AdminLayout";
import LandingPage from "@/features/landing/pages/LandingPage";
import AuthLayout from "@/layout/AuthLayout";
import Notifications from "@/pages/Notifications";
import Analytics from "@/features/admin/pages/Analytics"
import Accounts from "../pages/Accounts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddSubscription />} />
        <Route path="/history" element={<History />} />
        <Route path="/edit/:id" element={<EditSubscription />} />
        <Route path="/account" element={<Accounts />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="subscriptions" element={<AllSubscriptions />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
