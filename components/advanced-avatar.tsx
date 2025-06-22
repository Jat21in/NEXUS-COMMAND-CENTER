"use client"

import { useGame } from "./game-context"
import { useState, useEffect } from "react"

interface AdvancedAvatarProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
  className?: string
}

export function AdvancedAvatar({ size = "md", animated = false, className = "" }: AdvancedAvatarProps) {
  const { state } = useGame()
  const { player } = state
  const [animationState, setAnimationState] = useState("idle")

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  }

  useEffect(() => {
    if (animated) {
      const animations = ["idle", "wave", "glow", "spin"]
      const interval = setInterval(() => {
        setAnimationState(animations[Math.floor(Math.random() * animations.length)])
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [animated])

  const getAvatarStyle = () => {
    const baseStyle =
      "relative rounded-full border-4 border-purple-400 bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-2xl font-bold shadow-lg"

    if (animated) {
      switch (animationState) {
        case "wave":
          return `${baseStyle} animate-bounce`
        case "glow":
          return `${baseStyle} animate-pulse shadow-purple-400/50 shadow-2xl`
        case "spin":
          return `${baseStyle} animate-spin`
        default:
          return baseStyle
      }
    }

    return baseStyle
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className={getAvatarStyle()}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />

        <div className="relative z-10">{player.avatar.base === "cyber-knight" ? "🤖" : "⚔️"}</div>

        {player.avatar.helmet === "neural-crown" && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs">👑</div>
        )}

        {player.avatar.aura === "electric-blue" && (
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-75" />
        )}

        <div className="absolute -bottom-1 left-0 right-0 flex space-x-1 justify-center">
          <div className="w-2 h-1 bg-red-500 rounded" style={{ width: `${(player.health / 100) * 8}px` }} />
          <div className="w-2 h-1 bg-blue-500 rounded" style={{ width: `${(player.mana / 100) * 8}px` }} />
        </div>
      </div>
    </div>
  )
}
