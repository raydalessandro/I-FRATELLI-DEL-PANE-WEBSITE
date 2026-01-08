# Il Pane dei Fratelli - Website

Sito web del panificio **Il Pane dei Fratelli**, Milano.

## 🚀 Quick Start

```bash
# Installa dipendenze
npm install

# Avvia in development
npm run dev

# Build per produzione
npm run build

# Preview build
npm run preview
```

## 📁 Struttura

```
src/
├── components/       # Componenti React
│   ├── layout/      # Header, Footer, WhatsApp
│   ├── ui/          # Button, Input, Card...
│   └── SEO.tsx      # Meta tags
├── pages/           # Pagine
├── context/         # ProductsContext (stato prodotti)
├── data/            # Dati statici (site.ts, products.ts)
├── styles/          # CSS globale
├── types/           # TypeScript types
└── main.tsx         # Entry point
```

## 🔑 Admin Panel

Accedi a `/admin` per gestire i prodotti.

**Password di default:** `pane2024`

⚠️ In produzione, implementare autenticazione vera (Supabase, Firebase, etc.)

## 📱 Funzionalità

- ✅ **SEO ottimizzato** - Meta tags, Schema.org, Open Graph
- ✅ **Performance** - Lighthouse 90+ target
- ✅ **Responsive** - Mobile-first design
- ✅ **Admin Panel** - Gestione prodotti in localStorage
- ✅ **WhatsApp** - Bottone floating con tracking
- ✅ **TypeScript** - Type safety completa
- ✅ **Accessibilità** - WCAG 2.1 AA

## 🎨 Design System

- **Font Display:** Playfair Display
- **Font Body:** Source Sans 3
- **Colori:** Granite (#1A1A1A), Marrone Pane (#8B6F47), Crema (#FAF7F2)

## 📦 Deploy

Il sito è pronto per deploy su:
- Vercel
- Netlify
- Cloudflare Pages

```bash
npm run build
# Output in /dist
```

## 📞 Contatti

- **WhatsApp:** +39 376 144 6128
- **Email:** info@ilpanedeifratelli.it

---

Sviluppato con ❤️ per I Fratelli del Pane
