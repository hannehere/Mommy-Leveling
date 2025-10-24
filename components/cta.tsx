"use client"

import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-cream">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 text-6xl" aria-hidden="true">
          👩‍🍼✨
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          <span className="text-pretty">You're not alone on this journey</span>
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Join thousands of moms who are leveling up their motherhood journey with support, growth, and community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/skill-tree">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-peach to-lavender text-white rounded-full font-semibold hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-peach text-base min-h-12">
              View Your Skill Tree
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="w-full sm:w-auto px-8 py-4 border-2 border-slate-300 text-slate-900 rounded-full font-semibold hover:bg-slate-50 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 text-base min-h-12">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
