"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const mockData = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 180 },
  { day: "Wed", xp: 150 },
  { day: "Thu", xp: 220 },
  { day: "Fri", xp: 190 },
  { day: "Sat", xp: 160 },
  { day: "Sun", xp: 240 },
]

export function StatsPanel() {
  const { state } = useGame()

  return (
    <Card className={`${state.retro ? "bg-blue-900 border-cyan-400 border-2" : "bg-slate-800/50 border-purple-500"}`}>
      <CardHeader>
        <CardTitle className={`${state.retro ? "text-yellow-300" : "text-white"}`}>
          {state.retro ? "📊 SALES ANALYTICS" : "📈 XP Analytics"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: state.retro ? "#fde047" : "#ffffff", fontSize: 12 }}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="xp"
                stroke={state.retro ? "#f97316" : "#8b5cf6"}
                strokeWidth={3}
                dot={{ fill: state.retro ? "#f97316" : "#8b5cf6", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
