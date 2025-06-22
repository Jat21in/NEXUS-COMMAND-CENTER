"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import { Cpu, HardDrive, Wifi, Users } from "lucide-react"
import { useEffect, useState } from "react"

export function SystemMonitor() {
  const { state } = useGame()
  const { systemStats } = state
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    const newAlerts = []
    if (systemStats.cpuUsage > 80) newAlerts.push("High CPU usage detected!")
    if (systemStats.memoryUsage > 85) newAlerts.push("Memory usage critical!")
    if (systemStats.errorRate > 0.05) newAlerts.push("Error rate elevated!")
    setAlerts(newAlerts)
  }, [systemStats])

  const getStatusColor = (value: number, threshold: number) => {
    if (value > threshold) return "text-red-400"
    if (value > threshold * 0.7) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center">
          ⚙️ System Vitals
          <Badge variant="outline" className="ml-2 border-green-400 text-green-400">
            Uptime: {systemStats.uptime}%
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* CPU Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">CPU Usage</span>
            </div>
            <span className={`text-sm font-mono ${getStatusColor(systemStats.cpuUsage, 80)}`}>
              {systemStats.cpuUsage.toFixed(1)}%
            </span>
          </div>
          <Progress value={systemStats.cpuUsage} className="h-2" />
        </div>

        {/* Memory Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HardDrive className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Memory</span>
            </div>
            <span className={`text-sm font-mono ${getStatusColor(systemStats.memoryUsage, 85)}`}>
              {systemStats.memoryUsage.toFixed(1)}%
            </span>
          </div>
          <Progress value={systemStats.memoryUsage} className="h-2" />
        </div>

        {/* Network Traffic */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Network</span>
            </div>
            <span className="text-sm font-mono text-green-400">{systemStats.networkTraffic.toFixed(1)} MB/s</span>
          </div>
          <Progress value={systemStats.networkTraffic} className="h-2" />
        </div>

        {/* Active Users */}
        <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Active Users</span>
          </div>
          <span className="text-lg font-bold text-yellow-400 font-mono">
            {systemStats.activeUsers.toLocaleString()}
          </span>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-red-400">⚠️ Alerts</h4>
            {alerts.map((alert, index) => (
              <div key={index} className="p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300">
                {alert}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
