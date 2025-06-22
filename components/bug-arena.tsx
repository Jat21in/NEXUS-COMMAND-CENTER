"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Sword, Shield, Zap, Bug, AlertTriangle, Skull, Trophy, Target, Flame } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface Enemy {
  id: string
  name: string
  type: "bug" | "virus" | "exploit" | "breach"
  health: number
  maxHealth: number
  damage: number
  xpReward: number
  coinReward: number
  description: string
  weakness: string
  icon: string
}

export function BugArena() {
  const { state, dispatch } = useGame()
  const { toast } = useToast()
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [playerHealth, setPlayerHealth] = useState(100)

  const enemies: Enemy[] = [
    {
      id: "memory-leak",
      name: "Memory Leak Monster",
      type: "bug",
      health: 80,
      maxHealth: 80,
      damage: 15,
      xpReward: 100,
      coinReward: 50,
      description: "A sneaky bug that slowly consumes system memory",
      weakness: "Code optimization",
      icon: "🐛",
    },
    {
      id: "sql-injection",
      name: "SQL Injection Serpent",
      type: "exploit",
      health: 120,
      maxHealth: 120,
      damage: 25,
      xpReward: 150,
      coinReward: 75,
      description: "A dangerous exploit that attacks database vulnerabilities",
      weakness: "Input validation",
      icon: "🐍",
    },
    {
      id: "ddos-dragon",
      name: "DDoS Dragon",
      type: "breach",
      health: 200,
      maxHealth: 200,
      damage: 35,
      xpReward: 250,
      coinReward: 125,
      description: "A massive threat that overwhelms system resources",
      weakness: "Rate limiting",
      icon: "🐉",
    },
    {
      id: "malware-minion",
      name: "Malware Minion",
      type: "virus",
      health: 60,
      maxHealth: 60,
      damage: 10,
      xpReward: 75,
      coinReward: 35,
      description: "A small but persistent malicious program",
      weakness: "Antivirus scan",
      icon: "👾",
    },
  ]

  const [availableEnemies, setAvailableEnemies] = useState(enemies)

  const startBattle = (enemy: Enemy) => {
    setCurrentEnemy({ ...enemy })
    setPlayerHealth(state.player.health)
    setBattleLog([`⚔️ Battle started against ${enemy.name}!`])
  }

  const attack = (attackType: "basic" | "special" | "defend") => {
    if (!currentEnemy) return

    let playerDamage = 0
    let enemyDamage = currentEnemy.damage

    switch (attackType) {
      case "basic":
        playerDamage = 20 + Math.floor(Math.random() * 10)
        setBattleLog((prev) => [...prev, `⚔️ You attack for ${playerDamage} damage!`])
        break
      case "special":
        playerDamage = 35 + Math.floor(Math.random() * 15)
        setBattleLog((prev) => [...prev, `⚡ Special attack deals ${playerDamage} damage!`])
        break
      case "defend":
        playerDamage = 10
        enemyDamage = Math.floor(enemyDamage * 0.5)
        setBattleLog((prev) => [...prev, `🛡️ You defend and counter for ${playerDamage} damage!`])
        break
    }

    // Apply damage to enemy
    const newEnemyHealth = Math.max(0, currentEnemy.health - playerDamage)
    setCurrentEnemy((prev) => (prev ? { ...prev, health: newEnemyHealth } : null))

    if (newEnemyHealth <= 0) {
      // Victory!
      setBattleLog((prev) => [...prev, `🎉 ${currentEnemy.name} defeated!`])
      dispatch({
        type: "GAIN_RESOURCES",
        resources: {
          xp: currentEnemy.xpReward,
          coins: currentEnemy.coinReward,
        },
      })

      toast({
        title: "🏆 Victory!",
        description: `${currentEnemy.name} defeated! +${currentEnemy.xpReward} XP, +${currentEnemy.coinReward} coins!`,
        duration: 4000,
      })

      // Remove defeated enemy from available list
      setAvailableEnemies((prev) => prev.filter((e) => e.id !== currentEnemy.id))
      setCurrentEnemy(null)
      return
    }

    // Enemy attacks back
    const newPlayerHealth = Math.max(0, playerHealth - enemyDamage)
    setPlayerHealth(newPlayerHealth)
    setBattleLog((prev) => [...prev, `💥 ${currentEnemy.name} attacks for ${enemyDamage} damage!`])

    if (newPlayerHealth <= 0) {
      // Defeat
      setBattleLog((prev) => [...prev, `💀 You have been defeated!`])
      toast({
        title: "💀 Defeat!",
        description: "You have been defeated! Try again with better strategy.",
        duration: 3000,
      })
      setCurrentEnemy(null)
      setPlayerHealth(100) // Reset health
    }
  }

  const getEnemyTypeColor = (type: string) => {
    switch (type) {
      case "bug":
        return "text-green-400 border-green-400"
      case "virus":
        return "text-red-400 border-red-400"
      case "exploit":
        return "text-yellow-400 border-yellow-400"
      case "breach":
        return "text-purple-400 border-purple-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getEnemyTypeIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <Bug className="w-4 h-4" />
      case "virus":
        return <Skull className="w-4 h-4" />
      case "exploit":
        return <AlertTriangle className="w-4 h-4" />
      case "breach":
        return <Flame className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚔️ Bug Arena
        </h2>
        <Badge variant="outline" className="border-red-400 text-red-400">
          {availableEnemies.length} Threats Detected
        </Badge>
      </div>

      <Tabs defaultValue="arena" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="arena">Battle Arena</TabsTrigger>
          <TabsTrigger value="enemies">Threat Database</TabsTrigger>
          <TabsTrigger value="rewards">Victory Hall</TabsTrigger>
        </TabsList>

        <TabsContent value="arena" className="space-y-6">
          {currentEnemy ? (
            // Battle Interface
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Battle Area */}
              <Card className="bg-slate-800/50 border-red-500/50">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center justify-between">
                    <span>⚔️ Active Battle</span>
                    <Badge variant="outline" className={getEnemyTypeColor(currentEnemy.type)}>
                      {getEnemyTypeIcon(currentEnemy.type)}
                      {currentEnemy.type}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Enemy Status */}
                  <div className="text-center">
                    <div className="text-6xl mb-2">{currentEnemy.icon}</div>
                    <h3 className="text-xl font-bold text-white">{currentEnemy.name}</h3>
                    <p className="text-gray-400 text-sm">{currentEnemy.description}</p>
                  </div>

                  {/* Health Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-400">Enemy Health</span>
                        <span className="text-red-400">
                          {currentEnemy.health}/{currentEnemy.maxHealth}
                        </span>
                      </div>
                      <Progress
                        value={(currentEnemy.health / currentEnemy.maxHealth) * 100}
                        className="h-3 bg-slate-700"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-400">Your Health</span>
                        <span className="text-green-400">{playerHealth}/100</span>
                      </div>
                      <Progress value={playerHealth} className="h-3 bg-slate-700" />
                    </div>
                  </div>

                  {/* Battle Actions */}
                  <div className="grid grid-cols-3 gap-3">
                    <Button onClick={() => attack("basic")} className="bg-red-600 hover:bg-red-700">
                      <Sword className="w-4 h-4 mr-1" />
                      Attack
                    </Button>
                    <Button onClick={() => attack("special")} className="bg-purple-600 hover:bg-purple-700">
                      <Zap className="w-4 h-4 mr-1" />
                      Special
                    </Button>
                    <Button
                      onClick={() => attack("defend")}
                      variant="outline"
                      className="border-blue-400 text-blue-400"
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Defend
                    </Button>
                  </div>

                  {/* Enemy Info */}
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Weakness:</span>
                        <span className="text-yellow-400">{currentEnemy.weakness}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Damage:</span>
                        <span className="text-red-400">{currentEnemy.damage} per turn</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Battle Log */}
              <Card className="bg-slate-800/50 border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-purple-400">📜 Battle Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 overflow-y-auto space-y-2 bg-slate-900/50 p-4 rounded-lg">
                    {battleLog.map((log, index) => (
                      <div key={index} className="text-sm text-gray-300 font-mono">
                        {log}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Enemy Selection
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableEnemies.map((enemy) => (
                <Card
                  key={enemy.id}
                  className="bg-slate-800/50 border-purple-500/50 hover:border-red-500/50 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-white">{enemy.name}</span>
                      <Badge variant="outline" className={getEnemyTypeColor(enemy.type)}>
                        {getEnemyTypeIcon(enemy.type)}
                        {enemy.type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{enemy.icon}</div>
                      <p className="text-gray-400 text-sm">{enemy.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Health:</span>
                        <span className="text-red-400">{enemy.health} HP</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Damage:</span>
                        <span className="text-orange-400">{enemy.damage} per turn</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Weakness:</span>
                        <span className="text-yellow-400">{enemy.weakness}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-400 mb-1">Victory Rewards</div>
                        <div className="flex justify-center space-x-4">
                          <span className="text-purple-400">+{enemy.xpReward} XP</span>
                          <span className="text-yellow-400">+{enemy.coinReward} Coins</span>
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => startBattle(enemy)} className="w-full bg-red-600 hover:bg-red-700">
                      <Sword className="w-4 h-4 mr-2" />
                      Engage in Battle
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {availableEnemies.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">All Threats Eliminated!</h3>
                  <p className="text-gray-400">
                    You have successfully defeated all system threats. New enemies will spawn soon.
                  </p>
                  <Button
                    onClick={() => setAvailableEnemies(enemies)}
                    className="mt-4 bg-purple-600 hover:bg-purple-700"
                  >
                    Spawn New Threats
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="enemies" className="space-y-6">
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-cyan-400">🗃️ Threat Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enemies.map((enemy) => (
                  <div key={enemy.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{enemy.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-white">{enemy.name}</h4>
                          <Badge variant="outline" className={getEnemyTypeColor(enemy.type)}>
                            {enemy.type}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{enemy.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Health:</span>
                            <span className="text-red-400">{enemy.health}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Damage:</span>
                            <span className="text-orange-400">{enemy.damage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">XP Reward:</span>
                            <span className="text-purple-400">{enemy.xpReward}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Coins:</span>
                            <span className="text-yellow-400">{enemy.coinReward}</span>
                          </div>
                        </div>
                        <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs">
                          <span className="text-gray-400">Weakness: </span>
                          <span className="text-yellow-400">{enemy.weakness}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-yellow-400">🏆 Victory Hall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Battle Statistics</h3>
                <p className="text-gray-400 mb-6">Track your victories and earned rewards</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">0</div>
                    <div className="text-sm text-gray-400">Battles Won</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">0</div>
                    <div className="text-sm text-gray-400">Total XP Earned</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">0</div>
                    <div className="text-sm text-gray-400">Coins Earned</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
