"use client"

import type React from "react"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Plus, Calendar, User, Zap } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function KanbanBoard() {
  const { state, dispatch } = useGame()
  const { toast } = useToast()
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    dueDate: "",
  })

  const columns = [
    { id: "todo", title: "📋 TO DO", color: "border-red-500", bgColor: "bg-red-900/20" },
    { id: "progress", title: "⚡ IN PROGRESS", color: "border-yellow-500", bgColor: "bg-yellow-900/20" },
    { id: "done", title: "✅ COMPLETED", color: "border-green-500", bgColor: "bg-green-900/20" },
  ] as const

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTask(taskId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, status: "todo" | "progress" | "done") => {
    e.preventDefault()
    if (draggedTask) {
      dispatch({ type: "MOVE_TASK", taskId: draggedTask, status })

      if (status === "done") {
        const task = state.tasks?.find((t) => t.id === draggedTask)
        if (task) {
          toast({
            title: "🎉 Quest Completed!",
            description: `${task.title} completed! +${task.xpReward} XP earned!`,
            duration: 3000,
          })
          dispatch({ type: "GAIN_RESOURCES", resources: { xp: task.xpReward, coins: 25 } })
        }
      }

      setDraggedTask(null)
    }
  }

  const handleAddTask = () => {
    if (!newTask.title.trim()) return

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: "todo" as const,
      priority: newTask.priority,
      assignee: state.player.name,
      dueDate: newTask.dueDate,
      xpReward: newTask.priority === "high" ? 100 : newTask.priority === "medium" ? 75 : 50,
    }

    dispatch({ type: "ADD_TASK", task })
    setNewTask({ title: "", description: "", priority: "medium", dueDate: "" })

    toast({
      title: "📝 New Quest Created!",
      description: `${task.title} has been added to your quest log.`,
      duration: 2000,
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-400 text-red-400"
      case "medium":
        return "border-yellow-400 text-yellow-400"
      case "low":
        return "border-green-400 text-green-400"
      default:
        return "border-gray-400 text-gray-400"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "🔥"
      case "medium":
        return "⚡"
      case "low":
        return "🌱"
      default:
        return "📌"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          ⚔️ Quest Board
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Quest
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-purple-500">
            <DialogHeader>
              <DialogTitle className="text-purple-400">Create New Quest</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Quest Title</label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter quest title..."
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Description</label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Describe the quest..."
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Priority</label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">🌱 Low (50 XP)</SelectItem>
                      <SelectItem value="medium">⚡ Medium (75 XP)</SelectItem>
                      <SelectItem value="high">🔥 High (100 XP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300">Due Date</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>

              <Button onClick={handleAddTask} className="w-full bg-purple-600 hover:bg-purple-700">
                Create Quest
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <Card key={column.id} className={`bg-slate-800/50 ${column.color} border-2`}>
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{column.title}</span>
                <Badge variant="secondary" className="bg-slate-700">
                  {state.tasks?.filter((task) => task.status === column.id).length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`min-h-[500px] p-4 rounded-lg ${column.bgColor} space-y-4`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {state.tasks
                  ?.filter((task) => task.status === column.id)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="bg-slate-700/80 p-4 rounded-lg border border-slate-600 cursor-move hover:bg-slate-600/80 transition-all hover:scale-105 hover:shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-white text-sm">{task.title}</h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                          </div>
                        </div>

                        {task.description && <p className="text-gray-300 text-xs">{task.description}</p>}

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-2 text-gray-400">
                            <User className="w-3 h-3" />
                            <span>{task.assignee}</span>
                          </div>
                          {task.dueDate && (
                            <div className="flex items-center space-x-1 text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="flex items-center space-x-1 border-purple-400 text-purple-400"
                          >
                            <Zap className="w-3 h-3" />
                            <span>{task.xpReward} XP</span>
                          </Badge>

                          {column.id !== "done" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const nextStatus = column.id === "todo" ? "progress" : "done"
                                dispatch({ type: "MOVE_TASK", taskId: task.id, status: nextStatus })

                                if (nextStatus === "done") {
                                  toast({
                                    title: "🎉 Quest Completed!",
                                    description: `+${task.xpReward} XP earned!`,
                                    duration: 3000,
                                  })
                                  dispatch({ type: "GAIN_RESOURCES", resources: { xp: task.xpReward, coins: 25 } })
                                }
                              }}
                              className="text-xs border-green-400 text-green-400 hover:bg-green-400/20"
                            >
                              {column.id === "todo" ? "Start" : "Complete"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                {!state.tasks?.filter((task) => task.status === column.id).length && (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-sm">No quests in {column.title.toLowerCase()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
