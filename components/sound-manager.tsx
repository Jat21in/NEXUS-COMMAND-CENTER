"use client"

import { useGame } from "./game-context"
import { useEffect, useRef } from "react"

export function SoundManager() {
  const { state } = useGame()
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  const playSound = (frequency: number, duration: number, type: OscillatorType = "sine") => {
    if (!audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration)
  }

  // Play ambient sounds based on location
  useEffect(() => {
    const ambientSounds = {
      dashboard: () => playSound(200, 0.1, "sine"),
      analytics: () => playSound(300, 0.15, "triangle"),
      system: () => playSound(150, 0.2, "sawtooth"),
      battle: () => playSound(100, 0.3, "square"),
    }

    const sound = ambientSounds[state.activeLocation as keyof typeof ambientSounds]
    if (sound) {
      const interval = setInterval(sound, 5000)
      return () => clearInterval(interval)
    }
  }, [state.activeLocation])

  return null
}
