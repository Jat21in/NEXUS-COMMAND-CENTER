"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { SystemMonitor } from "./system-monitor"
import { LiveActivityFeed } from "./live-activity-feed"
import { ThreatDetector } from "./threat-detector"
import { PerformanceDashboard } from "./performance-dashboard"

export function CommandCenter() {
  const { state } = useGame()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          🏰 Command Center
          <span className="ml-2 text-sm text-green-400 animate-pulse">● ONLINE</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <SystemMonitor />
        <ThreatDetector />
        <PerformanceDashboard />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LiveActivityFeed />
        <Card className="bg-slate-800/50 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">🎯 Mission Control</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
                <h4 className="font-bold text-white mb-2">Active Operations</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">System Optimization</span>
                    <span className="text-green-400">87% Complete</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Security Scan</span>
                    <span className="text-yellow-400">In Progress</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Data Backup</span>
                    <span className="text-blue-400">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
