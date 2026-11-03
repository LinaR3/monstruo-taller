'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import styles from './universo.module.css'

export default function RevealScope({ children }: { children: ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scope = scopeRef.current
    if (!scope || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = scope.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) return

    scope.classList.add(styles.revealReady)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-revealed', 'true')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return <div ref={scopeRef} className={styles.revealScope}>{children}</div>
}
