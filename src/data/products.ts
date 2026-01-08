import type { Product, ProductCategory, ProductCategoryInfo } from '../types';

// ============================================
// PRODUCT CATEGORIES
// ============================================

export const productCategories: ProductCategoryInfo[] = [
  {
    id: 'pani-classici',
    name: 'Pani Classici',
    description: 'I grandi classici della tradizione, perfetti per ogni tavola',
    icon: '🍞',
  },
  {
    id: 'pani-speciali',
    name: 'Pani Speciali',
    description: 'Varietà arricchite con cereali, semi e ingredienti selezionati',
    icon: '🌾',
  },
  {
    id: 'formati-ristorazione',
    name: 'Formati Ristorazione',
    description: 'Formati pensati per ristoranti, bar e locali',
    icon: '🍔',
  },
  {
    id: 'su-richiesta',
    name: 'Su Richiesta',
    description: 'Produzioni speciali su ordinazione',
    icon: '⭐',
  },
];

// ============================================
// PRODUCTS DATA
// Da aggiornare con i prodotti reali
// ============================================

export const initialProducts: Product[] = [
  // PANI CLASSICI
  {
    id: 'pagnotta-classica',
    name: 'Pagnotta Classica',
    slug: 'pagnotta-classica',
    category: 'pani-classici',
    description: 'La nostra pagnotta tradizionale da 1kg, con crosta croccante e mollica morbida. Preparata con lievito madre e 24 ore di lievitazione naturale. Il pane che ricorda quello della nonna.',
    shortDescription: 'Pagnotta tradizionale 1kg, crosta croccante, mollica soffice',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'kg',
    minOrder: 5,
    image: '/images/products/pagnotta-classica.jpg',
    available: true,
    featured: true,
    tags: ['lievito madre', 'tradizionale', 'classico'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'filone-tradizionale',
    name: 'Filone Tradizionale',
    slug: 'filone-tradizionale',
    category: 'pani-classici',
    description: 'Filone da 500g con crosta sottile e mollica compatta. Ideale per bruschette, accompagnamento e la tavola di tutti i giorni.',
    shortDescription: 'Filone 500g, crosta sottile, ideale per bruschette',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'pz',
    minOrder: 10,
    image: '/images/products/filone.jpg',
    available: true,
    featured: true,
    tags: ['tradizionale', 'bruschette'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'ciabatta-artigianale',
    name: 'Ciabatta Artigianale',
    slug: 'ciabatta-artigianale',
    category: 'pani-classici',
    description: 'Ciabatta dalla forma allungata con la caratteristica alveolatura aperta. Crosta sottile e croccante, interno morbido e leggero.',
    shortDescription: 'Ciabatta con alveolatura aperta, crosta croccante',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'pz',
    minOrder: 10,
    image: '/images/products/ciabatta.jpg',
    available: true,
    featured: false,
    tags: ['ciabatta', 'alveolatura'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },

  // PANI SPECIALI
  {
    id: 'pane-ai-cereali',
    name: 'Pane ai Cereali',
    slug: 'pane-ai-cereali',
    category: 'pani-speciali',
    description: 'Mix di cereali selezionati: avena, farro, orzo e semi di lino. Ricco di fibre e dal gusto rustico e nutriente.',
    shortDescription: 'Mix di cereali e semi, ricco di fibre',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'kg',
    minOrder: 3,
    image: '/images/products/cereali.jpg',
    available: true,
    featured: true,
    tags: ['cereali', 'integrale', 'fibre'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'pane-integrale',
    name: 'Pane Integrale',
    slug: 'pane-integrale',
    category: 'pani-speciali',
    description: 'Farina integrale macinata a pietra, lievitazione naturale prolungata. Gusto deciso e ricchezza nutrizionale.',
    shortDescription: 'Farina integrale macinata a pietra',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'kg',
    minOrder: 3,
    image: '/images/products/integrale.jpg',
    available: true,
    featured: false,
    tags: ['integrale', 'macinato a pietra'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },

  // FORMATI RISTORAZIONE
  {
    id: 'panini-hamburger',
    name: 'Panini Hamburger',
    slug: 'panini-hamburger',
    category: 'formati-ristorazione',
    description: 'Panini morbidi formato standard per hamburger. Superficie leggermente lucida, interno soffice. Perfetti per pub, hamburgerie e ristoranti.',
    shortDescription: 'Panini morbidi formato hamburger standard',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'pz',
    minOrder: 20,
    image: '/images/products/hamburger.jpg',
    available: true,
    featured: true,
    tags: ['hamburger', 'ristorazione', 'pub'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'panini-sandwich',
    name: 'Panini da Sandwich',
    slug: 'panini-sandwich',
    category: 'formati-ristorazione',
    description: 'Formato allungato ideale per sandwich e tramezzini. Mollica compatta che non si sbriciola, perfetta per farciture ricche.',
    shortDescription: 'Formato allungato per sandwich e tramezzini',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'pz',
    minOrder: 20,
    image: '/images/products/sandwich.jpg',
    available: true,
    featured: false,
    tags: ['sandwich', 'tramezzini', 'bar'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'michette-milanesi',
    name: 'Michette Milanesi',
    slug: 'michette-milanesi',
    category: 'formati-ristorazione',
    description: 'Le tipiche michette milanesi vuote all\'interno. Crosta croccante, interno vuoto ideale per essere farcito.',
    shortDescription: 'Michette tradizionali milanesi',
    price: null,
    priceNote: 'Prezzo su richiesta',
    unit: 'pz',
    minOrder: 30,
    image: '/images/products/michette.jpg',
    available: true,
    featured: false,
    tags: ['michette', 'milano', 'tradizionale'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },

  // SU RICHIESTA
  {
    id: 'pane-personalizzato',
    name: 'Pane Personalizzato',
    slug: 'pane-personalizzato',
    category: 'su-richiesta',
    description: 'Produzioni speciali su misura per le vostre esigenze. Formati, ingredienti e quantità personalizzabili. Contattateci per discutere il vostro progetto.',
    shortDescription: 'Produzioni speciali su misura',
    price: null,
    priceNote: 'Da concordare',
    unit: 'progetto',
    image: '/images/products/custom.jpg',
    available: true,
    featured: false,
    tags: ['personalizzato', 'su misura'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getProductsByCategory(products: Product[], category: ProductCategory): Product[] {
  return products.filter(p => p.category === category && p.available);
}

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.filter(p => p.featured && p.available);
}

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getCategoryInfo(categoryId: ProductCategory): ProductCategoryInfo | undefined {
  return productCategories.find(c => c.id === categoryId);
}

export function generateProductId(): string {
  return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function createProductSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
