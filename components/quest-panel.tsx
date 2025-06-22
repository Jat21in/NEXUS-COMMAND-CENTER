"use client"

import { useGame } from "./game-context"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Clock, Star, Trophy } from "lucide-react"

export function QuestPanel() {
  const { state, dispatch } = useGame()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400 border-green-400"
      case "medium":
        return "text-yellow-400 border-yellow-400"
      case "hard":
        return "text-red-400 border-red-400"
      case "legendary":
        return "text-purple-400 border-purple-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <Clock className="w-3 h-3" />
      case "weekly":
        return <Star className="w-3 h-3" />
      case "epic":
        return <Trophy className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center">📜 Active Quests</h3>

      <div className="space-y-3">
        {state.quests
          .filter((quest) => quest.status === "active")
          .map((quest) => (
            <Card key={quest.id} className="bg-slate-800/50 border-purple-500/30">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white text-sm">{quest.title}</h4>
                    <Badge variant="outline" className={`text-xs ${getDifficultyColor(quest.difficulty)}`}>
                      {getTypeIcon(quest.type)}
                      <span className="ml-1">{quest.difficulty}</span>
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-400">{quest.description}</p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-purple-400">
                        {quest.progress}/{quest.maxProgress}
                      </span>
                    </div>
                    <Progress value={(quest.progress / quest.maxProgress) * 100} className="h-1" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      Rewards: {quest.rewards.map((r) => `+${r.amount} ${r.type}`).join(", ")}
                    </div>
                    {quest.progress >= quest.maxProgress && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => dispatch({ type: "COMPLETE_QUEST", questId: quest.id })}
                        className="text-xs border-green-400 text-green-400 hover:bg-green-400/20"
                      >
                        Claim
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {state.quests.filter((q) => q.status === "active").length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📜</div>
          <p className="text-gray-400 text-sm">No active quests</p>
        </div>
      )}
    </div>
  )
}
