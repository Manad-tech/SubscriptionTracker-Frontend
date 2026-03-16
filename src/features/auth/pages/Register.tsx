import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { register } from "@/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { Card } from "@/components/ui/card";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register Clicked");

    dispatch(register({ name, email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)] ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 w-[400px] shadow-lg ">
          <h1 className="text-2xl font-semibold text-center mb-6 ">Register</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border border-[var(--border)] rounded-md p-2 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-[var(--border)] rounded-md p-2 focus:outline-none "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-[var(--border)] rounded-md p-2 focus:outline-none "
            />

            {error && <p className="text-red-400 text-sm ">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary)] text-white rounded-md p-2 font-medium hover:opacity-90 transition cursor-pointer"
            >
              {loading ? "Registering in..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-center mt-5 text-muted ">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
