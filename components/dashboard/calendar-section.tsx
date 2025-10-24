"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface Event {
  date: number
  title: string
  type: "mom" | "baby" | "appointment"
  color: string
}

export default function CalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 9))

  const events: Event[] = [
    { date: 5, title: "Doctor Checkup", type: "appointment", color: "bg-red-100 border-red-300" },
    { date: 12, title: "Baby Vaccination", type: "baby", color: "bg-baby-blue/20 border-baby-blue" },
    { date: 18, title: "Mom's Self-Care Day", type: "mom", color: "bg-peach/20 border-peach" },
    { date: 25, title: "Baby Milestone Check", type: "baby", color: "bg-mint/20 border-mint" },
  ]

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getEventForDate = (date: number) => events.find((e) => e.date === date)

  const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-peach/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-lavender" />
          <h2 className="text-xl font-bold text-gray-800">Schedule & Reminders</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-semibold text-gray-800 min-w-32 text-center">{monthName}</span>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
            {day}
          </div>
        ))}

        {/* Empty Days */}
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Calendar Days */}
        {days.map((day) => {
          const event = getEventForDate(day)
          const isToday = day === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth()

          return (
            <div
              key={day}
              className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                isToday
                  ? "bg-gradient-to-br from-peach to-lavender text-white shadow-lg"
                  : event
                    ? `${event.color} border-2`
                    : "bg-gray-50 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {day}
            </div>
          )
        })}
      </div>

      {/* Events List */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-800 mb-3">Upcoming Events</p>
        {events.map((event, i) => (
          <div key={i} className={`p-3 rounded-lg border-2 ${event.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                <p className="text-xs text-gray-600 capitalize">
                  {event.type === "appointment" ? "Appointment" : event.type === "baby" ? "Baby Event" : "Mom Event"}
                </p>
              </div>
              <span className="text-sm font-bold text-gray-600">Oct {event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
