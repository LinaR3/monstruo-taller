import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/components/CartContext'
import CartDrawer from '@/components/CartDrawer'

export const metadata: Metadata = {
  title: 'Monstruo Taller — Arte & Libretas',
  description: 'Libretas, prints, camisetas y totebags hechos con amor. Lo llamamos monstruo porque es imaginario.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}