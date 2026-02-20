import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}