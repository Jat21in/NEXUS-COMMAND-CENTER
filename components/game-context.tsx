"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface GameState {
  player: Player
  npcs: NPC[]
  quests: Quest[]
  battles: Battle[]
  resources: Resources
  guild: Guild
  worldMap: WorldLocation[]
  notifications: GameNotification[]
  systemStats: SystemStats
  users: User[]
  analytics: AnalyticsData
  theme: string
  retro: boolean
  activeLocation: string
  tutorialStep: number
  achievements: Achievement[]
  tasks?: Task[]
}

interface Player {
  id: string
  name: string
  level: number
  xp: number
  health: number
  mana: number
  energy: number
  class: "admin" | "developer" | "analyst" | "manager"
  stats: {
    strength: number
    intelligence: number
    agility: number
    leadership: number
  }
  inventory: Item[]
  avatar: Avatar
  streak: number
  lastLogin: string
}

interface NPC {
  id: string
  name: string
  type: "guide" | "merchant" | "questgiver" | "companion"
  location: string
  dialogue: string[]
  currentDialogue: number
  mood: "happy" | "neutral" | "excited" | "concerned"
  avatar: string
  isActive: boolean
}

interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "epic" | "tutorial"
  difficulty: "easy" | "medium" | "hard" | "legendary"
  requirements: QuestRequirement[]
  rewards: QuestReward[]
  progress: number
  maxProgress: number
  status: "available" | "active" | "completed" | "failed"
  timeLimit?: number
  npcGiver?: string
}

interface Battle {
  id: string
  type: "bug" | "security" | "performance" | "feature"
  enemy: Enemy
  playerActions: BattleAction[]
  status: "active" | "won" | "lost"
  rewards: QuestReward[]
}

interface Resources {
  coins: number
  gems: number
  energy: number
  mana: number
  reputation: number
}

interface Guild {
  name: string
  level: number
  members: number
  perks: string[]
}

interface WorldLocation {
  id: string
  name: string
  type: "dashboard" | "analytics" | "users" | "system" | "battle" | "shop"
  unlocked: boolean
  description: string
  npcs: string[]
  quests: string[]
  icon: string
}

interface SystemStats {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkTraffic: number
  activeUsers: number
  errorRate: number
  uptime: number
}

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "banned"
  lastSeen: string
  xp: number
  level: number
}

interface AnalyticsData {
  dailyUsers: { date: string; users: number }[]
  revenue: { date: string; amount: number }[]
  performance: { metric: string; value: number; change: number }[]
}

type GameAction =
  | { type: "COMPLETE_QUEST"; questId: string }
  | { type: "START_BATTLE"; battleType: Battle["type"] }
  | { type: "BATTLE_ACTION"; action: BattleAction }
  | { type: "TALK_TO_NPC"; npcId: string }
  | { type: "CHANGE_LOCATION"; locationId: string }
  | { type: "GAIN_RESOURCES"; resources: Partial<Resources> }
  | { type: "UPDATE_SYSTEM_STATS" }
  | { type: "LEVEL_UP_STAT"; stat: keyof Player["stats"] }
  | { type: "ADVANCE_TUTORIAL" }
  | { type: "TOGGLE_RETRO" }
  | { type: "DISMISS_NPC"; npcId: string }
  | { type: "COMPLETE_TASK"; taskId: string }
  | { type: "ADD_TASK"; task: Task }
  | { type: "MOVE_TASK"; taskId: string; status: Task["status"] }
  | { type: "UPDATE_USER"; userId: string; updates: Partial<User> }
  | { type: "ADD_EVENT"; event: CalendarEvent }

