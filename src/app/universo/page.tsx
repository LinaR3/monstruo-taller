import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Instagram, MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RevealScope from './RevealScope'
import styles from './universo.module.css'

export const metadata: Metadata = {
  title: 'Nuestro universo | Monstruo Taller',
  description: 'Conoce el trabajo de Monstruo Taller, MuN Ilustra y MuN Tatux: dibujos, murales, objetos y tatuajes.',
}

const WHATSAPP_NUMBER = '573133314271'
const whatsappUrl = (message: string) =>
  'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message)

type WorkSample = {
  src: string
  alt: string
  label: string
  href: string
  external?: boolean
}

const workshopSamples: WorkSample[] = [
  {
    src: '/products/libretas/laFacultad.jpg',
    alt: 'Libreta ilustrada La Facultad, sostenida entre las manos',
    label: 'LIBRETA · LA FACULTAD',
    href: '/tienda?cat=libretas',
  },
  {
    src: '/products/libretas/corazonLibreta.jpg',
    alt: 'Libreta con una ilustración anatómica de un corazón',
    label: 'LIBRETA · CORAZÓN',
    href: '/tienda?cat=libretas',
  },
  {
    src: '/products/libretas/foquiwMen.jpg',
    alt: 'Libreta Foquiw Men con una ilustración en tinta negra',
    label: 'LIBRETA · FOQUIW MEN',
    href: '/tienda?cat=libretas',
  },
]

const illustrationSamples: WorkSample[] = [
  {
    src: '/universo/mural-afrosamurai.jpg',
    alt: 'Mural colorido de Afrosamurai pintado sobre una pared',
    label: 'MURAL · AFROSAMURAI',
    href: 'https://www.instagram.com/p/DdlvhOIkflg/',
    external: true,
  },
  {
    src: '/universo/pintura-azul.jpg',
    alt: 'Pintura de una figura azul sobre papel',
    label: 'PINTURA · FIGURA AZUL',
    href: 'https://www.instagram.com/reel/Dcl3zAZxHyL/',
    external: true,
  },
]

const tattooSamples: WorkSample[] = [
  {
    src: '/universo/tatuaje-criaturas.jpg',
    alt: 'Dos pequeñas criaturas tatuadas en el brazo',
    label: 'TATUAJE · CRIATURAS',
    href: 'https://www.instagram.com/p/DEdIn0Op9IW/',
    external: true,
  },
  {
    src: '/universo/tatuaje-mariposa.jpg',
    alt: 'Tatuaje de una mariposa con una luna y pequeñas estrellas',
    label: 'TATUAJE · MARIPOSA LUNAR',
    href: 'https://www.instagram.com/p/DJ4g2xHgWrJ/',
    external: true,
  },
  {
    src: '/universo/tatuaje-rata-pintora.jpg',
    alt: 'Tatuaje de una rata artista sentada frente a un caballete',
    label: 'TATUAJE · RATA PINTORA',
    href: 'https://www.instagram.com/p/DMQda7OgWWH/',
    external: true,
  },
]

function Gallery({ samples, className }: { samples: WorkSample[]; className: string }) {
  return (
    <div className={className}>
      {samples.map((sample) => {
        const card = (
          <span className={styles.sampleCard}>
            <Image
              src={sample.src}
              alt={sample.alt}
              fill
              sizes="(max-width: 680px) 84vw, (max-width: 1050px) 42vw, 28vw"
              className={styles.sampleImage}
            />
            <span className={styles.sampleCaption}>
              <span>{sample.label}</span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </span>
        )

        return sample.external ? (
          <a
            key={sample.src}
            href={sample.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.sampleLink}
            data-reveal
            aria-label={'Ver en Instagram: ' + sample.label}
          >
            {card}
          </a>
        ) : (
          <Link
            key={sample.src}
            href={sample.href}
            className={styles.sampleLink}
            data-reveal
            aria-label={'Ver en la tienda: ' + sample.label}
          >
            {card}
          </Link>
        )
      })}
    </div>
  )
}

type ChapterProps = {
  id: string
  number: string
  descriptor: string
  handle: string
  profileUrl: string
  title: string
  description: string
  message: string
  samples: WorkSample[]
  galleryClassName: string
  reverse?: boolean
  shopLink?: boolean
}

