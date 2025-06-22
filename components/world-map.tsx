"use client"

import { useGame } from "./game-context"
import { Button } from "./ui/button"
import { Lock } from "lucide-react"

export function WorldMap() {
  const { state, dispatch } = useGame()

  const locations = [
    {
      id: "dashboard",
      name: "Command Center",
      icon: "🏰",
      description: "Main control hub",
      unlocked: true,
    },
    {
      id: "analytics",
      name: "Data Realm",
      icon: "📊",
      description: "Analytics",
      unlocked: true,
    },
    {
      id: "users",
      name: "User Kingdom",
      icon: "👥",
      description: "User management",
      unlocked: true,
    },
    {
      id: "system",
      name: "Tech Fortress",
      icon: "⚙️",
      description: "System monitoring",
      unlocked: true,
    },
    {
      id: "battle",
      name: "Bug Arena",
      icon: "⚔️",
      description: "Fight system",
      unlocked: true,
    },
    {
      id: "shop",
      name: "Upgrade Bazaar",
      icon: "🛒",
      description: "Enhance abilities",
      unlocked: true,
    },
    {
      id: "kanban",
      name: "Quest Board",
      icon: "📋",
      description: "Task management",
      unlocked: true,
    },
    {
      id: "calendar",
      name: "Time Nexus",
      icon: "📅",
      description: "Schedule events",
      unlocked: true,
    },
    {
      id: "themes",
      name: "Theme Store",
      icon: "🎨",
      description: "Appearances",
      unlocked: true,
    },
  ]

  return (
    <div className="p-4 border-b border-purple-500/30">
      <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center">🗺️ Navigation Portal</h3>

      <div className="grid grid-cols-2 gap-2">
        {locations.map((location) => (
          <Button
            key={location.id}
            variant={state.activeLocation === location.id ? "default" : "outline"}
            size="sm"
            disabled={!location.unlocked}
            onClick={() => dispatch({ type: "CHANGE_LOCATION", locationId: location.id })}
            className={`h-auto p-3 flex flex-col items-center space-y-1 ${
              state.activeLocation === location.id
                ? "bg-purple-600 border-purple-400"
                : "border-purple-500/50 hover:border-purple-400"
            }`}
          >
            <div className="text-lg">{location.unlocked ? location.icon : <Lock className="w-4 h-4" />}</div>
            <div className="text-xs font-medium text-center">{location.name}</div>
            <div className="text-xs text-gray-400 text-center">{location.description}</div>
          </Button>
        ))}
      </div>
    </div>
  )
}
