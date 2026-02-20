'use client'

import Link from 'next/link'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>

      {/* Manchas de fondo */}
      <div className={styles.shadowsWrap} aria-hidden="true">
        <img src="/shadows_white.png" alt="" className={styles.shadowWhite} />
        <img src="/shadows_black.png" alt="" className={styles.shadowBlack} />
      </div>

      {/* Textos de fondo — tus clases originales */}
      <span className={`${styles.bgText} ${styles.bgMon}`}>MONSTRUO</span>
      <span className={`${styles.bgText} ${styles.bgTall}`}>TALL</span>
      <span className={`${styles.bgText} ${styles.bger}`}>ER</span>

      {/* Corazón */}
      <div className={styles.heroImageContainer}>
        <img src="/corazonMonstruo.png" alt="Corazón Monstruo" className={styles.heartImg} />
      </div>

      {/* Textos inferiores */}
      <div className={styles.heroText}>
        <h2>LO LLAMAMOS MONSTRUO</h2>
        <h3>PORQUE ES IMAGINARIO...</h3>
        <p>Y NADIE SABE CÓMO ES</p>

        {/* Ojo + Pájaro */}
        <div className={styles.birdRow}>
          <img src="/ojoAbierto.png"  alt="Ojo"    className={styles.ojoImg} />
          <img src="/Aves4black.png"  alt="Pájaro" className={styles.birdImg} />
        </div>

        <div className={styles.ctaWrap}>
          <Link href="/tienda" className={styles.ctaBtn}>VER TIENDA</Link>
        </div>
      </div>

    </section>
  )
}