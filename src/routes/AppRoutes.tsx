import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddSubscription from "../pages/AddSubscription";
import History from "../pages/History";
import Layout from "../layout/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddSubscription />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