const initialState: GameState = {
  player: {
    id: "player1",
    name: "Admin Warrior",
    level: 5,
    xp: 1847,
    health: 100,
    mana: 80,
    energy: 90,
    class: "admin",
    stats: {
      strength: 15,
      intelligence: 22,
      agility: 18,
      leadership: 20,
    },
    inventory: [],
    avatar: {
      base: "cyber-knight",
      helmet: "neural-crown",
      armor: "data-plate",
      weapon: "code-blade",
      aura: "electric-blue",
    },
    streak: 7,
    lastLogin: new Date().toDateString(),
  },
  npcs: [
    {
      id: "aria",
      name: "Aria the Data Sage",
      type: "guide",
      location: "dashboard",
      dialogue: [
        "Welcome back, Admin Warrior! Your kingdom needs you.",
        "I sense disturbances in the data streams...",
        "The system metrics show unusual patterns today.",
        "Your leadership grows stronger with each quest completed!",
      ],
      currentDialogue: 0,
      mood: "excited",
      avatar: "🧙‍♀️",
      isActive: true,
    },
    {
      id: "zyx",
      name: "Zyx the Code Merchant",
      type: "merchant",
      location: "shop",
      dialogue: [
        "Greetings! I have rare upgrades for your arsenal.",
        "These neural enhancements will boost your admin powers!",
        "Special offer: Quantum processors for faster data crunching!",
      ],
      currentDialogue: 0,
      mood: "happy",
      avatar: "🤖",
      isActive: false,
    },
  ],
  quests: [
    {
      id: "daily-monitoring",
      title: "System Surveillance",
      description: "Monitor all system metrics and defeat any anomalies",
      type: "daily",
      difficulty: "medium",
      requirements: [{ type: "monitor_systems", count: 1 }],
      rewards: [
        { type: "xp", amount: 150 },
        { type: "coins", amount: 50 },
      ],
      progress: 0,
      maxProgress: 1,
      status: "active",
      npcGiver: "aria",
    },
    {
      id: "user-management",
      title: "Guardian of Users",
      description: "Review and manage user accounts to maintain order",
      type: "weekly",
      difficulty: "hard",
      requirements: [{ type: "manage_users", count: 10 }],
      rewards: [
        { type: "xp", amount: 300 },
        { type: "gems", amount: 25 },
      ],
      progress: 3,
      maxProgress: 10,
      status: "active",
    },
  ],
  battles: [],
  resources: {
    coins: 1250,
    gems: 45,
    energy: 90,
    mana: 80,
    reputation: 750,
  },
  guild: {
    name: "Digital Guardians",
    level: 3,
    members: 12,
    perks: ["Faster XP gain", "Resource bonuses", "Exclusive quests"],
  },
  worldMap: [
    {
      id: "dashboard",
      name: "Command Center",
      type: "dashboard",
      unlocked: true,
      description: "Your primary control hub",
      npcs: ["aria"],
      quests: ["daily-monitoring"],
      icon: "🏰",
    },
    {
      id: "analytics",
      name: "Data Realm",
      type: "analytics",
      unlocked: true,
      description: "Realm of charts and insights",
      npcs: [],
      quests: [],
      icon: "📊",
    },
    {
      id: "users",
      name: "User Kingdom",
      type: "users",
      unlocked: true,
      description: "Manage your subjects",
      npcs: [],
      quests: ["user-management"],
      icon: "👥",
    },
    {
      id: "system",
      name: "Tech Fortress",
      type: "system",
      unlocked: true,
      description: "Monitor system vitals",
      npcs: [],
      quests: [],
      icon: "⚙️",
    },
    {
      id: "battle",
      name: "Bug Arena",
      type: "battle",
      unlocked: true,
      description: "Fight system threats",
      npcs: [],
      quests: [],
      icon: "⚔️",
    },
    {
      id: "shop",
      name: "Upgrade Bazaar",
      type: "shop",
      unlocked: true,
      description: "Enhance your abilities",
      npcs: ["zyx"],
      quests: [],
      icon: "🛒",
    },
  ],
  notifications: [],
  systemStats: {
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 23,
    networkTraffic: 89,
    activeUsers: 1247,
    errorRate: 0.02,
    uptime: 99.97,
  },
  users: [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "Developer",
      status: "active",
      lastSeen: "2 min ago",
      xp: 890,
      level: 3,
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@company.com",
      role: "Designer",
      status: "active",
      lastSeen: "1 hour ago",
      xp: 1200,
      level: 4,
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@company.com",
      role: "Manager",
      status: "inactive",
      lastSeen: "2 days ago",
      xp: 2100,
      level: 6,
    },
  ],
  analytics: {
    dailyUsers: [
      { date: "Mon", users: 1200 },
      { date: "Tue", users: 1350 },
      { date: "Wed", users: 1180 },
      { date: "Thu", users: 1420 },
      { date: "Fri", users: 1380 },
      { date: "Sat", users: 980 },
      { date: "Sun", users: 1100 },
    ],
    revenue: [
      { date: "Mon", amount: 12500 },
      { date: "Tue", amount: 13200 },
      { date: "Wed", amount: 11800 },
      { date: "Thu", amount: 14500 },
      { date: "Fri", amount: 13900 },
      { date: "Sat", amount: 10200 },
      { date: "Sun", amount: 11600 },
    ],
    performance: [
      { metric: "Response Time", value: 245, change: -12 },
      { metric: "Throughput", value: 1847, change: 23 },
      { metric: "Error Rate", value: 0.02, change: -45 },
    ],
  },
  theme: "cyber",
  retro: false,
  activeLocation: "dashboard",
  tutorialStep: 0,
  achievements: [],
  tasks: [
    {
      id: "1",
      title: "System Health Check",
      description: "Monitor all system components",
      status: "todo",
      priority: "high",
      assignee: "Admin Warrior",
      dueDate: "2024-01-20",
      xpReward: 50,
    },
    {
      id: "2",
      title: "User Data Analysis",
      description: "Analyze user behavior patterns",
      status: "progress",
      priority: "medium",
      assignee: "Admin Warrior",
      dueDate: "2024-01-22",
      xpReward: 75,
    },
    {
      id: "3",
      title: "Security Audit",
      description: "Complete security vulnerability assessment",
      status: "todo",
      priority: "high",
      assignee: "Admin Warrior",
      dueDate: "2024-01-25",
      xpReward: 100,
    },
  ] as Task[],
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "TALK_TO_NPC": {
      const npc = state.npcs.find((n) => n.id === action.npcId)
      if (!npc) return state

      return {
        ...state,
        npcs: state.npcs.map((n) =>
          n.id === action.npcId
            ? { ...n, currentDialogue: (n.currentDialogue + 1) % n.dialogue.length, isActive: true }
            : n,
        ),
      }
    }

    case "CHANGE_LOCATION": {
      return {
        ...state,
        activeLocation: action.locationId,
        npcs: state.npcs.map((n) => ({
          ...n,
          isActive: n.location === action.locationId,
        })),
      }
    }

    case "UPDATE_SYSTEM_STATS": {
      return {
        ...state,
        systemStats: {
          ...state.systemStats,
          cpuUsage: Math.max(0, Math.min(100, state.systemStats.cpuUsage + (Math.random() - 0.5) * 10)),
          memoryUsage: Math.max(0, Math.min(100, state.systemStats.memoryUsage + (Math.random() - 0.5) * 8)),
          networkTraffic: Math.max(0, Math.min(100, state.systemStats.networkTraffic + (Math.random() - 0.5) * 15)),
          activeUsers: Math.max(0, state.systemStats.activeUsers + Math.floor((Math.random() - 0.5) * 50)),
        },
      }
    }

    case "GAIN_RESOURCES": {
      return {
        ...state,
        resources: {
          ...state.resources,
          ...Object.fromEntries(
            Object.entries(action.resources).map(([key, value]) => [
              key,
              (state.resources[key as keyof Resources] || 0) + (value || 0),
            ]),
          ),
        },
      }
    }

    case "LEVEL_UP_STAT": {
      if (state.resources.coins < 100) return state

      return {
        ...state,
        player: {
          ...state.player,
          stats: {
            ...state.player.stats,
            [action.stat]: state.player.stats[action.stat] + 1,
          },
        },
        resources: {
          ...state.resources,
          coins: state.resources.coins - 100,
        },
      }
    }

    case "TOGGLE_RETRO": {
      return {
        ...state,
        retro: !state.retro,
      }
    }

    case "DISMISS_NPC": {
      return {
        ...state,
        npcs: state.npcs.map((n) => (n.id === action.npcId ? { ...n, isActive: false } : n)),
      }
    }

    case "COMPLETE_TASK": {
      const task = state.tasks?.find((t) => t.id === action.taskId)
      if (!task) return state

      return {
        ...state,
        player: {
          ...state.player,
          xp: state.player.xp + (task.xpReward || 20),
        },
        tasks: state.tasks?.map((t) => (t.id === action.taskId ? { ...t, status: "done" as const } : t)) || [],
      }
    }

    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...(state.tasks || []), action.task],
      }
    }

    case "MOVE_TASK": {
      return {
        ...state,
        tasks: state.tasks?.map((t) => (t.id === action.taskId ? { ...t, status: action.status } : t)) || [],
      }
    }

    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const { toast } = useToast()

  // Real-time system updates
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "UPDATE_SYSTEM_STATS" })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Random events and notifications
  useEffect(() => {
    const eventInterval = setInterval(() => {
      const events = [
        "A wild bug appeared in the system!",
        "New user registered - XP bonus available!",
        "System performance optimized automatically!",
        "Guild member completed a legendary quest!",
      ]

      const randomEvent = events[Math.floor(Math.random() * events.length)]
      toast({
        title: "🎮 Game Event",
        description: randomEvent,
        duration: 4000,
      })
    }, 30000)

    return () => clearInterval(eventInterval)
  }, [toast])

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}

// Additional interfaces
interface Avatar {
  base: string
  helmet: string
  armor: string
  weapon: string
  aura: string
}

interface Item {
  id: string
  name: string
  type: string
  rarity: "common" | "rare" | "epic" | "legendary"
  stats: Record<string, number>
}

interface QuestRequirement {
  type: string
  count: number
}

interface QuestReward {
  type: "xp" | "coins" | "gems" | "item"
  amount?: number
  itemId?: string
}

interface Enemy {
  name: string
  health: number
  maxHealth: number
  type: string
  abilities: string[]
}

interface BattleAction {
  type: "attack" | "defend" | "skill"
  name: string
  damage?: number
  effect?: string
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  xpReward: number
}

interface GameNotification {
  id: string
  type: "quest" | "battle" | "system" | "achievement"
  message: string
  timestamp: number
}

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "progress" | "done"
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  xpReward: number
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: "meeting" | "deadline" | "maintenance" | "event"
  xpReward: number
}
