'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartContext'
import { formatPrice } from '@/lib/products'
import styles from './checkout.module.css'

const SHIPPING = 10000

export default function CheckoutPage() {
  const { items } = useCart()
  const router = useRouter()

  const [payMethod, setPayMethod] = useState<'tarjeta' | 'pse' | 'transferencia'>('tarjeta')
  const [form, setForm] = useState({
    pais: '', nombre: '', apellido: '', direccion: '',
    casa: '', ciudad: '', estado: '', telefono: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
    coupon: '',
  })
  const [couponApplied, setCouponApplied] = useState(false)

  const subtotal  = items.reduce((acc, i) => acc + i.product.priceMax! * i.qty || acc + i.product.priceMin * i.qty, 0)
  const discount  = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total     = subtotal - discount + (items.length > 0 ? SHIPPING : 0)

  const fmt = (n: number) => `$${n.toLocaleString('es-CO')} COP`
  const set  = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  // Si el carrito está vacío, mostrar mensaje
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

            {/* ── IZQUIERDA: formulario ── */}
            <div className={styles.formCol}>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Datos de envío</h2>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>País / Región*</label>
                  <select className={styles.select} value={form.pais} onChange={set('pais')}>
                    <option value="">Selecciona tu país</option>
                    <option value="CO">Colombia</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
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
                  <input className={styles.input} placeholder="Escribe tu dirección" value={form.casa} onChange={set('casa')} />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Ciudad*</label>
                    <input className={styles.input} placeholder="Ej: Bogotá" value={form.ciudad} onChange={set('ciudad')} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Estado</label>
                    <select className={styles.select} value={form.estado} onChange={set('estado')}>
                      <option value="">Seleccionar Estado</option>
                      <option>Cundinamarca</option>
                      <option>Antioquia</option>
                      <option>Valle del Cauca</option>
                      <option>Meta</option>
                    </select>
                  </div>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Teléfono*</label>
                  <input className={styles.input} type="tel" placeholder="Escribe tu teléfono" value={form.telefono} onChange={set('telefono')} />
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Pago</h2>

                <div className={styles.payMethods}>
                  {(['tarjeta', 'pse', 'transferencia'] as const).map(m => (
                    <label key={m} className={`${styles.payMethod} ${payMethod === m ? styles.payMethodActive : ''}`}>
                      <input type="radio" name="pay" value={m} checked={payMethod === m}
                        onChange={() => setPayMethod(m)} className={styles.radio} />
                      {m === 'tarjeta' ? 'Tarjeta de Crédito' : m.toUpperCase()}
                    </label>
                  ))}
                </div>

                {payMethod === 'tarjeta' && (
                  <div className={styles.cardFields}>
                    <div className={styles.fieldFull}>
                      <label className={styles.label}>Número de Tarjeta*</label>
                      <input className={styles.input} placeholder="Ej: 4567 1234 5678 9012" value={form.cardNumber} onChange={set('cardNumber')} maxLength={19} />
                    </div>
                    <div className={styles.fieldRow}>
                      <div className={styles.field}>
                        <label className={styles.label}>Fecha de Vencimiento*</label>
                        <input className={styles.input} placeholder="MM/AA" value={form.cardExpiry} onChange={set('cardExpiry')} maxLength={5} />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label}>Código de seguridad*</label>
                        <input className={styles.input} placeholder="···" value={form.cardCvc} onChange={set('cardCvc')} maxLength={4} />
                      </div>
                    </div>
                    <div className={styles.fieldFull}>
                      <label className={styles.label}>Nombre del titular*</label>
                      <input className={styles.input} placeholder="Ej: German Camilo Blanco" value={form.cardName} onChange={set('cardName')} />
                    </div>
                  </div>
                )}

                {payMethod === 'pse' && (
                  <p className={styles.payNote}>Serás redirigido al portal PSE para completar el pago.</p>
                )}

                {payMethod === 'transferencia' && (
                  <div className={styles.transferInfo}>
                    <p><strong>Banco:</strong> Bancolombia</p>
                    <p><strong>Cuenta:</strong> Ahorros 123-456789-00</p>
                    <p><strong>Titular:</strong> Monstruo Taller SAS</p>
                    <p><strong>NIT:</strong> 900.123.456-7</p>
                  </div>
                )}

                <button className={styles.payBtn}>PAGAR AHORA</button>
              </section>

            </div>

            {/* ── DERECHA: resumen ── */}
            <div className={styles.summaryCol}>
              <div className={styles.summaryCard}>
                <h2 className={styles.sectionTitle}>Compra</h2>

                {/* Lista de ítems reales del carrito */}
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
                      <p className={styles.orderPrice}>
                        {fmt((item.product.priceMax ?? item.product.priceMin) * item.qty)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Cupón */}
                <div className={styles.couponRow}>
                  <input className={`${styles.input} ${styles.couponInput}`}
                    placeholder="Codigo de descuento" value={form.coupon} onChange={set('coupon')} />
                  <button className={styles.couponBtn}
                    onClick={() => form.coupon.length > 0 && setCouponApplied(true)}>
                    APLICAR
                  </button>
                </div>
                {couponApplied && <p className={styles.couponSuccess}>✓ Descuento del 10% aplicado</p>}

                {/* Totales */}
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
    </>
  )
}