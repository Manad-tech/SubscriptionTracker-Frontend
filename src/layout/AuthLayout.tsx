import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import gsap from "gsap";
import AuthTransition from "@/components/AuthTransition";

const AuthLayout = () => {
  const leftPanel = useRef<HTMLDivElement>(null);
  const formCard = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftPanel.current || !formCard.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      leftPanel.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
    );

    tl.fromTo(
      formCard.current,
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
      "-=0.4",
    );
  }, []);

  return (
    <div className="min-h-screen grid md:grid-cols-2">

      <div
        ref={leftPanel}
        className="hidden md:flex flex-col justify-center px-20 bg-gradient-to-br from-indigo-600 to-indigo-500 text-white"
      >
        <h1 className="text-5xl font-bold mb-6">SubTrack</h1>

        <p className="text-lg leading-relaxed max-w-md opacity-90">
          Track all your subscriptions in one place, monitor spending, and never
          miss a renewal again.
        </p>
      </div>

      <div className="flex items-center justify-center bg-[var(--background)] px-6">
        <div
          ref={formCard}
          className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <AuthTransition>
            <Outlet />
          </AuthTransition>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
