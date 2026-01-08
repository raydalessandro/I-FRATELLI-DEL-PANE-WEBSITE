import type { NavItem, BusinessType } from '../types';

// ============================================
// SITE CONFIGURATION
// ============================================

export const siteConfig = {
  name: 'Il Pane dei Fratelli',
  tagline: 'Pane fresco, passione antica',
  description: 'Panificio artigianale a Milano, zona Isola. Forniture pane fresco per ristoranti, bar e locali. Lievito madre, metodi tradizionali dal 1979.',
  foundingYear: 1979,
  
  // Contact
  phone: '+39 376 144 6128',
  phoneClean: '393761446128',
  email: 'info@ilpanedeifratelli.it',
  whatsapp: 'https://wa.me/393761446128',
  whatsappMessage: 'Ciao, vorrei informazioni sui vostri prodotti.',
  
  // Address
  address: {
    street: 'Via Example 123',
    city: 'Milano',
    province: 'MI',
    cap: '20100',
    zone: 'Isola',
    country: 'Italia',
    full: 'Via Example 123, 20100 Milano MI',
    coordinates: {
      lat: 45.4906,
      lng: 9.1874,
    },
  },
  
  // Opening Hours
  hours: {
    weekdays: '06:00 - 20:00',
    saturday: '06:00 - 20:00',
    sunday: 'Chiuso',
    deliveries: '05:30 - 08:00',
  },
  
  // Social
  social: {
    instagram: 'https://instagram.com/ilpanedeifratelli',
    facebook: 'https://facebook.com/ilpanedeifratelli',
    googleMaps: 'https://maps.google.com/?q=Il+Pane+dei+Fratelli+Milano',
  },
  
  // URLs
  url: 'https://ilpanedeifratelli.it',
  
  // SEO
  seo: {
    titleTemplate: '%s | Il Pane dei Fratelli',
    defaultTitle: 'Il Pane dei Fratelli | Panificio Artigianale Milano',
    defaultDescription: 'Panificio artigianale a Milano, zona Isola. Forniture pane fresco per ristoranti, bar e locali. Lievito madre, metodi tradizionali dal 1979.',
    defaultImage: '/og-image.jpg',
  },
};

// ============================================
// NAVIGATION
// ============================================

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Prodotti', href: '/prodotti' },
  { label: 'Per Ristoranti', href: '/ristoranti' },
  { label: 'Contatti', href: '/contatti' },
];

export const footerNavigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Chi Siamo', href: '/chi-siamo' },
    { label: 'Prodotti', href: '/prodotti' },
    { label: 'Per Ristoranti', href: '/ristoranti' },
    { label: 'Contatti', href: '/contatti' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookie' },
  ],
};

// ============================================
// BUSINESS TYPES
// ============================================

export const businessTypes: { value: BusinessType; label: string }[] = [
  { value: 'ristorante', label: 'Ristorante' },
  { value: 'bar', label: 'Bar / Caffetteria' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'mensa', label: 'Mensa / Catering Aziendale' },
  { value: 'catering', label: 'Catering / Eventi' },
  { value: 'altro', label: 'Altro' },
];

// ============================================
// CONTENT
// ============================================

export const heroContent = {
  title: 'Il Pane dei Fratelli',
  subtitle: 'Pane fresco, passione antica',
  description: 'Dal 1979 portiamo sulle tavole di Milano il pane fatto come una volta. Lievito madre, farine selezionate, e la passione di chi ama il proprio mestiere.',
  cta: {
    primary: { label: 'Scopri i Prodotti', href: '/prodotti' },
    secondary: { label: 'Contattaci', href: '/contatti' },
  },
};

export const aboutContent = {
  title: 'La Nostra Storia',
  subtitle: 'Uomini di granite, cuore di lievito',
  intro: 'Siamo I Fratelli del Pane. Non facciamo pane. Siamo pane.',
  story: [
    'Dal 1979, ogni mattina prima dell\'alba, accendiamo il forno. Lo stesso gesto, la stessa dedizione, lo stesso rispetto per un\'arte che si tramanda.',
    'Non siamo diventati fornai per caso. Siamo cresciuti con le mani nella farina, osservando i gesti di chi ci ha preceduto. Abbiamo imparato che il pane buono richiede tempo, pazienza, e quella che chiamiamo "l\'attesa giusta".',
    'Oggi forniamo ristoranti, bar e locali in tutta Milano. Ma l\'approccio non è cambiato: ogni pane che esce dal nostro forno porta con sé la stessa cura del primo giorno.',
  ],
  values: [
    {
      title: 'Lievito Madre',
      description: 'Il nostro lievito madre ha più di 40 anni. Ogni giorno lo nutriamo, lo curiamo, lo rispettiamo. È il cuore di ogni nostro pane.',
      icon: '🌾',
    },
    {
      title: 'Tempo',
      description: 'Non esistono scorciatoie. I nostri impasti lievitano per 24 ore. Il tempo è il nostro ingrediente segreto.',
      icon: '⏰',
    },
    {
      title: 'Mani',
      description: 'Ogni pane passa per le nostre mani. La tecnologia aiuta, ma sono le mani che fanno la differenza.',
      icon: '🤲',
    },
  ],
};

export const b2bContent = {
  title: 'Per Ristoranti e Locali',
  subtitle: 'Il tuo fornitore di fiducia',
  intro: 'Cerchi un fornitore di pane affidabile? Siamo qui per questo.',
  benefits: [
    {
      title: 'Consegne Puntuali',
      description: 'Ogni mattina, dalle 5:30 alle 8:00, il pane fresco arriva da te. Sempre.',
      icon: '🚚',
    },
    {
      title: 'Qualità Costante',
      description: 'Stesso pane, stessa qualità, ogni giorno. Senza sorprese.',
      icon: '✓',
    },
    {
      title: 'Prezzi Dedicati',
      description: 'Listino riservato per i professionisti. Più ordini, più risparmi.',
      icon: '💰',
    },
    {
      title: 'Flessibilità',
      description: 'Ordini personalizzati, formati su misura, produzioni speciali.',
      icon: '🎯',
    },
  ],
  cta: 'Richiedi un Preventivo',
  testimonials: [
    {
      quote: 'Puntualità e qualità. Non ho mai avuto un problema in 3 anni.',
      author: 'Marco R.',
      business: 'Ristorante zona Porta Romana',
    },
    {
      quote: 'I clienti notano la differenza. Il pane è parte dell\'esperienza.',
      author: 'Laura B.',
      business: 'Boutique Hotel Milano Centro',
    },
  ],
};

export const contactContent = {
  title: 'Contattaci',
  subtitle: 'Siamo qui per te',
  intro: 'Hai domande? Vuoi un preventivo? Scrivici o chiamaci, rispondiamo sempre.',
  formTitle: 'Inviaci un Messaggio',
  whatsappNote: 'Per risposte più rapide, scrivici su WhatsApp.',
};
