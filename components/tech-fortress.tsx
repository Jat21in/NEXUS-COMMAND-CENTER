"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import {
  Server,
  Database,
  Wifi,
  Shield,
  Zap,
  HardDrive,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCw,
  Power,
  Monitor,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export function TechFortress() {
  const { state, dispatch } = useGame()
  const { toast } = useToast()
  const [servers, setServers] = useState([
    {
      id: "web-01",
      name: "Web Server Alpha",
      status: "online",
      cpu: 45,
      memory: 67,
      disk: 23,
      uptime: 99.97,
      location: "US-East",
      type: "web",
    },
    {
      id: "db-01",
      name: "Database Primary",
      status: "online",
      cpu: 32,
      memory: 78,
      disk: 45,
      uptime: 99.99,
      location: "US-West",
      type: "database",
    },
    {
      id: "api-01",
      name: "API Gateway",
      status: "warning",
      cpu: 89,
      memory: 92,
      disk: 34,
      uptime: 98.5,
      location: "EU-Central",
      type: "api",
    },
    {
      id: "cache-01",
      name: "Redis Cache",
      status: "offline",
      cpu: 0,
      memory: 0,
      disk: 67,
      uptime: 0,
      location: "Asia-Pacific",
      type: "cache",
    },
  ])

  const [services, setServices] = useState([
    { name: "Authentication Service", status: "healthy", responseTime: 45 },
    { name: "Payment Gateway", status: "healthy", responseTime: 120 },
    { name: "Email Service", status: "degraded", responseTime: 890 },
    { name: "File Storage", status: "healthy", responseTime: 67 },
    { name: "Analytics Engine", status: "offline", responseTime: 0 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((server) => ({
          ...server,
          cpu: Math.max(0, Math.min(100, server.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(0, Math.min(100, server.memory + (Math.random() - 0.5) * 8)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleServerAction = (serverId: string, action: string) => {
    const server = servers.find((s) => s.id === serverId)
    if (!server) return

    switch (action) {
      case "restart":
        setServers((prev) => prev.map((s) => (s.id === serverId ? { ...s, status: "online", cpu: 20, memory: 30 } : s)))
        dispatch({ type: "GAIN_RESOURCES", resources: { xp: 75, coins: 35 } })
        toast({
          title: "🔄 Server Restarted!",
          description: `${server.name} has been restarted successfully! +75 XP earned!`,
          duration: 3000,
        })
        break
      case "optimize":
        setServers((prev) =>
          prev.map((s) =>
            s.id === serverId ? { ...s, cpu: Math.max(10, s.cpu - 20), memory: Math.max(10, s.memory - 15) } : s,
          ),
        )
        dispatch({ type: "GAIN_RESOURCES", resources: { xp: 50, coins: 25 } })
        toast({
          title: "⚡ Server Optimized!",
          description: `${server.name} performance improved! +50 XP earned!`,
          duration: 3000,
        })
        break
      case "shutdown":
        setServers((prev) => prev.map((s) => (s.id === serverId ? { ...s, status: "offline", cpu: 0, memory: 0 } : s)))
        dispatch({ type: "GAIN_RESOURCES", resources: { xp: 25, coins: 10 } })
        toast({
          title: "🔌 Server Shutdown!",
          description: `${server.name} has been safely shutdown. +25 XP earned!`,
          duration: 3000,
        })
        break
    }
  }

  const getServerStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-400 border-green-400"
      case "warning":
        return "text-yellow-400 border-yellow-400"
      case "offline":
        return "text-red-400 border-red-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getServerIcon = (type: string) => {
    switch (type) {
      case "web":
        return <Monitor className="w-6 h-6" />
      case "database":
        return <Database className="w-6 h-6" />
      case "api":
        return <Wifi className="w-6 h-6" />
      case "cache":
        return <Zap className="w-6 h-6" />
      default:
        return <Server className="w-6 h-6" />
    }
  }

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-400"
      case "degraded":
        return "text-yellow-400"
      case "offline":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const overallHealth = (servers.filter((s) => s.status === "online").length / servers.length) * 100

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚙️ Tech Fortress
        </h2>
        <Badge
          variant="outline"
          className={`${
            overallHealth > 80
              ? "border-green-400 text-green-400"
              : overallHealth > 60
                ? "border-yellow-400 text-yellow-400"
                : "border-red-400 text-red-400"
          }`}
        >
          System Health: {overallHealth.toFixed(0)}%
        </Badge>
      </div>

      <Tabs defaultValue="servers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="servers">Server Fleet</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="servers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {servers.map((server) => (
              <Card key={server.id} className="bg-slate-800/50 border-purple-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-purple-400">{getServerIcon(server.type)}</div>
                      <div>
                        <h3 className="text-white">{server.name}</h3>
                        <p className="text-sm text-gray-400">{server.location}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getServerStatusColor(server.status)}>
                      {server.status === "online" && <CheckCircle className="w-3 h-3 mr-1" />}
                      {server.status === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {server.status === "offline" && <Power className="w-3 h-3 mr-1" />}
                      {server.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Resource Usage */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300 flex items-center">
                          <Cpu className="w-3 h-3 mr-1" />
                          CPU Usage
                        </span>
                        <span className={server.cpu > 80 ? "text-red-400" : "text-green-400"}>
                          {server.cpu.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={server.cpu} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300 flex items-center">
                          <Activity className="w-3 h-3 mr-1" />
                          Memory
                        </span>
                        <span className={server.memory > 85 ? "text-red-400" : "text-green-400"}>
                          {server.memory.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={server.memory} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300 flex items-center">
                          <HardDrive className="w-3 h-3 mr-1" />
                          Disk Usage
                        </span>
                        <span className="text-green-400">{server.disk}%</span>
                      </div>
                      <Progress value={server.disk} className="h-2" />
                    </div>
                  </div>

                  {/* Uptime */}
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Uptime</span>
                      <span className="text-green-400 font-mono">{server.uptime}%</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {server.status === "online" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleServerAction(server.id, "optimize")}
                          className="border-green-400 text-green-400 hover:bg-green-400/20"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Optimize
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleServerAction(server.id, "restart")}
                          className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Restart
                        </Button>
                      </>
                    )}
                    {server.status === "offline" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleServerAction(server.id, "restart")}
                        className="border-green-400 text-green-400 hover:bg-green-400/20"
                      >
                        <Power className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleServerAction(server.id, "shutdown")}
                      className="border-red-400 text-red-400 hover:bg-red-400/20"
                    >
                      <Power className="w-3 h-3 mr-1" />
                      Shutdown
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-cyan-400">Service Status Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          service.status === "healthy"
                            ? "bg-green-400"
                            : service.status === "degraded"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      />
                      <span className="text-white font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className={getServiceStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                      <span className="text-gray-400 font-mono">
                        {service.responseTime > 0 ? `${service.responseTime}ms` : "N/A"}
                      </span>
                      <Button size="sm" variant="outline" className="border-purple-400 text-purple-400">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-green-400">System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm">High CPU on API Gateway</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm">Email service degraded</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">All databases healthy</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-blue-400">Network Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Bandwidth Usage</span>
                    <span className="text-blue-400">847 MB/s</span>
                  </div>
                  <Progress value={65} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Latency</span>
                    <span className="text-green-400">23ms</span>
                  </div>
                  <Progress value={15} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Packet Loss</span>
                    <span className="text-green-400">0.01%</span>
                  </div>
                  <Progress value={1} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-purple-400">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      dispatch({ type: "GAIN_RESOURCES", resources: { xp: 100, coins: 50 } })
                      toast({
                        title: "🔧 System Maintenance!",
                        description: "Full system maintenance completed! +100 XP earned!",
                        duration: 3000,
                      })
                    }}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Run Maintenance
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-400 text-green-400"
                    onClick={() => {
                      dispatch({ type: "GAIN_RESOURCES", resources: { xp: 75, coins: 35 } })
                      toast({
                        title: "🚀 Performance Boost!",
                        description: "System performance optimized! +75 XP earned!",
                        duration: 3000,
                      })
                    }}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Optimize All
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-blue-400 text-blue-400"
                    onClick={() => {
                      dispatch({ type: "GAIN_RESOURCES", resources: { xp: 50, coins: 25 } })
                      toast({
                        title: "📊 Health Check!",
                        description: "System health check completed! +50 XP earned!",
                        duration: 3000,
                      })
                    }}
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Health Check
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-red-400">🛡️ Security Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Advanced Security Module</h3>
                <p className="text-gray-400 mb-4">
                  Comprehensive security monitoring and threat detection coming soon!
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Shield className="w-4 h-4 mr-2" />
                  Enable Security Suite
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
