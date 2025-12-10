import React, { useEffect, useState } from 'react'
import { ShoppingBag, Plus, Minus, ArrowRight, Coins, Smartphone, Loader2 } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "../../components/ui/sheet"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Separator } from "../../components/ui/separator"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import { useAuth } from '../lib/AuthProvider'
import { useNavigate } from 'react-router-dom'

const PRODUCTS = [
  { id: 1, name: "Obsidian Shell", price: 2400, category: "Reward Tier 1", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600" },
  { id: 2, name: "Carbon Runner", price: 1800, category: "Reward Tier 2", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
  { id: 3, name: "Heavy Knit", price: 950, category: "Reward Tier 3", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Utility Tote", price: 1500, category: "Reward Tier 2", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600" },
  { id: 5, name: "Slate Chrono", price: 3200, category: "Reward Tier 1", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Matte Ceramic", price: 450, category: "Reward Tier 4", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600" },
]

const Shop = () => {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { currentUser, userData, loading } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    // 2. Only redirect if we are NOT loading and there is NO user
    if (!loading && !currentUser) {
      navigate('/')
    }
  }, [currentUser, loading, navigate])
  if (loading || !currentUser) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading...</p>
      </div>
    )
  }
  const userBalance = userData?.coins || 0
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setIsOpen(true)
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, qty: Math.max(0, item.qty + delta) }
      return item
    }).filter(item => item.qty > 0))
  }

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
  const remaining = userBalance - total

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-white selection:text-black">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* User Balance Display (Replaces Brand Name) */}
          <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-900">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-white">{userBalance}</span>
            <span className="text-xs">Coins</span>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="hover:bg-zinc-900 relative">
                <ShoppingBag className="w-5 h-5 text-zinc-300" />
                {cart.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[480px] bg-zinc-950 border-l border-zinc-900 text-zinc-100 flex flex-col p-0">
              <SheetHeader className="p-6 border-b border-zinc-900">
                <SheetTitle className="text-white text-lg font-light tracking-wide flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500" /> REDEMPTION BAG
                </SheetTitle>
              </SheetHeader>

              <ScrollArea className="flex-1 px-6">
                {cart.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-zinc-600 space-y-4">
                    <ShoppingBag className="w-12 h-12 opacity-20" />
                    <p>No rewards selected.</p>
                  </div>
                ) : (
                  <div className="py-6 space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="w-20 h-24 bg-zinc-900 rounded overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-zinc-200">{item.name}</h4>
                            <div className="flex items-center gap-1 text-yellow-500">
                              <Coins className="w-3 h-3" />
                              <p className="font-mono text-sm">{item.price}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider">{item.category}</p>
                            <div className="flex items-center gap-3 bg-zinc-900/50 rounded-full px-2 py-1">
                              <button onClick={() => updateQty(item.id, -1)} className="hover:text-white text-zinc-500"><Minus className="w-3 h-3" /></button>
                              <span className="text-xs font-mono w-3 text-center">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, 1)} className="hover:text-white text-zinc-500"><Plus className="w-3 h-3" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator className="bg-zinc-900 my-6" />

                    {/* OTP / Verification Form */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-4">Verification</h3>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label className="text-xs text-zinc-400">Mobile Number</Label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-2.5 w-4 h-4 text-zinc-600" />
                            <Input className="pl-10 bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700 placeholder:text-zinc-700" placeholder="+1 (555) 000-0000" />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-xs text-zinc-400">One-Time Password (OTP)</Label>
                          <div className="flex gap-2">
                            <Input className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700 placeholder:text-zinc-700 text-center tracking-widest" placeholder="• • • • • •" />
                            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-900 text-zinc-400">Send</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>

              {cart.length > 0 && (
                <SheetFooter className="p-6 bg-zinc-900/30 border-t border-zinc-900">
                  <div className="w-full space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-sm">Total Coins</span>
                        <span className="text-xl font-bold tracking-tight text-yellow-500 flex items-center gap-1">
                          {total.toLocaleString()} <Coins className="w-4 h-4" />
                        </span>
                      </div>
                      {remaining < 0 ? (
                        <p className="text-xs text-red-500 text-right">Insufficient balance</p>
                      ) : (
                        <p className="text-xs text-zinc-600 text-right">Remaining: {remaining.toLocaleString()}</p>
                      )}
                    </div>

                    <Button
                      disabled={remaining < 0}
                      className="w-full h-12 bg-white text-black hover:bg-zinc-200 text-base font-medium rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Redemption
                    </Button>
                  </div>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col gap-12">

          {/* Header Area */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">REWARDS</h1>
            <p className="text-zinc-500 text-lg max-w-lg font-light leading-relaxed">
              Exchange your earned currency for exclusive gear.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative aspect-4/5 overflow-hidden bg-zinc-900 rounded-sm mb-6 border border-zinc-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/60 backdrop-blur-md border-white/5 text-zinc-300 hover:bg-black/80 font-normal">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Hover Action */}
                  <div className="absolute bottom-0 inset-x-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-white text-black hover:bg-zinc-200 shadow-xl border-0"
                    >
                      Redeem <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex justify-between items-start border-t border-zinc-900 pt-4">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">{product.name}</h3>
                    <p className="text-sm text-zinc-600 mt-1">Instant Delivery</p>
                  </div>
                  <span className="text-lg font-mono text-yellow-500 flex items-center gap-1">
                    {product.price} <Coins className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Shop