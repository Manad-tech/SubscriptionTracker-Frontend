import gsap from "gsap"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const LandingPage = () => {

  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {

    gsap.fromTo(
      cardsRef.current,
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }
    )
  }, [])

  return (
    <div className="bg-background text-foreground min-h-screen">

      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <h1 className="text-xl font-bold">
            SubTrack
          </h1>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md hover:bg-secondary"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
            >
              Get Started
            </Link>
          </div>

        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Track All Your Subscriptions
          In One Place
        </h2>

        <p className="text-muted-foreground mb-8">
          Monitor spending, manage subscriptions, and never miss
          a renewal again.
        </p>

        <Link
          to="/register"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Start Tracking
        </Link>

      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        <div 
          ref={(el) => el && (cardsRef.current[0] = el)} 
          className="bg-card border border-border p-6 rounded-xl hover:-translate-y-2 hover:shadow-xl">
          <h3 className="font-semibold mb-2">
            Subscription Tracker
          </h3>
          <p className="text-muted-foreground">
            Add and manage all your subscriptions easily.
          </p>
        </div>

        <div 
          ref={(el) => el && (cardsRef.current[1] = el)} 
          className="bg-card border border-border p-6 rounded-xl hover:-translate-y-2 hover:shadow-xl">
          <h3 className="font-semibold mb-2">
            Spending Analytics
          </h3>
          <p className="text-muted-foreground">
            Visualize your monthly subscription costs.
          </p>
        </div>

        <div 
          ref={(el) => el && (cardsRef.current[2] = el)} 
          className="bg-card border border-border p-6 rounded-xl hover:-translate-y-2 hover:shadow-xl">
          <h3 className="font-semibold mb-2">
            Renewal Reminders
          </h3>
          <p className="text-muted-foreground">
            Never forget upcoming subscription renewals.
          </p>
        </div>

      </section>

      <footer className="border-t border-border text-center py-6 text-muted-foreground">
        © {new Date().getFullYear()} SubTrack
      </footer>

    </div>
  )
}

export default LandingPage
