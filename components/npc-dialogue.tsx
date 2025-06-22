"use client"

import { useGame } from "./game-context"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { X } from "lucide-react"
import { useState, useEffect } from "react"

export function NPCDialogue() {
  const { state, dispatch } = useGame()
  const [activeNPC, setActiveNPC] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState("")

  const currentNPC = state.npcs.find((npc) => npc.isActive && npc.location === state.activeLocation)

  useEffect(() => {
    if (currentNPC && !activeNPC) {
      setActiveNPC(currentNPC.id)
      typeText(currentNPC.dialogue[currentNPC.currentDialogue])
    }
  }, [currentNPC, activeNPC])

  const typeText = (text: string) => {
    setIsTyping(true)
    setDisplayedText("")

    let i = 0
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i))
      i++

      if (i > text.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 50)
  }

  const handleContinue = () => {
    if (currentNPC) {
      dispatch({ type: "TALK_TO_NPC", npcId: currentNPC.id })
      typeText(currentNPC.dialogue[(currentNPC.currentDialogue + 1) % currentNPC.dialogue.length])
    }
  }

  const handleClose = () => {
    if (currentNPC) {
      dispatch({ type: "DISMISS_NPC", npcId: currentNPC.id })
    }
    setActiveNPC(null)
  }

  if (!currentNPC || !activeNPC) return null

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50">
      <Card className="bg-slate-900/95 border-purple-500 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="text-4xl animate-bounce">{currentNPC.avatar}</div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-purple-400 text-lg">{currentNPC.name}</h3>
                <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg mb-4 min-h-[80px] flex items-center">
                <p className="text-white text-lg">
                  {displayedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={handleContinue}
                  disabled={isTyping}
                  className="border-purple-400 text-purple-400 hover:bg-purple-400/20"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
