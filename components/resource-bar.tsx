"use client"

import { useGame } from "./game-context"
import { Progress } from "./ui/progress"
import { Coins, Gem, Zap, Droplets, Heart } from "lucide-react"

export function ResourceBar() {
  const { state } = useGame()
  const { player, resources } = state

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/30 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Health */}
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-red-400" />
            <div className="w-20">
              <Progress value={player.health} className="h-2 bg-slate-700" />
            </div>
            <span className="text-xs text-red-400 font-mono">{player.health}/100</span>
          </div>

          {/* Mana */}
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-400" />
            <div className="w-20">
              <Progress value={player.mana} className="h-2 bg-slate-700" />
            </div>
            <span className="text-xs text-blue-400 font-mono">{player.mana}/100</span>
          </div>

          {/* Energy */}
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <div className="w-20">
              <Progress value={player.energy} className="h-2 bg-slate-700" />
            </div>
            <span className="text-xs text-yellow-400 font-mono">{player.energy}/100</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {/* Coins */}
          <div className="flex items-center space-x-1">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-500 font-mono">{resources.coins.toLocaleString()}</span>
          </div>

          {/* Gems */}
          <div className="flex items-center space-x-1">
            <Gem className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-mono">{resources.gems}</span>
          </div>

          {/* Reputation */}
          <div className="flex items-center space-x-1">
            <span className="text-green-400">🏆</span>
            <span className="text-green-400 font-mono">{resources.reputation}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
