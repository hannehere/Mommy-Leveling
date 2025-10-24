import Navigation from "@/components/navigation"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Missions from "@/components/missions"
import Community from "@/components/community"
import Learning from "@/components/learning"
import CTA from "@/components/cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-cream w-full max-w-full overflow-x-hidden">
      <Navigation />
      <Header />
      <Hero />
      <Features />
      <Missions />
      <Community />
      <Learning />
      <CTA />
      <Footer />
    </main>
  )
}
