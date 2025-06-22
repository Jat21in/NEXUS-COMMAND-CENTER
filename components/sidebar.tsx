"use client"

import { useGame } from "./game-context"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { LayoutDashboard, User, Palette, Trophy } from "lucide-react"

interface SidebarProps {
  activePanel: string
  setActivePanel: (panel: string) => void
}

export function Sidebar({ activePanel, setActivePanel }: SidebarProps) {
  const { state } = useGame()

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "avatar", label: "Avatar", icon: User },
    { id: "themes", label: "Theme Store", icon: Palette },
    { id: "achievements", label: "Achievements", icon: Trophy },
  ]

  const completedTasks = state.tasks.filter((t) => t.status === "done").length
  const totalTasks = state.tasks.length

  return (
    <aside
      className={`w-64 border-r-2 p-4 ${
        state.retro ? "bg-blue-900 border-cyan-400" : "bg-slate-800/50 border-purple-500 backdrop-blur-sm"
      }`}
    >
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activePanel === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${state.retro ? "text-yellow-300 hover:bg-cyan-800" : ""}`}
            onClick={() => setActivePanel(item.id)}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className={`mt-8 p-4 rounded-lg ${state.retro ? "bg-cyan-900 border border-cyan-400" : "bg-slate-700/50"}`}>
        <h3 className={`font-bold mb-2 ${state.retro ? "text-yellow-300" : "text-white"}`}>📋 QUESTS</h3>
        <div className="text-sm">
          <div className="flex justify-between">
            <span>Completed:</span>
            <Badge variant="secondary">
              {completedTasks}/{totalTasks}
            </Badge>
          </div>
          <div className="flex justify-between mt-1">
            <span>Streak:</span>
            <Badge variant="outline">🔥 {state.streak} days</Badge>
          </div>
        </div>
      </div>

      <div
        className={`mt-4 p-4 rounded-lg ${state.retro ? "bg-purple-900 border border-purple-400" : "bg-purple-700/50"}`}
      >
        <h3 className={`font-bold mb-2 ${state.retro ? "text-yellow-300" : "text-white"}`}>🏆 REWARDS</h3>
        <div className="text-center">
          <div className="text-2xl mb-1">🥇</div>
          <div className="text-xs">Next reward at Level {state.level + 1}</div>
        </div>
      </div>
    </aside>
  )
}
