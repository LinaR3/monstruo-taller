'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import { useCart } from './CartContext'
import styles from './ProductCard.module.css'

const categoryLabel: Record<string, string> = {
  libretas:  'Libreta',
  camisetas: 'Camiseta',
  prints:    'Print',
  totebags:  'Totebag',
}

export default function ProductCard({ product }: { product: Product }) {
  const { openDrawer } = useCart()

  return (
    <div className={styles.card} onClick={() => openDrawer(product)}>
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
          <span className={styles.price}>{formatPrice(product.priceMin, product.priceMax)} COP</span>
          <button
            className={styles.addBtn}
            aria-label={`Añadir ${product.name} al carrito`}
            onClick={e => { e.stopPropagation(); openDrawer(product) }}
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}