'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ShoppingCart, Minus, Plus, Truck, MessageCircle } from 'lucide-react'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/products'
import styles from './ProductModal.module.css'

const categoryLabel: Record<string, string> = {
  libretas:  'Libreta',
  camisetas: 'Camiseta',
  prints:    'Print',
  totebags:  'Totebag',
}

const badges: Record<string, string[]> = {
  libretas:  ['COSIDAS A MANO', 'TAPA DURA', 'HECHAS EN COLOMBIA'],
  camisetas: ['100% ALGODÓN', 'SERIGRAFÍA', 'HECHAS EN COLOMBIA'],
  prints:    ['PAPEL PREMIUM', 'TINTA RESISTENTE', 'HECHAS EN COLOMBIA'],
  totebags:  ['TELA RESISTENTE', 'ESTAMPADO', 'HECHAS EN COLOMBIA'],
}

interface Props {
  product: Product
  onClose: () => void
  buildWhatsAppUrl: (product: Product, size?: string) => string
}

export default function ProductModal({ product, onClose, buildWhatsAppUrl }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  )
  const [qty, setQty] = useState(1)

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const whatsappUrl = buildWhatsAppUrl(product, selectedSize)

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Botón cerrar */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <X size={22} />
        </button>

        {/* Imagen */}
        <div className={styles.imageCol}>
          <div className={styles.imageWrap}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 90vw, 45vw"
              priority
            />
          </div>
        </div>

        {/* Info */}
        <div className={styles.infoCol}>
          <span className={styles.category}>{categoryLabel[product.category]}</span>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.price}>{formatPrice(product.priceMin, product.priceMax)} COP</p>

          {/* Tallas / Tamaños */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.sizesBlock}>
              <span className={styles.sizeLabel}>
                {product.category === 'libretas' ? 'Tamaño' : 'Talla'}
              </span>
              <div className={styles.sizes}>
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`${styles.sizeBtn} ${selectedSize === s ? styles.sizeBtnActive : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Descripción */}
          {product.description && (
            <p className={styles.desc}>{product.description}</p>
          )}

          {/* Cantidad */}
          <div className={styles.qtyBlock}>
            <span className={styles.sizeLabel}>Cantidad</span>
            <div className={styles.qtyRow}>
              <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>
                <Minus size={14} />
              </button>
              <span className={styles.qtyNum}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            <ShoppingCart size={18} />
            PEDIR POR WHATSAPP
          </a>

          {/* Badges */}
          <div className={styles.badges}>
            {(badges[product.category] ?? badges.libretas).map((b, i) => (
              <span key={i} className={styles.badge}>{b}</span>
            ))}
          </div>

          {/* Info envío */}
          <div className={styles.shippingInfo}>
            <span><Truck size={14} /> Envíos entre 1 y 3 días hábiles</span>
            <span><MessageCircle size={14} /> ¿Tienes alguna pregunta? Escríbenos</span>
          </div>
        </div>

      </div>
    </div>
  )
}