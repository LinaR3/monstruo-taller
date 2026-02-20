'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import styles from './ProductCard.module.css'

const WHATSAPP_NUMBER = '573133314271'

function buildWhatsAppUrl(product: Product): string {
  const precio = formatPrice(product.priceMin, product.priceMax)
  const msg = encodeURIComponent(
    `Hola! Me interesa *${product.name}* (${precio}) de la categoría ${product.category} 🛒\n¿Está disponible?`
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

const categoryLabel: Record<string, string> = {
  libretas:  'Libreta',
  camisetas: 'Camiseta',
  prints:    'Print',
  totebags:  'Totebag',
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
        />
      </div>

      <div className={styles.info}>
        <span className={styles.category}>{categoryLabel[product.category]}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.priceMin, product.priceMax)}</span>
          <a
            href={buildWhatsAppUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.addBtn}
            aria-label={`Comprar ${product.name}`}
            title="Continúa con la compra en nuestro taller WhatsApp"
          >
            <ShoppingCart size={15} />
          </a>
        </div>
      </div>
    </div>
  )
}