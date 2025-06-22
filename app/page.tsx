"use client"

import { GameProvider } from "@/components/game-context"
import { Dashboard } from "@/components/dashboard"
import { Toaster } from "@/components/ui/toaster"
import { ParticleSystem } from "@/components/particle-system"
import { SoundManager } from "@/components/sound-manager"

export default function Home() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <ParticleSystem />
        <Dashboard />
        <SoundManager />
        <Toaster />
      </div>
    </GameProvider>
  )
}
