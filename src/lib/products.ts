export type Category = 'libretas' | 'camisetas' | 'prints' | 'totebags'

export interface Product {
  id: string
  name: string
  category: Category
  priceMin: number
  priceMax?: number
  image: string
}

export const products: Product[] = [
  // ─── LIBRETAS ───────────────────────────────────────────────
  { id: 'lib-foquiw-men',       name: 'FOQUIW MEN',       category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/foquiwMen.jpg' },
  { id: 'lib-la-facultad',      name: 'LA FACULTAD',      category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/laFacultad.jpg' },
  { id: 'lib-corazon-negro',    name: 'CORAZON NEGRO',    category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/corazonNegro.jpg' },
  { id: 'lib-pareja-libros',    name: 'PAREJA LIBROS',    category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/parejaLibros.jpg' },
  { id: 'lib-caminante-mar',    name: 'CAMINANTE MAR',    category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/caminanteMar.jpg' },
  { id: 'lib-ciervo',           name: 'CIERVO',           category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/ciervo.jpg' },
  { id: 'lib-mujer-habitacion', name: 'MUJER HABITACIÓN', category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/mujerHabitacion.jpg' },
  { id: 'lib-corazon-libreta',  name: 'CORAZÓN COLOR',    category: 'libretas',  priceMin: 20000, priceMax: 40000, image: '/products/libretas/corazonLibreta.jpg' },

  // ─── CAMISETAS ──────────────────────────────────────────────
  { id: 'cam-fuck-the-tomba',   name: 'FUCK THE TOMBA',  category: 'camisetas', priceMin: 50000, image: '/products/camisetas/fuckTheTomba.jpg' },
  { id: 'cam-sad-gatito',       name: 'SAD GATITO',      category: 'camisetas', priceMin: 50000, image: '/products/camisetas/sadGatito.jpg' },
  { id: 'cam-zorro-hippi',      name: 'ZORRO HIPPI',     category: 'camisetas', priceMin: 50000, image: '/products/camisetas/zorroHippi.jpg' },

  // ─── PRINTS ─────────────────────────────────────────────────
  { id: 'print-comic',          name: 'COMIC',           category: 'prints',    priceMin: 15000, image: '/products/prints/comicVidaPrint.jpg' },
  { id: 'print-corazon-color',  name: 'CORAZÓN COLOR',   category: 'prints',    priceMin: 15000, image: '/products/prints/hombre_que_camina.jpg' },
  { id: 'print-charlie',        name: 'CHARLIE',         category: 'prints',    priceMin: 15000, image: '/products/prints/comicVidaPrint.jpg' },
]

export const categoryLabels: Record<Category | 'all', string> = {
  all:       'TODITO',
  libretas:  'LIBRETAS',
  prints:    'PRINTS',
  camisetas: 'CAMISETAS',
  totebags:  'TOTEBAGS',
}

export function formatPrice(min: number, max?: number): string {
  const fmt = (n: number) => `$${n.toLocaleString('es-CO')}`
  return max ? `${fmt(min)} - ${fmt(max)}` : fmt(min)
}