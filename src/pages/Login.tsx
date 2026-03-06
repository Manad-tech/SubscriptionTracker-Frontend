import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "@/store/authSlice";
import type { AppDispatch, RootState } from "@/store/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-8 w-[400px] shadow-lg ">
        <h1 className="text-2xl font-semibold text-center mb-6 ">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
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
            disabled={true}
            className="bg-[var(--primary)] text-white rounded-md p-2 font-medium hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
