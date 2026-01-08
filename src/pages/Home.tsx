import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Clock, Award, ChefHat, Wheat } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { siteConfig, heroContent, b2bContent } from '../data/site';
import { productCategories } from '../data/products';
import { SEO } from '../components/SEO';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function HomePage() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-warm" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-granite-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-forno-400/5 rounded-full blur-3xl" />
        
        {/* Wheat pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%238B6F47' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-granite-600/10 rounded-full text-granite-600 text-sm font-medium">
                  <Wheat className="w-4 h-4" />
                  Dal 1979
                </span>
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="font-display text-display-xl text-granite-950 mb-6"
              >
                {heroContent.title}
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="font-accent text-2xl md:text-3xl text-granite-600 italic mb-6"
              >
                {heroContent.subtitle}
              </motion.p>

              <motion.p 
                variants={fadeInUp}
                className="text-lg text-granite-700 mb-10 max-w-xl mx-auto lg:mx-0"
              >
                {heroContent.description}
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/prodotti"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Scopri i Prodotti
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/ristoranti"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Sei un Ristorante?
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image / Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-granite-600/20 to-transparent rounded-full blur-2xl" />
                
                {/* Logo */}
                <motion.img
                  src="/images/logo.jpg"
                  alt="Il Pane dei Fratelli - Logo"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-granite-400 flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-granite-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-display-md text-granite-950 mb-4">
              Perché Sceglierci
            </h2>
            <div className="divider-center" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wheat,
                title: 'Lievito Madre',
                description: 'Il nostro lievito madre ha più di 40 anni. Ogni giorno lo nutriamo con cura.',
              },
              {
                icon: Clock,
                title: '24 Ore di Lievitazione',
                description: 'Non esistono scorciatoie. I nostri impasti lievitano naturalmente per 24 ore.',
              },
              {
                icon: Truck,
                title: 'Consegne Puntuali',
                description: 'Ogni mattina, dalle 5:30, il pane fresco arriva nei locali di Milano.',
              },
              {
                icon: Award,
                title: 'Dal 1979',
                description: 'Oltre 40 anni di esperienza, la stessa passione del primo giorno.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-granite-100 rounded-2xl flex items-center justify-center text-granite-600">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-semibold text-granite-950 mb-3">
                  {feature.title}
                </h3>
                <p className="text-granite-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-farina-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
          >
            <div>
              <h2 className="font-display text-display-md text-granite-950 mb-4">
                I Nostri Prodotti
              </h2>
              <p className="text-granite-600 max-w-xl">
                Pane artigianale fatto come una volta. Ogni giorno, con la stessa cura.
              </p>
            </div>
            <Link
              to="/prodotti"
              className="btn-secondary"
            >
              Vedi Tutti
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300"
              >
                <div className="aspect-square bg-farina-200 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-granite-100 to-granite-200 flex items-center justify-center">
                    <Wheat className="w-16 h-16 text-granite-300" />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-xs text-granite-500 uppercase tracking-wider">
                    {productCategories.find(c => c.id === product.category)?.name}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-granite-950 mt-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-granite-600 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className="section bg-granite-950 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-forno-400 text-sm font-medium mb-6">
                <ChefHat className="w-4 h-4" />
                Per Professionisti
              </span>
              <h2 className="font-display text-display-md mb-6">
                {b2bContent.title}
              </h2>
              <p className="text-xl text-granite-300 mb-8">
                {b2bContent.intro}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {b2bContent.benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-granite-800 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                      <p className="text-sm text-granite-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/ristoranti"
                className="btn bg-forno-400 text-white hover:bg-forno-500 hover:-translate-y-0.5"
              >
                Scopri di Più
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Testimonials */}
              <div className="space-y-6">
                {b2bContent.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-granite-900 rounded-2xl p-6"
                  >
                    <p className="text-granite-300 italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-white">{testimonial.author}</p>
                      <p className="text-sm text-granite-500">{testimonial.business}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-warm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-display-md text-granite-950 mb-6">
              Vuoi Assaggiare la Differenza?
            </h2>
            <p className="text-xl text-granite-600 mb-10">
              Contattaci per un preventivo personalizzato o per richiedere una prova gratuita 
              dei nostri prodotti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-lg px-8 py-4"
              >
                Scrivici su WhatsApp
              </a>
              <Link
                to="/contatti"
                className="btn-secondary text-lg px-8 py-4"
              >
                Contattaci
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
