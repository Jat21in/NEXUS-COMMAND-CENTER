"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Plus, Calendar, Clock, Trophy } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "meeting" | "deadline" | "maintenance" | "event"
  xpReward: number
  completed?: boolean
}

export function CalendarView() {
  const { state, dispatch } = useGame()
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "System Maintenance",
      date: "2024-01-20",
      time: "02:00",
      type: "maintenance",
      xpReward: 50,
    },
    {
      id: "2",
      title: "Team Meeting",
      date: "2024-01-22",
      time: "14:00",
      type: "meeting",
      xpReward: 25,
    },
    {
      id: "3",
      title: "Project Deadline",
      date: "2024-01-25",
      time: "23:59",
      type: "deadline",
      xpReward: 100,
    },
  ])
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    type: "meeting" as CalendarEvent["type"],
  })

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.time) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      type: newEvent.type,
      xpReward: newEvent.type === "deadline" ? 100 : newEvent.type === "maintenance" ? 50 : 25,
    }

    setEvents([...events, event])
    setNewEvent({ title: "", date: "", time: "", type: "meeting" })

    toast({
      title: "📅 Event Scheduled!",
      description: `${event.title} has been added to your calendar.`,
      duration: 2000,
    })
  }

  const handleCompleteEvent = (eventId: string) => {
    const event = events.find((e) => e.id === eventId)
    if (event && !event.completed) {
      setEvents(events.map((e) => (e.id === eventId ? { ...e, completed: true } : e)))
      dispatch({ type: "GAIN_RESOURCES", resources: { xp: event.xpReward, coins: 15 } })

      toast({
        title: "🎉 Event Completed!",
        description: `${event.title} completed! +${event.xpReward} XP earned!`,
        duration: 3000,
      })
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-600"
      case "deadline":
        return "bg-red-600"
      case "maintenance":
        return "bg-yellow-600"
      case "event":
        return "bg-purple-600"
      default:
        return "bg-gray-600"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "👥"
      case "deadline":
        return "⏰"
      case "maintenance":
        return "🔧"
      case "event":
        return "🎉"
      default:
        return "📅"
    }
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return events.filter((event) => event.date === dateStr)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          📅 Time Nexus
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-purple-500">
            <DialogHeader>
              <DialogTitle className="text-purple-400">Schedule New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Event Title</label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title..."
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Date</label>
                  <Input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300">Time</label>
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Type</label>
                <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">👥 Meeting (25 XP)</SelectItem>
                    <SelectItem value="deadline">⏰ Deadline (100 XP)</SelectItem>
                    <SelectItem value="maintenance">🔧 Maintenance (50 XP)</SelectItem>
                    <SelectItem value="event">🎉 Event (25 XP)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddEvent} className="w-full bg-purple-600 hover:bg-purple-700">
                Schedule Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center justify-between">
              <span>{currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="border-purple-400 text-purple-400"
                >
                  ←
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="border-purple-400 text-purple-400"
                >
                  →
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((day) => (
                <div key={`empty-${day}`} className="h-20 p-1"></div>
              ))}

              {days.map((day) => {
                const dayEvents = getEventsForDay(day)
                const isToday =
                  new Date().getDate() === day &&
                  new Date().getMonth() === currentDate.getMonth() &&
                  new Date().getFullYear() === currentDate.getFullYear()

                return (
                  <div
                    key={day}
                    className={`h-20 p-1 border rounded-lg ${
                      isToday ? "border-purple-400 bg-purple-900/20" : "border-slate-600 bg-slate-700/30"
                    }`}
                  >
                    <div className="text-sm font-medium text-white mb-1">{day}</div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${getEventTypeColor(event.type)} ${
                            event.completed ? "opacity-50" : ""
                          }`}
                        >
                          {getEventTypeIcon(event.type)} {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-400">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-slate-800/50 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-cyan-400">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events
                .filter((event) => !event.completed)
                .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getEventTypeIcon(event.type)}</span>
                        <div>
                          <h4 className="font-medium text-white text-sm">{event.title}</h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)} border-current`}>
                        {event.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="flex items-center space-x-1 border-purple-400 text-purple-400"
                      >
                        <Trophy className="w-3 h-3" />
                        <span>{event.xpReward} XP</span>
                      </Badge>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCompleteEvent(event.id)}
                        className="text-xs border-green-400 text-green-400 hover:bg-green-400/20"
                      >
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}

              {events.filter((event) => !event.completed).length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📅</div>
                  <p className="text-gray-400 text-sm">No upcoming events</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
