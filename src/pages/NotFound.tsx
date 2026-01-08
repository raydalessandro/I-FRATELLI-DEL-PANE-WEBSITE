import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function NotFoundPage() {
  return (
    <>
      <SEO title="Pagina non trovata" noindex />

      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-warm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="text-9xl font-display font-bold text-granite-200 mb-4">
              404
            </div>
            <h1 className="font-display text-display-sm text-granite-950 mb-4">
              Pagina non trovata
            </h1>
            <p className="text-granite-600 mb-8">
              La pagina che stai cercando non esiste o è stata spostata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-primary">
                <Home className="w-5 h-5" />
                Torna alla Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-secondary"
              >
                <ArrowLeft className="w-5 h-5" />
                Torna Indietro
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
