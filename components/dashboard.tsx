"use client"

import { useGame } from "./game-context"
import { Header } from "./header"
import { WorldMap } from "./world-map"
import { NPCDialogue } from "./npc-dialogue"
import { CommandCenter } from "./command-center"
import { QuestPanel } from "./quest-panel"
import { PlayerStats } from "./player-stats"
import { ResourceBar } from "./resource-bar"
import { CalendarView } from "./calendar-view"
import { DataRealm } from "./data-realm"
import { KanbanBoard } from "./kanban-board"
import { UserKingdom } from "./user-kingdom"
import { TechFortress } from "./tech-fortress"
import { BugArena } from "./bug-arena"
import { UpgradeBazaar } from "./upgrade-bazaar"
import { ThemeCustomizer } from "./theme-customizer"

export function Dashboard() {
  const { state } = useGame()

  const renderActiveLocation = () => {
    switch (state.activeLocation) {
      case "dashboard":
        return <CommandCenter />
      case "analytics":
        return <DataRealm />
      case "users":
        return <UserKingdom />
      case "system":
        return <TechFortress />
      case "battle":
        return <BugArena />
      case "shop":
        return <UpgradeBazaar />
      case "kanban":
        return <KanbanBoard />
      case "calendar":
        return <CalendarView />
      case "themes":
        return <ThemeCustomizer />
      default:
        return <CommandCenter />
    }
  }

  return (
    <div className={`min-h-screen ${state.retro ? "font-mono bg-slate-900" : "font-sans"}`}>
      <Header />
      <ResourceBar />

      <div className="flex">
        <div className="w-80 border-r border-purple-500/30 bg-slate-900/50 backdrop-blur-sm">
          <WorldMap />
          <PlayerStats />
          <QuestPanel />
        </div>

        <main className="flex-1 relative">
          {renderActiveLocation()}
          <NPCDialogue />
        </main>
      </div>
    </div>
  )
}
