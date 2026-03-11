import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import gsap from "gsap"

const AuthTransition = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      {
        x: 60,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      }
    )
  }, [location.pathname])

  return <div ref={containerRef}>{children}</div>
}

export default AuthTransition