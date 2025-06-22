"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar } from "./avatar"

const avatarOptions = {
  base: ["knight", "mage", "ninja", "robot"],
  hat: ["crown", "helmet", "cap", "none"],
  accessory: ["shield", "cloak", "glasses", "none"],
  weapon: ["sword", "staff", "bow", "none"],
}

export function AvatarCustomizer() {
  const { state, dispatch } = useGame()

  return (
    <div className="space-y-6">
      <Card className={`${state.retro ? "bg-blue-900 border-cyan-400 border-2" : "bg-slate-800/50 border-purple-500"}`}>
        <CardHeader>
          <CardTitle className={`${state.retro ? "text-yellow-300" : "text-white"}`}>🧍 Avatar Customizer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <Avatar size="xl" />
              <p className={`mt-2 font-medium ${state.retro ? "text-yellow-200" : "text-white"}`}>
                Level {state.level} {state.avatar.base}
              </p>
            </div>

            <div className="flex-1 space-y-4">
              {Object.entries(avatarOptions).map(([category, options]) => (
                <div key={category}>
                  <h3 className={`font-medium mb-2 capitalize ${state.retro ? "text-yellow-300" : "text-white"}`}>
                    {category}
                  </h3>
                  <div className="flex space-x-2">
                    {options.map((option) => (
                      <Button
                        key={option}
                        variant={state.avatar[category as keyof typeof state.avatar] === option ? "default" : "outline"}
                        size="sm"
                        onClick={() =>
                          dispatch({
                            type: "UPDATE_AVATAR",
                            avatar: { [category]: option },
                          })
                        }
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
