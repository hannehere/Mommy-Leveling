"use client"
import Link from "next/link"
import SkillTree from "@/components/skill-tree"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function SkillTreePage() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-peach/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-peach transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Motherhood Skill Tree</h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Skill Tree Component */}
      <div className="container mx-auto px-4 py-12">
        <SkillTree />
      </div>

      <div className="bg-gradient-to-r from-peach/20 to-lavender/20 py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            View your personalized dashboard to track missions, earn XP, and celebrate your motherhood milestones.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-peach hover:bg-peach/90 text-foreground">
              Go to My Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-lavender/10 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-foreground/60 text-sm">
          <p>Every skill unlocked is a step toward becoming the mom you want to be.</p>
        </div>
      </footer>
    </main>
  )
}
