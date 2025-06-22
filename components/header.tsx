"use client"

import { useGame } from "./game-context"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { AdvancedAvatar } from "./advanced-avatar"
import { Gamepad2, Zap, Crown, Shield } from "lucide-react"

export function Header() {
  const { state, dispatch } = useGame()
  const { player } = state

  const xpToNextLevel = (player.level + 1) * 500
  const progressPercent = (player.xp % 500) / 5

  return (
    <header className="border-b-2 border-purple-500/50 p-4 bg-gradient-to-r from-slate-900 via-purple-900/50 to-slate-900 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <AdvancedAvatar size="lg" animated />

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ⚡ NEXUS COMMAND CENTER ⚡
            </h1>
            <div className="flex items-center space-x-4 mt-1">
              <Badge variant="secondary" className="flex items-center space-x-1 bg-purple-600">
                <Crown className="w-4 h-4" />
                <span>
                  Level {player.level} {player.class}
                </span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1 border-cyan-400 text-cyan-400">
                <Zap className="w-4 h-4" />
                <span>XP: {player.xp}</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1 border-green-400 text-green-400">
                <Shield className="w-4 h-4" />
                <span>Guild: {state.guild.name}</span>
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-sm text-gray-400 mb-1">Next Level Progress</div>
            <div className="w-48">
              <Progress value={progressPercent} className="h-3 bg-slate-700" />
            </div>
            <div className="text-xs text-gray-500 mt-1">{player.xp % 500} / 500 XP</div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch({ type: "TOGGLE_RETRO" })}
            className="flex items-center space-x-1 border-purple-400 text-purple-400 hover:bg-purple-400/20"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{state.retro ? "Retro" : "Cyber"}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
