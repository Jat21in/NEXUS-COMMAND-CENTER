"use client"

import { useGame } from "./game-context"

interface AvatarProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function Avatar({ size = "md", className = "" }: AvatarProps) {
  const { state } = useGame()

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  }

  // Simple pixel-art style avatar representation
  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {state.retro ? (
        <div className="w-full h-full bg-gradient-to-b from-gray-400 to-gray-600 rounded-sm border-2 border-gray-300 flex items-center justify-center text-xs font-bold">
          🤖
        </div>
      ) : (
        <div className="w-full h-full bg-gradient-to-b from-purple-400 to-purple-600 rounded-full border-2 border-purple-300 flex items-center justify-center text-lg">
          ⚔️
        </div>
      )}
    </div>
  )
}
