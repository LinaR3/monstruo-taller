'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, ShoppingCart } from 'lucide-react'
import { products, formatPrice } from '@/lib/products'
import styles from './FeaturedSection.module.css'

const WHATSAPP_NUMBER = '+573133314271'

const categoryLabel: Record<string, string> = {
  libretas: 'Libreta', camisetas: 'Camiseta', prints: 'Print', totebags: 'Totebag',
}

export default function FeaturedSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [atEnd, setAtEnd] = useState(false)

  const SCROLL_AMOUNT = 340

  const checkPosition = () => {
    const el = trackRef.current
    if (!el) return
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 20)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', checkPosition, { passive: true })
    return () => el.removeEventListener('scroll', checkPosition)
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? SCROLL_AMOUNT : -SCROLL_AMOUNT, behavior: 'smooth' })
  }

  return (
    <section className={styles.section} id="cositas-nuevas">

      {/* Header de la sección */}
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.title}>COSITAS NUEVAS</h2>
          <p className={styles.subtitle}>Conoce nuestros mas recientes lanzamientos</p>
        </div>
        <Link href="/tienda" className={styles.verTodo}>Ver todo →</Link>
      </div>

      {/* Carrusel */}
      <div className={styles.carouselOuter}>
        <div className={styles.track} ref={trackRef}>
          {products.map(product => {
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              `Hola! Me interesa *${product.name}* (${formatPrice(product.priceMin, product.priceMax)}) 🛒 ¿Está disponible?`
            )}`
            return (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image src={product.image} alt={product.name} fill className={styles.image} sizes="320px" />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardRow}>
                    <div className={styles.cardInfo}>
                      <p className={styles.cardTitle}>
                        {categoryLabel[product.category]} {product.name.charAt(0) + product.name.slice(1).toLowerCase()}
                      </p>
                      <p className={styles.cardDesc}>Ilustración original hecha a mano con amor.</p>
                    </div>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.cartBtn}
                      title="Continúa con la compra en nuestro taller WhatsApp">
                      <ShoppingCart size={18} />
                    </a>
                  </div>
                  <p className={styles.cardPrice}>{formatPrice(product.priceMin, product.priceMax)} COP</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Flecha — derecha hasta el final, luego izquierda */}
        <button
          className={`${styles.arrow} ${atEnd ? styles.arrowLeft : styles.arrowRight}`}
          onClick={() => scroll(atEnd ? 'left' : 'right')}
          aria-label={atEnd ? 'Volver' : 'Ver más'}
        >
          {atEnd ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {[0, 1, 2, 3].map(i => (
          <button key={i} className={styles.dot}
            onClick={() => trackRef.current?.scrollTo({ left: i * SCROLL_AMOUNT * 3, behavior: 'smooth' })}
            aria-label={`Página ${i + 1}`}
          />
        ))}
      </div>

    </section>
  )
}