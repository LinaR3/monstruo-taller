'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from './CartContext'
import { formatPrice } from '@/lib/products'
import styles from './CartDrawer.module.css'

// Dado un producto y talla seleccionada, devuelve el precio unitario
function getPriceForSize(product: any, size?: string): number {
  if (product.category === 'libretas' && product.sizes && size) {
    const idx = product.sizes.indexOf(size)
    // índice 0 = pequeña = priceMin, índice 1 = grande = priceMax
    if (idx === 1 && product.priceMax) return product.priceMax
  }
  return product.priceMin
}

export default function CartDrawer() {
  const { drawerOpen, drawerProduct, closeDrawer, addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [qty, setQty] = useState(1)
  const router = useRouter()

  useEffect(() => {
    if (drawerProduct) {
      setSelectedSize(drawerProduct.sizes?.[0])
      setQty(1)
    }
  }, [drawerProduct])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  if (!drawerProduct) return null

  // Precio dinámico según talla seleccionada
  const unitPrice    = getPriceForSize(drawerProduct, selectedSize)
  const fmt          = (n: number) => `$${n.toLocaleString('es-CO')}`
  const displayPrice = fmt(unitPrice)

  const handleAdd = () => {
    addItem(drawerProduct, selectedSize, qty, unitPrice)
    closeDrawer()
    router.push('/checkout')
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${drawerOpen ? styles.overlayVisible : ''}`}
        onClick={closeDrawer}
      />
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>

        <div className={styles.header}>
          <div>
            <p className={styles.headerSub}>1 artículo</p>
            <span className={styles.headerTitle}>Elegir opciones</span>
          </div>
          <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.productRow}>
            <div className={styles.imgWrap}>
              <Image
                src={drawerProduct.image}
                alt={drawerProduct.name}
                fill
                className={styles.img}
                sizes="90px"
              />
            </div>
            <div className={styles.productInfo}>
              <p className={styles.productName}>
                {drawerProduct.name.charAt(0) + drawerProduct.name.slice(1).toLowerCase()}
              </p>
              {/* Precio dinámico */}
              <p className={styles.productPrice}>{displayPrice} COP</p>
              {drawerProduct.description && (
                <p className={styles.productDesc}>{drawerProduct.description}</p>
              )}
            </div>
          </div>

          {drawerProduct.sizes && drawerProduct.sizes.length > 0 && (
            <div className={styles.block}>
              <span className={styles.blockLabel}>
                {drawerProduct.category === 'libretas' ? 'Tamaño' : 'Talla'}
              </span>
              <div className={styles.sizes}>
                {drawerProduct.sizes.map(s => (
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

          <div className={styles.block}>
            <span className={styles.blockLabel}>Cantidad</span>
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
        </div>

        <div className={styles.footer}>
          <button className={styles.addBtn} onClick={handleAdd}>
            AÑADIR AL CARRITO
          </button>
          <Link href="/tienda" className={styles.detailLink} onClick={closeDrawer}>
            Ver detalle
          </Link>
        </div>

      </div>
    </>
  )
}