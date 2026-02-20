import Image from 'next/image'
import { Instagram, Mail, MessageCircle } from 'lucide-react'
import styles from './Footer.module.css'

const WHATSAPP_NUMBER = '573133314271'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.copy}>MonstrúoTaller · Derechos reservados</span>

        <div className={styles.logoWrap}>
          <Image
            src="/images/logo.png"
            alt="Monstruo Taller"
            width={60}
            height={45}
            className={styles.logo}
          />
        </div>

        <div className={styles.contact}>
          <span className={styles.contactLabel}>Contáctanos</span>
          <div className={styles.icons}>
            <a href="https://instagram.com/monstruotaller" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="mailto:hola@monstruotaller.com" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}