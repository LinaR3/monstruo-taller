'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/components/CartContext'
import styles from './checkout.module.css'
import { Trash2 } from 'lucide-react'

const WHATSAPP_NUMBER = '573133314271'
const SHIPPING = 10000

export default function CheckoutPage() {
  const { items, removeItem } = useCart()

  const [payMethod, setPayMethod] = useState<'pse' | 'transferencia'>('pse')
  const [form, setForm] = useState({
    nombre: '', apellido: '', pais: 'Colombia',
    direccion: '', casa: '', ciudad: '',
    departamento: '', telefono: '', coupon: '',
  })
  const [couponApplied, setCouponApplied] = useState(false)

  const subtotal = items.reduce((acc, i) =>
    acc + i.price * i.qty, 0)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - discount + (items.length > 0 ? SHIPPING : 0)
  const fmt = (n: number) => `$${n.toLocaleString('es-CO')} COP`
  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))

  const handlePagar = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const productosTexto = items.map(i =>
      `• ${i.product.name.charAt(0) + i.product.name.slice(1).toLowerCase()}${i.size ? ` — ${i.size}` : ''} | Cantidad: ${i.qty} | Precio: ${fmt(i.price)} c/u | Total: ${fmt(i.price * i.qty)}`
    ).join('\n')

    const mensaje = `Hola, quiero hacer un pedido en Monstruo Taller 🧡

*DATOS DE ENVÍO*
Nombre: ${[form.nombre, form.apellido].filter(Boolean).join(' ')}
País / región: ${form.pais}
Dirección: ${form.direccion}${form.casa ? `, ${form.casa}` : ''}
Ciudad: ${form.ciudad}
Departamento: ${form.departamento || 'No especificado'}
Teléfono: ${form.telefono}

*PRODUCTOS*
${productosTexto}

Subtotal: ${fmt(subtotal)}
${couponApplied ? `Descuento (10%): -${fmt(discount)}\n` : ''}Envío: ${fmt(SHIPPING)}
*TOTAL: ${fmt(total)}*
Método de pago preferido: ${payMethod === 'pse' ? 'PSE' : 'Transferencia'}

Por favor, confírmame el pedido y los pasos para completar el pago.`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
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
            <form className={styles.formCol} onSubmit={handlePagar}>

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
                    <input className={styles.input} name="nombre" autoComplete="given-name" placeholder="Camilo" value={form.nombre} onChange={set('nombre')} required />
                  </div>
                  <div className={styles.field}>
                  <label className={styles.label}>Apellido*</label>
                    <input className={styles.input} name="apellido" autoComplete="family-name" placeholder="Ruiz" value={form.apellido} onChange={set('apellido')} required />
                  </div>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Dirección*</label>
                  <input className={styles.input} name="direccion" autoComplete="street-address" placeholder="Calle 56 #78-09" value={form.direccion} onChange={set('direccion')} required />
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Casa, apartamento, etc. (opcional)</label>
                  <input className={styles.input} name="casa" autoComplete="address-line2" placeholder="Apto 301, Torre B..." value={form.casa} onChange={set('casa')} />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Ciudad*</label>
                    <input className={styles.input} name="ciudad" autoComplete="address-level2" placeholder="Ej: Bogotá" value={form.ciudad} onChange={set('ciudad')} required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Departamento*</label>
                    <input className={styles.input} name="departamento" autoComplete="address-level1" placeholder="Ej: Cundinamarca" value={form.departamento} onChange={set('departamento')} required />
                  </div>
                </div>

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Teléfono*</label>
                  <input className={styles.input} name="telefono" autoComplete="tel" type="tel" placeholder="Ej: 300 123 4567" value={form.telefono} onChange={set('telefono')} required />
                </div>
              </section>

              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Método de pago</h2>
                <p className={styles.payNote}>
                  Selecciona cómo quieres pagar. El artista coordinará el pago contigo por WhatsApp.
                </p>

                <div className={styles.payMethods}>
                  {(['pse', 'transferencia'] as const).map(m => (
                    <label key={m} className={`${styles.payMethod} ${payMethod === m ? styles.payMethodActive : ''}`}>
                      <input type="radio" name="pay" value={m} checked={payMethod === m}
                        onChange={() => setPayMethod(m)} className={styles.radio} />
                      {m === 'pse' ? 'PSE' : 'Transferencia'}
                    </label>
                  ))}
                </div>

                <button className={styles.payBtn} type="submit">
                  CONTINUAR POR WHATSAPP
                </button>

                <p className={styles.whatsAppNote}>
                  Se abrirá WhatsApp con tu pedido listo. Revísalo y pulsa Enviar; el pedido queda confirmado cuando Monstruo Taller te responda.
                </p>
              </section>

            </form>

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
                          {fmt(item.price * item.qty)}
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

    </>
  )
}
