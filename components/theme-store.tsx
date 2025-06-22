"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Lock, Check } from "lucide-react"

const themes = [
  { id: "retro", name: "8-Bit Retro", cost: 0, unlocked: true, preview: "bg-blue-900" },
  { id: "neon", name: "Neon Cyber", cost: 500, unlocked: false, preview: "bg-pink-900" },
  { id: "forest", name: "Forest Guardian", cost: 1000, unlocked: false, preview: "bg-green-900" },
  { id: "space", name: "Space Explorer", cost: 1500, unlocked: false, preview: "bg-indigo-900" },
  { id: "fire", name: "Fire Warrior", cost: 2000, unlocked: false, preview: "bg-red-900" },
]

export function ThemeStore() {
  const { state, dispatch } = useGame()

  const handlePurchase = (theme: (typeof themes)[0]) => {
    if (state.xp >= theme.cost) {
      dispatch({ type: "GAIN_XP", amount: -theme.cost, reason: "Theme purchase" })
      dispatch({ type: "CHANGE_THEME", theme: theme.id })
    }
  }

  return (
    <div className="space-y-6">
      <Card className={`${state.retro ? "bg-blue-900 border-cyan-400 border-2" : "bg-slate-800/50 border-purple-500"}`}>
        <CardHeader>
          <CardTitle className={`${state.retro ? "text-yellow-300" : "text-white"}`}>🎨 Theme Store</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <Card key={theme.id} className={`${theme.preview} border-2`}>
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <h3 className="font-bold text-white">{theme.name}</h3>
                    <div className="h-16 rounded bg-black/20 flex items-center justify-center">
                      <span className="text-white/70">Preview</span>
                    </div>

                    {theme.unlocked || state.xp >= theme.cost ? (
                      <Button
                        className="w-full"
                        variant={state.theme === theme.id ? "default" : "outline"}
                        onClick={() => handlePurchase(theme)}
                        disabled={state.theme === theme.id}
                      >
                        {state.theme === theme.id ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Active
                          </>
                        ) : theme.cost === 0 ? (
                          "Free"
                        ) : (
                          `${theme.cost} XP`
                        )}
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        <Lock className="w-4 h-4 mr-1" />
                        {theme.cost} XP
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
