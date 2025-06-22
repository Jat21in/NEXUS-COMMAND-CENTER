"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Shield, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface Threat {
  id: string
  type: "malware" | "intrusion" | "ddos" | "vulnerability"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  status: "detected" | "investigating" | "resolved"
  timestamp: Date
}

export function ThreatDetector() {
  const { state } = useGame()
  const [threats, setThreats] = useState<Threat[]>([])
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "complete">("idle")

  useEffect(() => {
    // Simulate threat detection
    const generateThreat = () => {
      const threatTypes = [
        {
          type: "malware" as const,
          descriptions: ["Suspicious file detected in uploads", "Malicious script blocked", "Virus signature found"],
        },
        {
          type: "intrusion" as const,
          descriptions: ["Unauthorized access attempt", "Brute force attack detected", "Suspicious IP activity"],
        },
        {
          type: "ddos" as const,
          descriptions: ["High traffic volume detected", "Request rate anomaly", "Potential DDoS attack"],
        },
        {
          type: "vulnerability" as const,
          descriptions: ["Outdated dependency found", "Security patch required", "Configuration weakness"],
        },
      ]

      const randomType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
      const randomDesc = randomType.descriptions[Math.floor(Math.random() * randomType.descriptions.length)]
      const severities: Threat["severity"][] = ["low", "medium", "high", "critical"]

      const newThreat: Threat = {
        id: Date.now().toString(),
        type: randomType.type,
        severity: severities[Math.floor(Math.random() * severities.length)],
        description: randomDesc,
        status: "detected",
        timestamp: new Date(),
      }

      setThreats((prev) => [newThreat, ...prev.slice(0, 4)]) // Keep only 5 threats
    }

    // Generate initial threats
    setTimeout(generateThreat, 2000)

    // Continue generating threats occasionally
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance every 15 seconds
        generateThreat()
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleScan = () => {
    setScanStatus("scanning")
    setTimeout(() => {
      setScanStatus("complete")
      setTimeout(() => setScanStatus("idle"), 3000)
    }, 3000)
  }

  const handleResolve = (threatId: string) => {
    setThreats((prev) => prev.map((t) => (t.id === threatId ? { ...t, status: "resolved" } : t)))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-red-500 text-red-400 bg-red-900/20"
      case "high":
        return "border-orange-500 text-orange-400 bg-orange-900/20"
      case "medium":
        return "border-yellow-500 text-yellow-400 bg-yellow-900/20"
      case "low":
        return "border-green-500 text-green-400 bg-green-900/20"
      default:
        return "border-gray-500 text-gray-400 bg-gray-900/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "malware":
        return "🦠"
      case "intrusion":
        return "🚪"
      case "ddos":
        return "🌊"
      case "vulnerability":
        return "🔓"
      default:
        return "⚠️"
    }
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/50">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center justify-between">
          <span className="flex items-center">🛡️ Threat Detector</span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleScan}
            disabled={scanStatus === "scanning"}
            className="border-red-400 text-red-400 hover:bg-red-400/20"
          >
            {scanStatus === "scanning" ? "Scanning..." : "Scan Now"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scanStatus === "scanning" && (
            <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg text-center">
              <div className="animate-spin text-2xl mb-2">🔍</div>
              <p className="text-blue-400 text-sm">Deep scanning in progress...</p>
            </div>
          )}

          {scanStatus === "complete" && (
            <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg text-center">
              <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 text-sm">Scan completed successfully</p>
            </div>
          )}

          {threats.length === 0 && scanStatus === "idle" && (
            <div className="text-center py-6">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-medium">All systems secure</p>
              <p className="text-gray-400 text-sm">No threats detected</p>
            </div>
          )}

          {threats.map((threat) => (
            <div key={threat.id} className={`p-3 rounded-lg border ${getSeverityColor(threat.severity)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getTypeIcon(threat.type)}</span>
                  <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                    {threat.severity.toUpperCase()}
                  </Badge>
                </div>
                <span className="text-xs text-gray-400">{threat.timestamp.toLocaleTimeString()}</span>
              </div>

              <p className="text-sm text-gray-300 mb-2">{threat.description}</p>

              <div className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className={
                    threat.status === "resolved"
                      ? "border-green-400 text-green-400"
                      : "border-yellow-400 text-yellow-400"
                  }
                >
                  {threat.status}
                </Badge>

                {threat.status !== "resolved" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolve(threat.id)}
                    className="text-xs border-green-400 text-green-400 hover:bg-green-400/20"
                  >
                    Resolve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
