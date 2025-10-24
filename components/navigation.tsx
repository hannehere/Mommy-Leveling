"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/skill-tree", label: "Skill Tree" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-peach/20 dark:border-peach/10 w-full max-w-full overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-peach rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center">
              <span className="text-white font-bold text-sm">ML</span>
            </div>
            <span className="font-bold text-foreground hidden sm:inline">Mommy Leveling</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-peach rounded px-2 py-1 ${
                  isActive(item.href) ? "text-peach" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-3 focus:outline-none focus:ring-2 focus:ring-peach rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-nav" className="md:hidden pb-4 space-y-2 w-full max-w-full overflow-hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-peach text-base font-medium w-full ${
                  isActive(item.href)
                    ? "bg-peach/20 text-peach"
                    : "text-foreground/70 hover:bg-peach/10 dark:hover:bg-peach/5"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
