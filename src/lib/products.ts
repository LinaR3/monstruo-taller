export type Category = 'libretas' | 'camisetas' | 'prints' | 'totebags'

export interface Product {
  id: string
  name: string
  category: Category
  priceMin: number
  priceMax?: number
  image: string
  sizes?: string[]
  description?: string
}

export const products: Product[] = [
  // ─── LIBRETAS ───────────────────────────────────────────────
  {
    id: 'lib-foquiw-men', name: 'FOQUIW MEN', category: 'libretas',
    priceMin: 20000, priceMax: 40000, image: '/products/libretas/foquiwMen.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },
  {
    id: 'lib-la-facultad', name: 'LA FACULTAD', category: 'libretas',
    priceMin: 20000, priceMax: 40000,  image: '/products/libretas/laFacultad.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },
  {
    id: 'lib-corazon-negro', name: 'CORAZON NEGRO', category: 'libretas',
    priceMin: 20000, priceMax: 40000,  image: '/products/libretas/corazonNegro.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },
  {
    id: 'lib-pareja-libros', name: 'PAREJA LIBROS', category: 'libretas',
    priceMin: 20000, priceMax: 40000, image: '/products/libretas/parejaLibros.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },
  {
    id: 'lib-caminante-mar', name: 'CAMINANTE MAR', category: 'libretas',
    priceMin: 20000, priceMax: 40000,  image: '/products/libretas/caminanteMar.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },
  {
    id: 'lib-ciervo', name: 'CIERVO', category: 'libretas',
    priceMin: 20000, priceMax: 40000, image: '/products/libretas/ciervo.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },
  {
    id: 'lib-mujer-habitacion', name: 'MUJER HABITACIÓN', category: 'libretas',
    priceMin: 20000, priceMax: 40000,  image: '/products/libretas/mujerHabitacion.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },
  {
    id: 'lib-corazon-libreta', name: 'CORAZÓN COLOR', category: 'libretas',
    priceMin: 20000, priceMax: 40000, image: '/products/libretas/corazonLibreta.jpg',
    sizes: ['PEQUEÑA 14X10CM', 'GRANDE 21X15CM'],
    description: 'Libreta artesanal con ilustración original. Tapa dura, cosida a mano con amor en Colombia.',
  },

  // ─── CAMISETAS ──────────────────────────────────────────────
  {
    id: 'cam-fuck-the-tomba', name: 'FUCK THE TOMBA', category: 'camisetas',
    priceMin: 50000, image: '/products/camisetas/fuckTheTomba.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Camiseta 100% algodón con estampado original. Serigrafía hecha a mano en Colombia.',
  },
  {
    id: 'cam-sad-gatito', name: 'SAD GATITO', category: 'camisetas',
    priceMin: 50000, image: '/products/camisetas/sadGatito.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Camiseta 100% algodón con estampado original. Serigrafía hecha a mano en Colombia.',
  },
  {
    id: 'cam-zorro-hippi', name: 'ZORRO HIPPI', category: 'camisetas',
    priceMin: 50000, image: '/products/camisetas/zorroHippi.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Camiseta 100% algodón con estampado original. Serigrafía hecha a mano en Colombia.',
  },

  // ─── PRINTS ─────────────────────────────────────────────────
  {
    id: 'print-comic', name: 'COMIC', category: 'prints',
    priceMin: 15000, image: '/products/prints/comicVidaPrint.jpg',
    description: 'Print en papel de alta calidad. Ilustración original lista para enmarcar.',
  },
  {
    id: 'print-corazon-color', name: 'CORAZÓN COLOR', category: 'prints',
    priceMin: 15000, image: '/products/prints/hombre_que_camina.jpg',
    description: 'Print en papel de alta calidad. Ilustración original lista para enmarcar.',
  },
  {
    id: 'print-charlie', name: 'CHARLIE', category: 'prints',
    priceMin: 15000, image: '/products/prints/comicVidaPrint.jpg',
    description: 'Print en papel de alta calidad. Ilustración original lista para enmarcar.',
  },
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