"use client"

import { useEffect, useState } from "react"
import { useGame } from "./game-context"
import { useToast } from "@/hooks/use-toast"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

export function EasterEggListener() {
  const [keySequence, setKeySequence] = useState<string[]>([])
  const { dispatch } = useGame()
  const { toast } = useToast()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeySequence((prev) => {
        const newSequence = [...prev, event.code].slice(-KONAMI_CODE.length)

        // Check if Konami code is complete
        if (
          newSequence.length === KONAMI_CODE.length &&
          newSequence.every((key, index) => key === KONAMI_CODE[index])
        ) {
          // Trigger super mode
          dispatch({ type: "GAIN_XP", amount: 500, reason: "Konami Code!" })
          toast({
            title: "🎉 KONAMI CODE ACTIVATED!",
            description: "Super Mode unlocked! +500 XP bonus!",
            duration: 5000,
          })

          // Add some visual effects
          document.body.style.animation = "rainbow 2s infinite"
          setTimeout(() => {
            document.body.style.animation = ""
          }, 5000)

          return []
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [dispatch, toast])

  return null
}
