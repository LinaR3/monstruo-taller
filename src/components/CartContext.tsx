'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Product } from '@/lib/products'

export interface CartItem {
  product: Product
  size?: string
  qty: number
}

interface CartContextType {
  items: CartItem[]
  drawerOpen: boolean
  drawerProduct: Product | null
  openDrawer: (product: Product) => void
  closeDrawer: () => void
  addItem: (product: Product, size?: string, qty?: number) => void
  removeItem: (productId: string, size?: string) => void
  totalCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems]               = useState<CartItem[]>([])
  const [drawerOpen, setDrawerOpen]     = useState(false)
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(null)

  const openDrawer = (product: Product) => {
    setDrawerProduct(product)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setTimeout(() => setDrawerProduct(null), 300)
  }

  const addItem = (product: Product, size?: string, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.size === size
      )
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, qty: i.qty + qty }
            : i
        )
      }
      return [...prev, { product, size, qty }]
    })
  }

  const removeItem = (productId: string, size?: string) => {
    setItems(prev =>
      prev.filter(i => !(i.product.id === productId && i.size === size))
    )
  }

  const totalCount = items.reduce((acc, i) => acc + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, drawerOpen, drawerProduct,
      openDrawer, closeDrawer, addItem, removeItem, totalCount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}