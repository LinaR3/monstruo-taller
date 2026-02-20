'use client'

import { useState, useMemo, Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'
import { products, categoryLabels, type Category } from '@/lib/products'
import styles from './tienda.module.css'

type Filter = Category | 'all'
const filterKeys: Filter[] = ['all', 'libretas', 'prints', 'camisetas', 'totebags']

function TiendaContent() {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  // Sincroniza con el parámetro ?cat= cada vez que cambia la URL
  useEffect(() => {
    const cat = searchParams.get('cat') as Filter
    setActiveFilter(cat && filterKeys.includes(cat) ? cat : 'all')
  }, [searchParams])

  const filtered = useMemo(
    () => activeFilter === 'all'
      ? products
      : products.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  const sectionTitle = activeFilter === 'all' ? 'TIENDA' : categoryLabels[activeFilter]

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>

          <h1 className={styles.title}>{sectionTitle}</h1>

          {/* Filtros */}
          <div className={styles.filtersRow}>
            <span className={styles.filterLabel}>Filtrar por categoría</span>
            <div className={styles.filters}>
              {filterKeys.map(key => (
                <button
                  key={key}
                  className={`${styles.filterBtn} ${activeFilter === key ? styles.active : ''}`}
                  onClick={() => setActiveFilter(key)}
                >
                  {categoryLabels[key]}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className={styles.empty}>No hay productos en esta categoría aún 🌱</p>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}

export default function TiendaPage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '120px', textAlign: 'center' }}>Cargando...</div>}>
      <TiendaContent />
    </Suspense>
  )
}