'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from './CartContext'
import { formatPrice } from '@/lib/products'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { drawerOpen, drawerProduct, closeDrawer, addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | undefined>()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  // Cuando cambia el producto, resetear selecciones
  useEffect(() => {
    if (drawerProduct) {
      setSelectedSize(drawerProduct.sizes?.[0])
      setQty(1)
      setAdded(false)
    }
  }, [drawerProduct])

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleAdd = () => {
    if (!drawerProduct) return
    addItem(drawerProduct, selectedSize, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (!drawerProduct) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${drawerOpen ? styles.overlayVisible : ''}`}
        onClick={closeDrawer}
      />

      {/* Panel */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>1 artículo</span>
          <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Producto */}
        <div className={styles.body}>
          <div className={styles.productRow}>
            <div className={styles.imgWrap}>
              <Image
                src={drawerProduct.image}
                alt={drawerProduct.name}
                fill
                className={styles.img}
                sizes="160px"
              />
            </div>
            <div className={styles.productInfo}>
              <p className={styles.productName}>{drawerProduct.name.charAt(0) + drawerProduct.name.slice(1).toLowerCase()}</p>
              <p className={styles.productPrice}>{formatPrice(drawerProduct.priceMin, drawerProduct.priceMax)}</p>
              {drawerProduct.description && (
                <p className={styles.productDesc}>{drawerProduct.description}</p>
              )}
            </div>
          </div>

          {/* Tallas */}
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

          {/* Cantidad */}
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

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={`${styles.addBtn} ${added ? styles.addBtnSuccess : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ AÑADIDO AL CARRITO' : 'AÑADIR AL CARRITO'}
          </button>

          <Link
            href={`/tienda`}
            className={styles.detailLink}
            onClick={closeDrawer}
          >
            Ver detalle
          </Link>
        </div>

      </div>
    </>
  )
}