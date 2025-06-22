"use client"

import { useGame } from "./game-context"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ShoppingCart, Zap, Shield, Sword, Crown, Gem, Star, Lock, Check, Coins } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  currency: "coins" | "gems"
  category: "weapons" | "armor" | "abilities" | "cosmetics"
  rarity: "common" | "rare" | "epic" | "legendary"
  icon: string
  effects: string[]
  owned: boolean
  level: number
}

export function UpgradeBazaar() {
  const { state, dispatch } = useGame()
  const { toast } = useToast()

  const [shopItems] = useState<ShopItem[]>([
    {
      id: "neural-sword",
      name: "Neural Code Blade",
      description: "A legendary weapon that cuts through bugs with precision",
      price: 500,
      currency: "coins",
      category: "weapons",
      rarity: "legendary",
      icon: "⚔️",
      effects: ["+50 Attack Power", "+25% Critical Hit", "Bug Slayer Bonus"],
      owned: false,
      level: 1,
    },
    {
      id: "quantum-shield",
      name: "Quantum Firewall",
      description: "Advanced protection against all types of cyber threats",
      price: 750,
      currency: "coins",
      category: "armor",
      rarity: "epic",
      icon: "🛡️",
      effects: ["+100 Defense", "+50% Damage Reduction", "Auto-Heal"],
      owned: false,
      level: 1,
    },
    {
      id: "data-crown",
      name: "Crown of Data Mastery",
      description: "Increases XP gain and unlocks advanced analytics",
      price: 25,
      currency: "gems",
      category: "cosmetics",
      rarity: "legendary",
      icon: "👑",
      effects: ["+50% XP Gain", "+25% Coin Bonus", "Analytics Boost"],
      owned: false,
      level: 1,
    },
    {
      id: "speed-boost",
      name: "Velocity Enhancer",
      description: "Permanently increases task completion speed",
      price: 300,
      currency: "coins",
      category: "abilities",
      rarity: "rare",
      icon: "⚡",
      effects: ["+30% Task Speed", "+15% Energy Regen", "Quick Actions"],
      owned: false,
      level: 1,
    },
    {
      id: "admin-cape",
      name: "Administrator's Cloak",
      description: "A majestic cape that shows your admin prowess",
      price: 15,
      currency: "gems",
      category: "cosmetics",
      rarity: "epic",
      icon: "🦸",
      effects: ["+20% Leadership", "Intimidation Aura", "Style Points"],
      owned: false,
      level: 1,
    },
    {
      id: "debug-hammer",
      name: "Debug Warhammer",
      description: "Smashes bugs and performance issues with ease",
      price: 400,
      currency: "coins",
      category: "weapons",
      rarity: "rare",
      icon: "🔨",
      effects: ["+40 Attack", "Bug Crusher", "+20% Performance Fix"],
      owned: false,
      level: 1,
    },
    {
      id: "crypto-armor",
      name: "Cryptographic Armor",
      description: "Ultimate protection with built-in encryption",
      price: 30,
      currency: "gems",
      category: "armor",
      rarity: "legendary",
      icon: "🔐",
      effects: ["+150 Defense", "Encryption Shield", "Data Protection"],
      owned: false,
      level: 1,
    },
    {
      id: "ai-assistant",
      name: "AI Code Assistant",
      description: "An intelligent companion that helps with coding tasks",
      price: 1000,
      currency: "coins",
      category: "abilities",
      rarity: "legendary",
      icon: "🤖",
      effects: ["Auto-Complete Tasks", "+100% Code Quality", "Smart Suggestions"],
      owned: false,
      level: 1,
    },
  ])

  const handlePurchase = (item: ShopItem) => {
    const canAfford =
      item.currency === "coins" ? state.resources.coins >= item.price : state.resources.gems >= item.price

    if (!canAfford) {
      toast({
        title: "💸 Insufficient Funds!",
        description: `You need ${item.price} ${item.currency} to purchase this item.`,
        duration: 3000,
      })
      return
    }

    // Deduct currency
    const resourceUpdate = item.currency === "coins" ? { coins: -item.price } : { gems: -item.price }

    dispatch({ type: "GAIN_RESOURCES", resources: resourceUpdate })

    toast({
      title: "🎉 Purchase Successful!",
      description: `${item.name} has been added to your inventory!`,
      duration: 4000,
    })

    // Mark item as owned (in a real app, this would update the database)
    item.owned = true
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400 border-gray-400"
      case "rare":
        return "text-blue-400 border-blue-400"
      case "epic":
        return "text-purple-400 border-purple-400"
      case "legendary":
        return "text-yellow-400 border-yellow-400"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "shadow-lg shadow-yellow-400/20"
      case "epic":
        return "shadow-lg shadow-purple-400/20"
      case "rare":
        return "shadow-lg shadow-blue-400/20"
      default:
        return ""
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "weapons":
        return <Sword className="w-4 h-4" />
      case "armor":
        return <Shield className="w-4 h-4" />
      case "abilities":
        return <Zap className="w-4 h-4" />
      case "cosmetics":
        return <Crown className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  const filterItemsByCategory = (category: string) => {
    return shopItems.filter((item) => item.category === category)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          🛒 Upgrade Bazaar
        </h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="border-yellow-400 text-yellow-400">
            <Coins className="w-3 h-3 mr-1" />
            {state.resources.coins} Coins
          </Badge>
          <Badge variant="outline" className="border-purple-400 text-purple-400">
            <Gem className="w-3 h-3 mr-1" />
            {state.resources.gems} Gems
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="armor">Armor</TabsTrigger>
          <TabsTrigger value="abilities">Abilities</TabsTrigger>
          <TabsTrigger value="cosmetics">Cosmetics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shopItems.map((item) => (
              <Card
                key={item.id}
                className={`bg-slate-800/50 border-purple-500/50 hover:border-purple-400 transition-all ${getRarityGlow(item.rarity)}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="text-white text-sm font-bold">{item.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                            {item.rarity}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-gray-400 text-gray-400">
                            {getCategoryIcon(item.category)}
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {item.owned && <Check className="w-5 h-5 text-green-400" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-xs">{item.description}</p>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-purple-400">Effects:</h4>
                    {item.effects.map((effect, index) => (
                      <div key={index} className="text-xs text-green-400 flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {effect}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-600">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        {item.currency === "coins" ? (
                          <Coins className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Gem className="w-4 h-4 text-purple-400" />
                        )}
                        <span
                          className={`font-bold ${item.currency === "coins" ? "text-yellow-400" : "text-purple-400"}`}
                        >
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {item.owned ? (
                      <Button disabled className="w-full bg-green-600">
                        <Check className="w-4 h-4 mr-2" />
                        Owned
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={
                          item.currency === "coins"
                            ? state.resources.coins < item.price
                            : state.resources.gems < item.price
                        }
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                      >
                        {(
                          item.currency === "coins"
                            ? state.resources.coins < item.price
                            : state.resources.gems < item.price
                        ) ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Insufficient Funds
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Purchase
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["weapons", "armor", "abilities", "cosmetics"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterItemsByCategory(category).map((item) => (
                <Card
                  key={item.id}
                  className={`bg-slate-800/50 border-purple-500/50 hover:border-purple-400 transition-all ${getRarityGlow(item.rarity)}`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h3 className="text-white text-sm font-bold">{item.name}</h3>
                          <Badge variant="outline" className={`text-xs ${getRarityColor(item.rarity)}`}>
                            {item.rarity}
                          </Badge>
                        </div>
                      </div>
                      {item.owned && <Check className="w-5 h-5 text-green-400" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-400 text-xs">{item.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-purple-400">Effects:</h4>
                      {item.effects.map((effect, index) => (
                        <div key={index} className="text-xs text-green-400 flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          {effect}
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          {item.currency === "coins" ? (
                            <Coins className="w-4 h-4 text-yellow-400" />
                          ) : (
                            <Gem className="w-4 h-4 text-purple-400" />
                          )}
                          <span
                            className={`font-bold ${item.currency === "coins" ? "text-yellow-400" : "text-purple-400"}`}
                          >
                            {item.price}
                          </span>
                        </div>
                      </div>

                      {item.owned ? (
                        <Button disabled className="w-full bg-green-600">
                          <Check className="w-4 h-4 mr-2" />
                          Owned
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handlePurchase(item)}
                          disabled={
                            item.currency === "coins"
                              ? state.resources.coins < item.price
                              : state.resources.gems < item.price
                          }
                          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                        >
                          {(
                            item.currency === "coins"
                              ? state.resources.coins < item.price
                              : state.resources.gems < item.price
                          ) ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Insufficient Funds
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Purchase
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