function Chapter({
  id,
  number,
  descriptor,
  handle,
  profileUrl,
  title,
  description,
  message,
  samples,
  galleryClassName,
  reverse = false,
  shopLink = false,
}: ChapterProps) {
  return (
    <section
      id={id}
      className={styles.chapter + (reverse ? ' ' + styles.chapterReverse : '')}
      aria-labelledby={id + '-title'}
    >
      <div className={styles.chapterCopy} data-reveal>
        <p className={styles.chapterNumber}>{number} <span>·</span> {descriptor}</p>
        <a className={styles.handle} href={profileUrl} target="_blank" rel="noopener noreferrer">
          <Instagram size={16} aria-hidden="true" />
          {handle}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <h2 id={id + '-title'} className={styles.chapterTitle}>{title}</h2>
        <p className={styles.chapterDescription}>{description}</p>
        <div className={styles.chapterActions}>
          {shopLink && (
            <Link href="/tienda" className={styles.shopLink}>
              Explorar la tienda <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
          <a
            className={styles.whatsappLink}
            href={whatsappUrl(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Escribir por WhatsApp
          </a>
        </div>
      </div>
      <Gallery samples={samples} className={galleryClassName} />
    </section>
  )
}

export default function UniversoPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <RevealScope>
          <header className={styles.intro}>
            <p className={styles.overline}>MONSTRUO TALLER <span>·</span> BITÁCORA VISUAL</p>
            <div className={styles.titleFlow}>
              <Image
                src="/Aves4white.png"
                alt=""
                aria-hidden="true"
                width={2953}
                height={2586}
                priority
                className={styles.birdShape}
              />
              <h1 className={styles.title}>UN UNIVERSO QUE SE EXPANDE</h1>
              <p className={styles.introText}>
                En monstruo creemos que la vida merece un espacio propio donde resguardarse,
                es por eso que creamos pequeños cajoncitos de papel, donde habitan el presente,
                el pasado y el futuro, te invitamos a conocer lo que aquí se gesta.
              </p>
            </div>
            <nav className={styles.chapterNav} aria-label="Explorar las prácticas artísticas">
              <a href="#taller"><span>01</span> Taller</a>
              <a href="#ilustra"><span>02</span> Ilustra</a>
              <a href="#tatux"><span>03</span> Tatuajes</a>
            </nav>
          </header>

          <div className={styles.chapters}>
            <Chapter
              id="taller"
              number="01"
              descriptor="OBJETOS E ILUSTRACIÓN"
              handle="@monstruo.taller"
              profileUrl="https://www.instagram.com/monstruo.taller/"
              title="Libretas"
              description="Cada pieza comienza con una ilustración y se convierte en la mejor compañía para pintar, escribir, dibujar y más."
              message="Hola, vi el universo de Monstruo Taller y quisiera preguntar por sus libretas y productos."
              samples={workshopSamples}
              galleryClassName={styles.gallery + ' ' + styles.workshopGallery}
              shopLink
            />
            <Chapter
              id="ilustra"
              number="02"
              descriptor="PINTURA Y MURALES"
              handle="@mun.ilustra"
              profileUrl="https://www.instagram.com/mun.ilustra/"
              title="Imaginación a gran escala."
              description="Ilustraciones, pintura y murales que llevan personajes y color a nuevos espacios. Aquí el dibujo también se sale del cuaderno."
              message="Hola, vi el trabajo de MuN Ilustra y quisiera conversar sobre un mural o proyecto de ilustración."
              samples={illustrationSamples}
              galleryClassName={styles.gallery + ' ' + styles.illustrationGallery}
              reverse
            />
            <Chapter
              id="tatux"
              number="03"
              descriptor="TINTA EN LA PIEL"
              handle="@mun.tatux"
              profileUrl="https://www.instagram.com/mun.tatux/"
              title="Dibujos que se quedan contigo."
              description="Tatuajes blackwork nacidos de ilustraciones, criaturas y pequeños mundos para llevar en la piel."
              message="Hola, vi el trabajo de MuN Tatux y quisiera consultar por un tatuaje."
              samples={tattooSamples}
              galleryClassName={styles.gallery + ' ' + styles.tattooGallery}
            />
          </div>

          <div className={styles.closing} data-reveal>
            <p>UNA MISMA IMAGINACIÓN. MUCHAS FORMAS DE CREAR.</p>
            <Link href="/tienda" className={styles.closingLink}>
              Seguir explorando <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </RevealScope>
      </main>
      <Footer />
    </>
  )
}
