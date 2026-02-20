'use client'

import Link from 'next/link'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>

    

      {/* Textos de fondo */}
      <span className={`${styles.bgText} ${styles.bgMon}`}>MONSTRUO</span>
      <span className={`${styles.bgText} ${styles.bgTall}`}>TALL</span>
      <span className={`${styles.bgText} ${styles.bger}`}>ER</span>

      {/* Corazón */}
      <div className={styles.heroImageContainer}>
        <img src="/corazonMonstruo.png" alt="Corazón Monstruo" className={styles.heartImg} />
      </div>

      {/* Textos */}
      <div className={styles.heroText}>
        <h2>LO LLAMAMOS MONSTRUO</h2>
        <h3>PORQUE ES IMAGINARIO...</h3>
        <p>Y NADIE SABE CÓMO ES</p>
      </div>

      {/* Pájaro grande + ojo flotante a la izquierda */}
      <div className={styles.birdZone}>
        <img src="/ojoAbierto.png"  alt="Ojo"    className={styles.ojoImg} />
        <img src="/Aves4black.png"  alt="Pájaro" className={styles.birdImg} />
      </div>

      {/* CTA */}
      <div className={styles.ctaWrap}>
        <Link href="/tienda" className={styles.ctaBtn}>VER TIENDA</Link>
      </div>

    </section>
  )
}