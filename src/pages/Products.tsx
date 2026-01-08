import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wheat, Filter } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { productCategories } from '../data/products';
import { SEO } from '../components/SEO';
import type { ProductCategory } from '../types';

export function ProductsPage() {
  const { products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');

  const filteredProducts = activeCategory === 'all'
    ? products.filter(p => p.available)
    : products.filter(p => p.category === activeCategory && p.available);

  return (
    <>
      <SEO
        title="I Nostri Prodotti"
        description="Scopri la nostra gamma di pane artigianale: pani classici, speciali, e formati per la ristorazione. Lievito madre, farine selezionate."
        url="/prodotti"
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-warm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-display-lg text-granite-950 mb-6">
              I Nostri Prodotti
            </h1>
            <p className="text-xl text-granite-600">
              Ogni pane è fatto con lievito madre, farine selezionate e 24 ore di lievitazione naturale. 
              Scopri la nostra gamma pensata per la ristorazione.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-granite-100 sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            <span className="flex items-center gap-2 text-granite-500 text-sm mr-2">
              <Filter className="w-4 h-4" />
              Filtra:
            </span>
            <button
              onClick={() => setActiveCategory('all')}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${activeCategory === 'all'
                  ? 'bg-granite-600 text-white'
                  : 'bg-granite-100 text-granite-600 hover:bg-granite-200'
                }
              `}
            >
              Tutti
            </button>
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                  ${activeCategory === category.id
                    ? 'bg-granite-600 text-white'
                    : 'bg-granite-100 text-granite-600 hover:bg-granite-200'
                  }
                `}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section bg-farina-100">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-granite-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-granite-200 rounded w-1/3" />
                    <div className="h-6 bg-granite-200 rounded w-2/3" />
                    <div className="h-4 bg-granite-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300 group"
                  >
                    <div className="aspect-square bg-farina-200 overflow-hidden relative">
                      <div className="w-full h-full bg-gradient-to-br from-granite-100 to-granite-200 flex items-center justify-center">
                        <Wheat className="w-20 h-20 text-granite-300 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      {product.featured && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-forno-400 text-white text-xs font-medium rounded-full">
                          In Evidenza
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-granite-500 uppercase tracking-wider">
                        {productCategories.find(c => c.id === product.category)?.name}
                      </span>
                      <h2 className="font-display text-xl font-semibold text-granite-950 mt-1 mb-3">
                        {product.name}
                      </h2>
                      <p className="text-granite-600 text-sm mb-4 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-granite-100">
                        <span className="text-sm text-granite-500">
                          {product.priceNote || `€${product.price}/${product.unit}`}
                        </span>
                        {product.minOrder && (
                          <span className="text-xs text-granite-400">
                            Min. {product.minOrder} {product.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <Wheat className="w-16 h-16 text-granite-300 mx-auto mb-4" />
              <p className="text-granite-500">Nessun prodotto in questa categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-granite-950 text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-display-sm mb-4">
            Vuoi un Preventivo Personalizzato?
          </h2>
          <p className="text-granite-400 mb-8 max-w-xl mx-auto">
            Contattaci per ricevere un listino prezzi dedicato al tuo locale.
          </p>
          <a
            href="https://wa.me/393761446128?text=Ciao,%20vorrei%20un%20preventivo%20per%20il%20mio%20locale."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            Richiedi Preventivo
          </a>
        </div>
      </section>
    </>
  );
}
