"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { useState, useEffect } from "react"

interface ActivityItem {
  id: string
  type: "user" | "system" | "security" | "performance"
  message: string
  timestamp: Date
  severity: "info" | "warning" | "error" | "success"
}

export function LiveActivityFeed() {
  const { state } = useGame()
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    // Simulate real-time activity feed
    const generateActivity = () => {
      const activityTypes = [
        {
          type: "user" as const,
          messages: [
            "New user registration: alice@company.com",
            "User login: bob@company.com",
            "Password reset requested",
            "User profile updated",
          ],
          severity: "info" as const,
        },
        {
          type: "system" as const,
          messages: [
            "Database backup completed successfully",
            "System optimization in progress",
            "Cache cleared automatically",
            "Server restart scheduled",
          ],
          severity: "success" as const,
        },
        {
          type: "security" as const,
          messages: [
            "Failed login attempt detected",
            "Security scan completed",
            "Firewall rule updated",
            "SSL certificate renewed",
          ],
          severity: "warning" as const,
        },
        {
          type: "performance" as const,
          messages: [
            "Response time improved by 15%",
            "Memory usage optimized",
            "Database query performance enhanced",
            "CDN cache hit rate: 94%",
          ],
          severity: "success" as const,
        },
      ]

      const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)]

      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: randomType.type,
        message: randomMessage,
        timestamp: new Date(),
        severity: randomType.severity,
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]) // Keep only 10 items
    }

    // Generate initial activities
    for (let i = 0; i < 5; i++) {
      setTimeout(generateActivity, i * 1000)
    }

    // Continue generating activities
    const interval = setInterval(generateActivity, 8000)
    return () => clearInterval(interval)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "user":
        return "👤"
      case "system":
        return "⚙️"
      case "security":
        return "🛡️"
      case "performance":
        return "⚡"
      default:
        return "📊"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "border-green-400 text-green-400"
      case "warning":
        return "border-yellow-400 text-yellow-400"
      case "error":
        return "border-red-400 text-red-400"
      default:
        return "border-blue-400 text-blue-400"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/50">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center">
          📡 Live Activity Feed
          <Badge variant="outline" className="ml-2 border-green-400 text-green-400 animate-pulse">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg border-l-4 border-purple-500/50"
            >
              <div className="text-lg">{getTypeIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className={`text-xs ${getSeverityColor(activity.severity)}`}>
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-gray-400">{activity.timestamp.toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-gray-300">{activity.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
