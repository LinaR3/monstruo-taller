'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const textRef1 = useRef<HTMLDivElement>(null)
  const textRef2 = useRef<HTMLDivElement>(null)
  const [text1Visible, setText1Visible] = useState(false)
  const [text2Visible, setText2Visible] = useState(false)
  const [isDark, setIsDark]             = useState(false)

  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
    checkTheme()
    const themeObs = new MutationObserver(checkTheme)
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Shadow scroll en body
    const featured = document.getElementById('cositas-nuevas')
    if (featured) {
      const shadowObs = new IntersectionObserver(
        ([e]) => document.body.classList.toggle('shadow-scroll', e.isIntersecting),
        { threshold: 0.05 }
      )
      shadowObs.observe(featured)
    }

    // Animaciones de texto al hacer scroll
    const textObs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.target === textRef1.current && e.isIntersecting) setText1Visible(true)
          if (e.target === textRef2.current && e.isIntersecting) setText2Visible(true)
        })
      },
      { threshold: 0.1 }
    )
    if (textRef1.current) textObs.observe(textRef1.current)
    if (textRef2.current) textObs.observe(textRef2.current)

    return () => { themeObs.disconnect(); textObs.disconnect() }
  }, [])

  const birdSrc = isDark ? '/Aves4black.png' : '/Aves4white.png'

  return (
    <section className={styles.hero}>

      {/* Textos de fondo absolutos */}
      <span className={`${styles.bgText} ${styles.bgTall}`}>TALL</span>
      <span className={`${styles.bgText} ${styles.bger}`}>ER</span>

      {/* MONSTRUO — en el flujo */}
      <h1 className={styles.mainTitle}>MONSTRUO</h1>

      {/* Corazón */}
      <div className={styles.heroImageContainer}>
        <img src="/corazonMonstruo.png" alt="Corazón Monstruo" className={styles.heartImg} />
      </div>

      {/* ── BLOQUE INFERIOR full-width ── */}
      <div className={styles.bottomBlock}>

        {/* Pájaro — full width, fondo */}
        <img src={birdSrc} alt="Pájaro" className={styles.birdImg} />

        {/* Texto 1 — top left, anima al scroll */}
        <div
          ref={textRef1}
          className={`${styles.textLine} ${styles.textTop} ${text1Visible ? styles.textVisible : ''}`}
        >
          <h2>LO LLAMAMOS MONSTRUO</h2>
          <h3>PORQUE ES IMAGINARIO...</h3>
        </div>

        {/* Ojo — centro izquierda */}
        <div className={styles.eyeWrap}>
          <img src="/ojoAbierto.png" alt="Ojo" className={styles.ojoImg} />
        </div>

        {/* Texto 2 — bottom left, anima al scroll */}
        <div
          ref={textRef2}
          className={`${styles.textLine} ${styles.textBottom} ${text2Visible ? styles.textVisible : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          <p>Y NADIE SABE CÓMO ES</p>
        </div>

        {/* CTA */}
        <div className={styles.ctaWrap}>
          <Link href="/tienda" className={styles.ctaBtn}>VER TIENDA</Link>
        </div>

      </div>
    </section>
  )
}