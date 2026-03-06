import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddSubscription from "../pages/AddSubscription";
import History from "../pages/History";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<Layout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              {/* <AdminPanel /> */}
            </ProtectedRoute>
          }
        />
        <Route path="/add" element={<AddSubscription />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
