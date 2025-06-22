"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Palette, Check, Lock } from "lucide-react"
import { useState } from "react"

const themes = [
  {
    id: "cyber",
    name: "Cyber Nexus",
    description: "Electric blue and purple cyberpunk theme",
    cost: 0,
    unlocked: true,
    preview: "bg-gradient-to-br from-blue-900 to-purple-900",
    colors: {
      primary: "#8b5cf6",
      secondary: "#06b6d4",
      accent: "#3b82f6",
    },
  },
  {
    id: "neon",
    name: "Neon Dreams",
    description: "Vibrant pink and cyan neon theme",
    cost: 500,
    unlocked: false,
    preview: "bg-gradient-to-br from-pink-900 to-cyan-900",
    colors: {
      primary: "#ec4899",
      secondary: "#06b6d4",
      accent: "#f59e0b",
    },
  },
  {
    id: "matrix",
    name: "Matrix Code",
    description: "Green digital rain theme",
    cost: 750,
    unlocked: false,
    preview: "bg-gradient-to-br from-green-900 to-black",
    colors: {
      primary: "#10b981",
      secondary: "#22c55e",
      accent: "#84cc16",
    },
  },
  {
    id: "fire",
    name: "Phoenix Fire",
    description: "Fiery red and orange theme",
    cost: 1000,
    unlocked: false,
    preview: "bg-gradient-to-br from-red-900 to-orange-900",
    colors: {
      primary: "#ef4444",
      secondary: "#f97316",
      accent: "#fbbf24",
    },
  },
  {
    id: "ice",
    name: "Frost Crystal",
    description: "Cool blue and white ice theme",
    cost: 1250,
    unlocked: false,
    preview: "bg-gradient-to-br from-blue-900 to-slate-900",
    colors: {
      primary: "#3b82f6",
      secondary: "#0ea5e9",
      accent: "#06b6d4",
    },
  },
  {
    id: "void",
    name: "Void Walker",
    description: "Dark purple and black void theme",
    cost: 1500,
    unlocked: false,
    preview: "bg-gradient-to-br from-purple-900 to-black",
    colors: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      accent: "#c084fc",
    },
  },
]

export function ThemeCustomizer() {
  const { state, dispatch } = useGame()
  const [selectedTheme, setSelectedTheme] = useState(state.theme)

  const handlePurchaseTheme = (theme: (typeof themes)[0]) => {
    if (state.resources.coins >= theme.cost) {
      dispatch({ type: "GAIN_RESOURCES", resources: { coins: -theme.cost } })
      // In a real implementation, you'd unlock the theme here
      setSelectedTheme(theme.id)
    }
  }

  const handleApplyTheme = (themeId: string) => {
    setSelectedTheme(themeId)
    // Apply theme to document root
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      document.documentElement.style.setProperty("--theme-primary", theme.colors.primary)
      document.documentElement.style.setProperty("--theme-secondary", theme.colors.secondary)
      document.documentElement.style.setProperty("--theme-accent", theme.colors.accent)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          🎨 Theme Nexus
        </h2>
        <Badge variant="outline" className="border-purple-400 text-purple-400">
          Current: {themes.find((t) => t.id === selectedTheme)?.name}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Card key={theme.id} className="bg-slate-800/50 border-purple-500/50 overflow-hidden">
            <div className={`h-32 ${theme.preview} relative`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={selectedTheme === theme.id ? "default" : "outline"}
                    className={selectedTheme === theme.id ? "bg-purple-600" : "border-white/50 text-white"}
                  >
                    {selectedTheme === theme.id ? "Active" : "Preview"}
                  </Badge>
                  {theme.cost > 0 && (
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                      {theme.cost} coins
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{theme.name}</span>
                <Palette className="w-5 h-5 text-purple-400" />
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-300 text-sm mb-4">{theme.description}</p>

              <div className="flex items-center space-x-2 mb-4">
                {Object.values(theme.colors).map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white/20"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                {theme.unlocked || state.resources.coins >= theme.cost ? (
                  <Button
                    onClick={() => handleApplyTheme(theme.id)}
                    variant={selectedTheme === theme.id ? "default" : "outline"}
                    className="flex-1"
                    disabled={selectedTheme === theme.id}
                  >
                    {selectedTheme === theme.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Active
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePurchaseTheme(theme)}
                    variant="outline"
                    className="flex-1"
                    disabled={state.resources.coins < theme.cost}
                  >
                    <Lock className="w-4 h-4 mr-1" />
                    Purchase
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800/50 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-purple-400">🎨 Custom Theme Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Palette className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Coming Soon!</h3>
            <p className="text-gray-400">
              Create your own custom themes with our advanced color picker and gradient builder.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
