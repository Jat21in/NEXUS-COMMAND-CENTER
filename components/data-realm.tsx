"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Eye, UserPlus, Target } from "lucide-react"

export function DataRealm() {
  const { state, dispatch } = useGame()

  // Enhanced analytics data
  const userGrowthData = [
    { month: "Jan", users: 1200, revenue: 24000, engagement: 78, newUsers: 150, churn: 45 },
    { month: "Feb", users: 1350, revenue: 27000, engagement: 82, newUsers: 200, churn: 50 },
    { month: "Mar", users: 1180, revenue: 23600, engagement: 75, newUsers: 120, churn: 290 },
    { month: "Apr", users: 1420, revenue: 28400, engagement: 85, newUsers: 350, churn: 110 },
    { month: "May", users: 1380, revenue: 27600, engagement: 88, newUsers: 180, churn: 220 },
    { month: "Jun", users: 1650, revenue: 33000, engagement: 92, newUsers: 400, churn: 130 },
  ]

  const revenueBreakdown = [
    { source: "Subscriptions", amount: 18500, percentage: 56, color: "#8b5cf6" },
    { source: "One-time Sales", amount: 8200, percentage: 25, color: "#06b6d4" },
    { source: "Premium Features", amount: 4100, percentage: 12, color: "#10b981" },
    { source: "Partnerships", amount: 2200, percentage: 7, color: "#f59e0b" },
  ]

  const userDemographics = [
    { age: "18-24", users: 320, percentage: 19.4, color: "#8b5cf6" },
    { age: "25-34", users: 580, percentage: 35.2, color: "#06b6d4" },
    { age: "35-44", users: 450, percentage: 27.3, color: "#10b981" },
    { age: "45-54", users: 220, percentage: 13.3, color: "#f59e0b" },
    { age: "55+", users: 80, percentage: 4.8, color: "#ef4444" },
  ]

  const dailyActiveUsers = [
    { day: "Mon", active: 1247, sessions: 3420, avgSession: 24 },
    { day: "Tue", active: 1356, sessions: 3680, avgSession: 27 },
    { day: "Wed", active: 1189, sessions: 3210, avgSession: 22 },
    { day: "Thu", active: 1445, sessions: 3890, avgSession: 29 },
    { day: "Fri", active: 1523, sessions: 4120, avgSession: 31 },
    { day: "Sat", active: 1098, sessions: 2890, avgSession: 26 },
    { day: "Sun", active: 1234, sessions: 3340, avgSession: 28 },
  ]

  const revenueMetrics = [
    { metric: "Monthly Recurring Revenue", value: "$33,000", change: 12.5, trend: "up" },
    { metric: "Average Revenue Per User", value: "$20.00", change: 8.3, trend: "up" },
    { metric: "Customer Lifetime Value", value: "$240", change: 15.2, trend: "up" },
    { metric: "Churn Rate", value: "3.2%", change: -18.7, trend: "down" },
  ]

  const handleAnalyzeData = () => {
    dispatch({ type: "GAIN_RESOURCES", resources: { xp: 25, coins: 15 } })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-purple-400 p-3 rounded-lg shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-gray-100">
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          🔮 Data Realm
        </h2>
        <Button onClick={handleAnalyzeData} className="bg-purple-600 hover:bg-purple-700">
          <Activity className="w-4 h-4 mr-2" />
          Analyze Data (+25 XP)
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview" className="text-white data-[state=active]:text-purple-900">
            Overview
          </TabsTrigger>
          <TabsTrigger value="users" className="text-white data-[state=active]:text-purple-900">
            Users
          </TabsTrigger>
          <TabsTrigger value="revenue" className="text-white data-[state=active]:text-purple-900">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-white data-[state=active]:text-purple-900">
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold text-white">1,650</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+12.5%</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-blue-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm font-medium">Revenue</p>
                    <p className="text-3xl font-bold text-white">$33,000</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+8.2%</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">Engagement</p>
                    <p className="text-3xl font-bold text-white">92%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400 text-sm">+4.8%</span>
                    </div>
                  </div>
                  <Activity className="w-8 h-8 text-purple-300" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 border-cyan-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-200 text-sm font-medium">Page Views</p>
                    <p className="text-3xl font-bold text-white">24.7K</p>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                      <span className="text-red-400 text-sm">-2.1%</span>
                    </div>
                  </div>
                  <Eye className="w-8 h-8 text-cyan-300" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-purple-200">User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#d1d5db" />
                      <YAxis stroke="#d1d5db" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-cyan-200">Revenue vs Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#d1d5db" />
                      <YAxis yAxisId="left" stroke="#d1d5db" />
                      <YAxis yAxisId="right" orientation="right" stroke="#d1d5db" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="users"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        name="Users"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        name="Revenue ($)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-800/50 border-blue-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Daily Active Users</p>
                    <p className="text-2xl font-bold text-white">1,445</p>
                    <p className="text-green-400 text-sm">+8.3% from yesterday</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm font-medium">New Signups</p>
                    <p className="text-2xl font-bold text-white">127</p>
                    <p className="text-green-400 text-sm">+15.2% this week</p>
                  </div>
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">User Retention</p>
                    <p className="text-2xl font-bold text-white">87.3%</p>
                    <p className="text-green-400 text-sm">+2.1% this month</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Active Users Chart */}
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-purple-200">Daily Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyActiveUsers}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#d1d5db" />
                      <YAxis stroke="#d1d5db" />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="active" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Demographics */}
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-cyan-200">User Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userDemographics}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="users"
                        label={({ age, percentage }) => `${age}: ${percentage}%`}
                      >
                        {userDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Acquisition Funnel */}
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-green-200">User Acquisition & Retention</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-3xl mb-2">🌐</div>
                  <div className="text-2xl font-bold text-white">5,420</div>
                  <div className="text-sm text-gray-100">Website Visitors</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-3xl mb-2">👀</div>
                  <div className="text-2xl font-bold text-white">2,180</div>
                  <div className="text-sm text-gray-100">Trial Signups</div>
                  <div className="text-xs text-green-400">40.2% conversion</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-2xl font-bold text-white">1,650</div>
                  <div className="text-sm text-gray-100">Active Users</div>
                  <div className="text-xs text-green-400">75.7% activation</div>
                </div>
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="text-3xl mb-2">💎</div>
                  <div className="text-2xl font-bold text-white">1,240</div>
                  <div className="text-sm text-gray-100">Paying Users</div>
                  <div className="text-xs text-green-400">75.2% conversion</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced User Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-blue-200">User Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Average Session Duration</span>
                    <span className="text-white font-bold">28.5 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Pages per Session</span>
                    <span className="text-white font-bold">4.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Bounce Rate</span>
                    <span className="text-white font-bold">23.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Return Visitor Rate</span>
                    <span className="text-white font-bold">67.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-green-200">User Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Monthly Growth Rate</span>
                    <span className="text-green-400 font-bold">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Weekly Active Users</span>
                    <span className="text-white font-bold">8,420</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">User Acquisition Cost</span>
                    <span className="text-white font-bold">$24.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Organic Growth</span>
                    <span className="text-green-400 font-bold">34.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-purple-200">User Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Net Promoter Score</span>
                    <span className="text-white font-bold">72</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Customer Satisfaction</span>
                    <span className="text-white font-bold">4.6/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Support Tickets</span>
                    <span className="text-white font-bold">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-100">Feature Requests</span>
                    <span className="text-white font-bold">156</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {/* Revenue Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {revenueMetrics.map((metric, index) => (
              <Card key={index} className="bg-slate-800/50 border-green-500/50">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-green-200 text-sm font-medium">{metric.metric}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <div className="flex items-center">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-400 mr-1" />
                      )}
                      <span className="text-green-400 text-sm">
                        {metric.change > 0 ? "+" : ""}
                        {metric.change}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Breakdown */}
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-green-200">Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="amount"
                        label={({ source, percentage }) => `${source}: ${percentage}%`}
                      >
                        {revenueBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Revenue Trend */}
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-cyan-200">Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={userGrowthData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#d1d5db" />
                      <YAxis stroke="#d1d5db" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Details */}
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-purple-200">Revenue Breakdown Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueBreakdown.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }} />
                      <div>
                        <h4 className="font-medium text-white">{source.source}</h4>
                        <p className="text-sm text-gray-200">{source.percentage}% of total revenue</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">${source.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-200">This month</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Revenue Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-green-200">Revenue Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Q4 2024 Projection</h4>
                    <div className="text-2xl font-bold text-green-400">$125,000</div>
                    <div className="text-sm text-gray-200">+18.5% growth expected</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Annual Revenue Target</h4>
                    <div className="text-2xl font-bold text-cyan-400">$450,000</div>
                    <div className="text-sm text-gray-200">73% achieved so far</div>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Revenue per Employee</h4>
                    <div className="text-2xl font-bold text-purple-400">$85,000</div>
                    <div className="text-sm text-gray-200">Above industry average</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-cyan-200">Revenue Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Upsell Success Rate</div>
                      <div className="text-sm text-gray-200">Premium upgrades</div>
                    </div>
                    <div className="text-green-400 font-bold">28.3%</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Cross-sell Revenue</div>
                      <div className="text-sm text-gray-200">Additional products</div>
                    </div>
                    <div className="text-green-400 font-bold">$8,420</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Discount Impact</div>
                      <div className="text-sm text-gray-200">Revenue reduction</div>
                    </div>
                    <div className="text-red-400 font-bold">-$2,150</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium">Refund Rate</div>
                      <div className="text-sm text-gray-200">Customer returns</div>
                    </div>
                    <div className="text-yellow-400 font-bold">2.1%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Performance Indicators */}
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-purple-200">Key Revenue Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-lg border border-green-500/30">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-white">$2.8M</div>
                  <div className="text-sm text-gray-100">Total Revenue (YTD)</div>
                  <div className="text-xs text-green-400 mt-1">+22.5% vs last year</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg border border-blue-500/30">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-2xl font-bold text-white">$42.50</div>
                  <div className="text-sm text-gray-100">Avg Order Value</div>
                  <div className="text-xs text-green-400 mt-1">+8.3% this month</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-900/30 to-purple-800/30 rounded-lg border border-purple-500/30">
                  <div className="text-3xl mb-2">🔄</div>
                  <div className="text-2xl font-bold text-white">89.2%</div>
                  <div className="text-sm text-gray-100">Revenue Retention</div>
                  <div className="text-xs text-green-400 mt-1">+3.1% improvement</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 rounded-lg border border-cyan-500/30">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-2xl font-bold text-white">156 days</div>
                  <div className="text-sm text-gray-100">Revenue Runway</div>
                  <div className="text-xs text-green-400 mt-1">Healthy cash flow</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-slate-800/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-green-200">📈 Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Advanced Performance Metrics</h3>
                <p className="text-gray-100 mb-4">
                  Detailed performance analytics and optimization insights coming soon!
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Activity className="w-4 h-4 mr-2" />
                  Enable Performance Suite
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
