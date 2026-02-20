'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <span className={`${styles.bgText} ${styles.bgMon}`}>MONSTRUO</span>
      <span className={`${styles.bgText} ${styles.bgTal}`}>TAL</span>
      <span className={`${styles.bgText} ${styles.bgLer}`}>LER</span>

      <div className={styles.heroImageWrap}>
        <Image
          src="/corazonMonstruo.png"
          alt="Corazón Monstruo"
          width={900}
          height={700}
          className={styles.heroImg}
          priority
        />
      </div>

      <div className={styles.heroText}>
        <h2 className={styles.tagline1}>LO LLAMAMOS MONSTRUO</h2>

        <div className={styles.birdWrap}>
          <Image
            src="/Aves4white.png"
            alt="Pájaro"
            width={900}
            height={300}
            className={styles.bird}
          />
        </div>

        <h3 className={styles.tagline2}>PORQUE ES IMAGINARIO...</h3>
        <p className={styles.tagline3}>Y NADIE SABE CÓMO ES</p>
      </div>

      <div className={styles.ctaWrap}>
        <Link href="/tienda" className={styles.ctaBtn}>
          VER TIENDA
        </Link>
      </div>

      <div className={styles.shadowsBg} aria-hidden="true">
        <Image
          src="/shadows_black.png"
          alt=""
          fill
          className={styles.shadowsImg}
        />
      </div>
    </section>
  )
}