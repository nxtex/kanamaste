"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  category: string
  grams: number
  price: number
  qty: number
  color: string
}

const DEMO_ITEMS: CartItem[] = [
  { id: 'amnesia', name: 'Amnesia Haze CBD',      category: 'Fleur',  grams: 2, price: 9.90,  qty: 1, color: '#e8f4e8' },
  { id: 'hash',    name: 'Hash Marocain Premium', category: 'Résine', grams: 3, price: 14.90, qty: 1, color: '#f4ede0' },
]

interface CartCtx {
  items: CartItem[]
  totalQty: number
  updateQty: (id: string, delta: number) => void
  removeItem: (id: string) => void
  addItem: (item: CartItem) => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(DEMO_ITEMS)

  const updateQty = useCallback((id: string, delta: number) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i)
      return [...prev, item]
    })
  }, [])

  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, totalQty, updateQty, removeItem, addItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
