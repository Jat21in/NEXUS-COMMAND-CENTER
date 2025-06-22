"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Badge } from "./ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

export function PerformanceDashboard() {
  const { state } = useGame()

  // Generate mock performance data
  const performanceData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    responseTime: Math.floor(Math.random() * 100) + 150,
    throughput: Math.floor(Math.random() * 500) + 1000,
    errorRate: Math.random() * 2,
  }))

  const metrics = [
    {
      name: "Response Time",
      value: "245ms",
      change: -12,
      color: "text-blue-400",
      icon: Activity,
    },
    {
      name: "Throughput",
      value: "1.8K/s",
      change: 23,
      color: "text-green-400",
      icon: TrendingUp,
    },
    {
      name: "Error Rate",
      value: "0.02%",
      change: -45,
      color: "text-purple-400",
      icon: TrendingDown,
    },
  ]

  return (
    <Card className="bg-slate-800/50 border-purple-500/50">
      <CardHeader>
        <CardTitle className="text-green-400 flex items-center">📈 Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-3">
            {metrics.map((metric) => (
              <div key={metric.name} className="p-3 bg-slate-700/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                    <span className="text-sm text-gray-300">{metric.name}</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${metric.color}`}>{metric.value}</div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        metric.change > 0 ? "border-green-400 text-green-400" : "border-red-400 text-red-400"
                      }`}
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini Chart */}
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData.slice(-12)}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" hide />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
