'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react'
import { useCart } from './CartContext'
import styles from './Header.module.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark]         = useState(false)
  const { totalCount } = useCart()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <img src="/logo_monstruo.png" alt="Monstruo Taller" className={styles.logoImg} />
        </Link>

        {/* Menú */}
        <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ''}`}>
          <li><Link href="/tienda?cat=libretas" onClick={() => setMenuOpen(false)}>LIBRETAS</Link></li>
          <li><Link href="/eventos" onClick={() => setMenuOpen(false)}>EVENTOS</Link></li>
          <li><Link href="/universo"            onClick={() => setMenuOpen(false)}>NUESTRO UNIVERSO</Link></li>
        </ul>

        {/* Acciones */}
        <div className={styles.actions}>

          {/* Toggle dark / light */}
          <button
            className={styles.themeToggle}
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            <span className={`${styles.toggleTrack} ${dark ? styles.toggleDark : ''}`}>
              <span className={styles.toggleThumb}>
                {dark ? <Moon size={11} /> : <Sun size={11} />}
              </span>
            </span>
          </button>

          <Link href="/tienda" className={styles.btnTienda}>TIENDA</Link>

          {/* Carrito → va a /checkout, muestra badge con cantidad */}
          <Link
            href="/checkout"
            className={styles.cartBtn}
            aria-label={`Carrito (${totalCount} artículos)`}
          >
            <ShoppingCart size={20} />
            {totalCount > 0 && (
              <span className={styles.cartBadge}>{totalCount}</span>
            )}
          </Link>

          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </nav>
    </header>
  )
}