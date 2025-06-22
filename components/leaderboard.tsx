"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

const mockLeaderboard = [
  { name: "Player 1", xp: 4500, level: 5 },
  { name: "Player 2", xp: 3000, level: 4 },
  { name: "Player 3", xp: 2200, level: 3 },
  { name: "You", xp: 1300, level: 3 },
]

export function Leaderboard() {
  const { state } = useGame()

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{index + 1}</span>
    }
  }

  return (
    <Card className={`${state.retro ? "bg-blue-900 border-cyan-400 border-2" : "bg-slate-800/50 border-purple-500"}`}>
      <CardHeader>
        <CardTitle className={`${state.retro ? "text-yellow-300" : "text-white"}`}>🏆 LEADERBOARD</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLeaderboard.map((player, index) => (
            <div
              key={player.name}
              className={`flex items-center justify-between p-3 rounded ${
                player.name === "You"
                  ? state.retro
                    ? "bg-cyan-800 border border-cyan-400"
                    : "bg-purple-700/50"
                  : state.retro
                    ? "bg-slate-800"
                    : "bg-slate-700/30"
              }`}
            >
              <div className="flex items-center space-x-3">
                {getRankIcon(index)}
                <span className={`font-medium ${state.retro ? "text-yellow-200" : "text-white"}`}>{player.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Lvl {player.level}</Badge>
                <Badge variant="outline">{player.xp} XP</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
