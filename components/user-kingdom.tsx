"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Users, UserPlus, Crown, Ban, CheckCircle, XCircle, Search, TrendingUp } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function UserKingdom() {
  const { state, dispatch } = useGame()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
  })

  const users = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "Developer",
      status: "active",
      lastSeen: "2 min ago",
      xp: 890,
      level: 3,
      joinDate: "2023-06-15",
      tasksCompleted: 47,
      avatar: "👩‍💻",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@company.com",
      role: "Designer",
      status: "active",
      lastSeen: "1 hour ago",
      xp: 1200,
      level: 4,
      joinDate: "2023-05-20",
      tasksCompleted: 62,
      avatar: "👨‍🎨",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@company.com",
      role: "Manager",
      status: "inactive",
      lastSeen: "2 days ago",
      xp: 2100,
      level: 6,
      joinDate: "2023-01-10",
      tasksCompleted: 89,
      avatar: "👩‍💼",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@company.com",
      role: "Developer",
      status: "active",
      lastSeen: "30 min ago",
      xp: 1450,
      level: 5,
      joinDate: "2023-03-22",
      tasksCompleted: 73,
      avatar: "👨‍💻",
    },
    {
      id: "5",
      name: "Eva Martinez",
      email: "eva@company.com",
      role: "Analyst",
      status: "banned",
      lastSeen: "1 week ago",
      xp: 650,
      level: 2,
      joinDate: "2023-08-05",
      tasksCompleted: 23,
      avatar: "👩‍📊",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role.toLowerCase() === filterRole.toLowerCase()
    const matchesStatus = filterStatus === "all" || user.status === filterStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleUserAction = (userId: string, action: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return

    switch (action) {
      case "promote":
        dispatch({ type: "GAIN_RESOURCES", resources: { xp: 50, coins: 25 } })
        toast({
          title: "👑 User Promoted!",
          description: `${user.name} has been promoted! +50 XP earned!`,
          duration: 3000,
        })
        break
      case "ban":
        dispatch({ type: "GAIN_RESOURCES", resources: { xp: 25, coins: 10 } })
        toast({
          title: "🛡️ User Banned!",
          description: `${user.name} has been banned for security reasons. +25 XP earned!`,
          duration: 3000,
        })
        break
      case "activate":
        dispatch({ type: "GAIN_RESOURCES", resources: { xp: 30, coins: 15 } })
        toast({
          title: "✅ User Activated!",
          description: `${user.name} has been reactivated! +30 XP earned!`,
          duration: 3000,
        })
        break
    }
  }

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return

    dispatch({ type: "GAIN_RESOURCES", resources: { xp: 75, coins: 30 } })
    setNewUser({ name: "", email: "", role: "user" })

    toast({
      title: "🎉 New User Added!",
      description: `${newUser.name} has joined your kingdom! +75 XP earned!`,
      duration: 3000,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 border-green-400"
      case "inactive":
        return "text-yellow-400 border-yellow-400"
      case "banned":
        return "text-red-400 border-red-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "developer":
        return "💻"
      case "designer":
        return "🎨"
      case "manager":
        return "👑"
      case "analyst":
        return "📊"
      default:
        return "👤"
    }
  }

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    banned: users.filter((u) => u.status === "banned").length,
    totalXP: users.reduce((sum, u) => sum + u.xp, 0),
    avgLevel: Math.round(users.reduce((sum, u) => sum + u.level, 0) / users.length),
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          👑 User Kingdom
        </h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-purple-500">
            <DialogHeader>
              <DialogTitle className="text-purple-400">Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Name</label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter user name..."
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Email</label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address..."
                  className="bg-slate-700 border-slate-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300">Role</label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">👤 User</SelectItem>
                    <SelectItem value="developer">💻 Developer</SelectItem>
                    <SelectItem value="designer">🎨 Designer</SelectItem>
                    <SelectItem value="analyst">📊 Analyst</SelectItem>
                    <SelectItem value="manager">👑 Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddUser} className="w-full bg-purple-600 hover:bg-purple-700">
                Add to Kingdom (+75 XP)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="overview">Kingdom Overview</TabsTrigger>
          <TabsTrigger value="users">Manage Subjects</TabsTrigger>
          <TabsTrigger value="analytics">User Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Kingdom Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-300 text-sm font-medium">Total Subjects</p>
                    <p className="text-3xl font-bold text-white">{userStats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">Active Users</p>
                    <p className="text-3xl font-bold text-white">{userStats.active}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Total Kingdom XP</p>
                    <p className="text-3xl font-bold text-white">{userStats.totalXP.toLocaleString()}</p>
                  </div>
                  <Crown className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 border-cyan-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-300 text-sm font-medium">Average Level</p>
                    <p className="text-3xl font-bold text-white">{userStats.avgLevel}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-purple-400">🏆 Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users
                  .sort((a, b) => b.xp - a.xp)
                  .slice(0, 5)
                  .map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "🏅"}
                        </div>
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <h4 className="font-medium text-white">{user.name}</h4>
                          <p className="text-sm text-gray-400">{user.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-400">{user.xp} XP</div>
                        <div className="text-sm text-gray-400">Level {user.level}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600"
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-purple-400">Kingdom Subjects ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>XP</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{user.avatar}</div>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-purple-400 text-purple-400">
                          {getRoleIcon(user.role)} {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {user.status === "inactive" && <XCircle className="w-3 h-3 mr-1" />}
                          {user.status === "banned" && <Ban className="w-3 h-3 mr-1" />}
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-cyan-400">Level {user.level}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-purple-400">{user.xp} XP</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-400">{user.lastSeen}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {user.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, "promote")}
                              className="border-green-400 text-green-400 hover:bg-green-400/20"
                            >
                              <Crown className="w-3 h-3" />
                            </Button>
                          )}
                          {user.status !== "banned" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, "ban")}
                              className="border-red-400 text-red-400 hover:bg-red-400/20"
                            >
                              <Ban className="w-3 h-3" />
                            </Button>
                          )}
                          {user.status === "inactive" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, "activate")}
                              className="border-green-400 text-green-400 hover:bg-green-400/20"
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-cyan-400">Role Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Developer", "Designer", "Manager", "Analyst"].map((role) => {
                    const count = users.filter((u) => u.role === role).length
                    const percentage = (count / users.length) * 100
                    return (
                      <div key={role} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">
                            {getRoleIcon(role)} {role}
                          </span>
                          <span className="text-purple-400">
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-green-400">Activity Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: "Active", count: userStats.active, color: "bg-green-500" },
                    { status: "Inactive", count: userStats.inactive, color: "bg-yellow-500" },
                    { status: "Banned", count: userStats.banned, color: "bg-red-500" },
                  ].map((item) => {
                    const percentage = (item.count / users.length) * 100
                    return (
                      <div key={item.status} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-300">{item.status}</span>
                          <span className="text-purple-400">
                            {item.count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
