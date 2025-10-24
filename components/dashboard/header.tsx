"use client"

import { useState } from "react"
import { ChevronDown, Settings, LogOut, User } from "lucide-react"

export default function DashboardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-peach/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center">
            <span className="text-xl font-bold text-white">ML</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-peach to-lavender bg-clip-text text-transparent">
            Mommy Leveling
          </h1>
        </div>

        {/* User Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-baby-blue/20 hover:bg-baby-blue/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint to-baby-blue flex items-center justify-center">
              <span className="text-sm font-bold text-white">M</span>
            </div>
            <span className="text-sm font-medium text-gray-700">Mom</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-peach/20 z-50">
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cream transition-colors text-left">
                <User className="w-4 h-4 text-lavender" />
                <span className="text-sm font-medium">Profile</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cream transition-colors text-left">
                <Settings className="w-4 h-4 text-baby-blue" />
                <span className="text-sm font-medium">Settings</span>
              </button>
              <hr className="border-peach/20" />
              <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cream transition-colors text-left text-red-500">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
