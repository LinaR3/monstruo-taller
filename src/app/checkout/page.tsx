'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartContext'
import { formatPrice } from '@/lib/products'
import styles from './checkout.module.css'
import { Trash2, X } from 'lucide-react'

const STORE_EMAIL = 'mun@monstruotaller.com'
const SHIPPING = 10000

export default function CheckoutPage() {
  const { items, removeItem } = useCart()

  const [payMethod, setPayMethod] = useState<'tarjeta' | 'pse' | 'transferencia'>('tarjeta')
  const [form, setForm] = useState({
    nombre: '', apellido: '', pais: 'Colombia',
    direccion: '', casa: '', ciudad: '',
    departamento: '', telefono: '', coupon: '',
  })
  const [couponApplied, setCouponApplied] = useState(false)
  const [sent, setSent] = useState(false)
  const [showThanks, setShowThanks] = useState(false)

  const subtotal = items.reduce((acc, i) =>
    acc + (i.product.priceMax ?? i.product.priceMin) * i.qty, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount + (items.length > 0 ? SHIPPING : 0)
  const fmt = (n: number) => `$${n.toLocaleString('es-CO')} COP`
  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const handlePagar = () => {
    const productosTexto = items.map(i =>
      `- ${i.product.name}${i.size ? ` (${i.size})` : ''} x${i.qty} = ${fmt((i.product.priceMax ?? i.product.priceMin) * i.qty)}`
    ).join('\n')

    const cuerpo = `
NUEVO PEDIDO — Monstruo Taller
================================

PRODUCTOS:
${productosTexto}

Subtotal: ${fmt(subtotal)}
${couponApplied ? `Descuento (10%): -${fmt(discount)}\n` : ''}Envío: ${fmt(SHIPPING)}
TOTAL: ${fmt(total)}

Método de pago: ${payMethod.toUpperCase()}

--------------------------------
DATOS DE ENVÍO:

Nombre: ${form.nombre} ${form.apellido}
País: ${form.pais}
Dirección: ${form.direccion}${form.casa ? ` / ${form.casa}` : ''}
Ciudad: ${form.ciudad}
Departamento: ${form.departamento}
Teléfono: ${form.telefono}
================================
    `.trim()

    const mailtoUrl = `mailto:${STORE_EMAIL}?subject=${encodeURIComponent('Nuevo pedido — Monstruo Taller')}&body=${encodeURIComponent(cuerpo)}`
    window.location.href = mailtoUrl
    setSent(true)
    setShowThanks(true)
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>CHECK OUT</h1>
            <div className={styles.emptyCart}>
              <p>Tu carrito está vacío 🛒</p>
              <Link href="/tienda" className={styles.backLink}>← Ir a la tienda</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>CHECK OUT</h1>

          <div className={styles.grid}>

            {/* ── IZQUIERDA ── */}
            <div className={styles.formCol}>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Datos de envío</h2>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>País / Región*</label>
                  <select className={styles.select} value={form.pais} onChange={set('pais')}>
                    <option value="Colombia">Colombia</option>
                    <option value="México">México</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Nombre*</label>
                    <input className={styles.input} placeholder="Camilo" value={form.nombre} onChange={set('nombre')} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Apellido</label>
                    <input className={styles.input} placeholder="Ruiz" value={form.apellido} onChange={set('apellido')} />
                  </div>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Dirección*</label>
                  <input className={styles.input} placeholder="Calle 56 #78-09" value={form.direccion} onChange={set('direccion')} />
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Casa, apartamento, etc.</label>
                  <input className={styles.input} placeholder="Apto 301, Torre B..." value={form.casa} onChange={set('casa')} />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Ciudad*</label>
                    <input className={styles.input} placeholder="Ej: Bogotá" value={form.ciudad} onChange={set('ciudad')} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Departamento</label>
                    <input className={styles.input} placeholder="Ej: Cundinamarca" value={form.departamento} onChange={set('departamento')} />
                  </div>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Teléfono*</label>
                  <input className={styles.input} type="tel" placeholder="Ej: 300 123 4567" value={form.telefono} onChange={set('telefono')} />
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Método de pago</h2>
                <p className={styles.payNote}>
                  Selecciona cómo quieres pagar. Te contactaremos para coordinar el pago.
                </p>

                <div className={styles.payMethods}>
                  {(['tarjeta', 'pse', 'transferencia'] as const).map(m => (
                    <label key={m} className={`${styles.payMethod} ${payMethod === m ? styles.payMethodActive : ''}`}>
                      <input type="radio" name="pay" value={m} checked={payMethod === m}
                        onChange={() => setPayMethod(m)} className={styles.radio} />
                      {m === 'tarjeta' ? 'Tarjeta de Crédito' : m === 'pse' ? 'PSE' : 'Transferencia'}
                    </label>
                  ))}
                </div>

                <button className={styles.payBtn} onClick={handlePagar}>
                  {sent ? '✓ PEDIDO ENVIADO' : 'ENVIAR PEDIDO'}
                </button>

                {sent && (
                  <p className={styles.sentNote}>
                    Se abrió tu correo con el resumen del pedido. Envíalo y nos ponemos en contacto contigo pronto 🧡
                  </p>
                )}
              </section>

            </div>

            {/* ── DERECHA ── */}
            <div className={styles.summaryCol}>
              <div className={styles.summaryCard}>
                <h2 className={styles.sectionTitle}>Compra</h2>

                <div className={styles.itemsList}>
                  {items.map((item, idx) => (
                    <div key={idx} className={styles.orderItem}>
                      <div className={styles.orderImgWrap}>
                        <Image src={item.product.image} alt={item.product.name} fill className={styles.orderImg} />
                      </div>
                      <div className={styles.orderInfo}>
                        <p className={styles.orderName}>
                          {item.product.name.charAt(0) + item.product.name.slice(1).toLowerCase()}
                        </p>
                        <p className={styles.orderMeta}>Cantidad: {item.qty}</p>
                        {item.size && <p className={styles.orderMeta}>{item.size}</p>}
                      </div>
                      <div className={styles.orderRight}>
                        <p className={styles.orderPrice}>
                          {fmt((item.product.priceMax ?? item.product.priceMin) * item.qty)}
                        </p>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeItem(item.product.id, item.size)}
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.couponRow}>
                  <input className={`${styles.input} ${styles.couponInput}`}
                    placeholder="Codigo de descuento" value={form.coupon}
                    onChange={set('coupon')} />
                  <button className={styles.couponBtn}
                    onClick={() => form.coupon.length > 0 && setCouponApplied(true)}>
                    APLICAR
                  </button>
                </div>
                {couponApplied && <p className={styles.couponSuccess}>✓ Descuento del 10% aplicado</p>}

                <div className={styles.totals}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span><span>{fmt(subtotal)}</span>
                  </div>
                  <p className={styles.totalSub}>{items.reduce((a, i) => a + i.qty, 0)} artículo(s)</p>
                  {couponApplied && (
                    <div className={`${styles.totalRow} ${styles.discount}`}>
                      <span>Descuento</span><span>-{fmt(discount)}</span>
                    </div>
                  )}
                  <div className={styles.totalRow}>
                    <span>Envío</span><span>{fmt(SHIPPING)}</span>
                  </div>
                  <div className={styles.divider} />
                  <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                    <span>Total</span><span>{fmt(total)}</span>
                  </div>
                  <p className={styles.taxNote}>Incluye impuestos</p>
                </div>
              </div>

              <Link href="/tienda" className={styles.backLink}>← Seguir comprando</Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />

      {showThanks && (
        <div className={styles.thanksOverlay} onClick={() => setShowThanks(false)}>
          <div className={styles.thanksModal} onClick={e => e.stopPropagation()}>
            <button className={styles.thanksClose} onClick={() => setShowThanks(false)}>
              <X size={20} />
            </button>
            <h2 className={styles.thanksTitle}>GRACIAS POR TU COMPRA</h2>
            <p className={styles.thanksSubtitle}>
              Estamos preparando tu envío, pronto sabrás de nosotros
            </p>
            <div className={styles.thanksImgWrap}>
              <Image
                src="/conejos_monstruo.jpg"
                alt="Gracias"
                fill
                className={styles.thanksImg}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}