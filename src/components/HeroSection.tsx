'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const textRef1 = useRef<HTMLDivElement>(null)
  const textRef2 = useRef<HTMLDivElement>(null)
  const [text1Visible, setText1Visible] = useState(false)
  const [text2Visible, setText2Visible] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const checkTheme = () => setIsDark(root.getAttribute('data-theme') === 'dark')
    const themeObserver = new MutationObserver(checkTheme)

    checkTheme()
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const featured = document.getElementById('cositas-nuevas')
    const shadowObserver = featured && 'IntersectionObserver' in window
      ? new IntersectionObserver(
          ([entry]) => document.body.classList.toggle('shadow-scroll', entry.isIntersecting),
          { threshold: 0.05 },
        )
      : null

    if (featured) shadowObserver?.observe(featured)

    let textObserver: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      textObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            if (entry.target === textRef1.current) setText1Visible(true)
            if (entry.target === textRef2.current) setText2Visible(true)
            textObserver?.unobserve(entry.target)
          })
        },
        { threshold: 0.1 },
      )
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !textObserver) {
      setText1Visible(true)
      setText2Visible(true)
    } else {
      if (textRef1.current) textObserver.observe(textRef1.current)
      if (textRef2.current) textObserver.observe(textRef2.current)
    }

    return () => {
      themeObserver.disconnect()
      shadowObserver?.disconnect()
      textObserver?.disconnect()
      document.body.classList.remove('shadow-scroll')
    }
  }, [])

  const birdSrc = isDark ? '/Aves4black.png' : '/Aves4white.png'

  return (
    <section className={styles.hero}>
      <span className={`${styles.bgText} ${styles.bgTextTop}`} aria-hidden="true">TALLER</span>
      <span className={`${styles.bgText} ${styles.bgTextBottom}`} aria-hidden="true">TALLER</span>

      <h1 className={styles.mainTitle}>MONSTRUO</h1>

      <div className={styles.heroImageContainer}>
        <img
          src="/corazonMonstruo.png"
          alt="Ilustración de un corazón monstruoso con flores"
          className={styles.heartImg}
        />
      </div>

      <div className={styles.bottomBlock}>
        <img src={birdSrc} alt="" className={styles.birdImg} />

        <div
          ref={textRef1}
          className={`${styles.textLine} ${styles.textTop} ${text1Visible ? styles.textVisible : ''}`}
        >
          <h2>LO LLAMAMOS MONSTRUO</h2>
          <h3>PORQUE ES IMAGINARIO...</h3>
        </div>

        <div className={styles.eyeWrap}>
          <img src="/ojoAbierto.png" alt="" className={styles.ojoImg} />
        </div>

        <div
          ref={textRef2}
          className={`${styles.textLine} ${styles.textBottom} ${text2Visible ? styles.textVisible : ''}`}
        >
          <p>Y NADIE SABE CÓMO ES</p>
        </div>

      </div>
    </section>
  )
}
