"use client"

import { useGame } from "./game-context"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Plus, Sword, Brain, Zap, Users } from "lucide-react"

export function PlayerStats() {
  const { state, dispatch } = useGame()
  const { player, resources } = state

  const statIcons = {
    strength: Sword,
    intelligence: Brain,
    agility: Zap,
    leadership: Users,
  }

  const handleStatUpgrade = (stat: keyof typeof player.stats) => {
    if (resources.coins >= 100) {
      dispatch({ type: "LEVEL_UP_STAT", stat })
    }
  }

  return (
    <div className="p-4 border-b border-purple-500/30">
      <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center">⚔️ Character Stats</h3>

      <div className="space-y-3">
        {Object.entries(player.stats).map(([stat, value]) => {
          const Icon = statIcons[stat as keyof typeof statIcons]
          return (
            <div key={stat} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300 capitalize">{stat}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="font-mono">
                  {value}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatUpgrade(stat as keyof typeof player.stats)}
                  disabled={resources.coins < 100}
                  className="w-6 h-6 p-0 border-purple-400 text-purple-400 hover:bg-purple-400/20"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
        <div className="text-xs text-gray-400 mb-2">Class Abilities</div>
        <div className="space-y-1">
          <div className="text-xs text-purple-300">• System Mastery</div>
          <div className="text-xs text-purple-300">• Data Manipulation</div>
          <div className="text-xs text-purple-300">• User Command</div>
        </div>
      </div>
    </div>
  )
}
