import { motion } from 'framer-motion';
import { Wheat } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useSiteContent } from '../hooks/useContent';

export function AboutPage() {
  const { data: siteData, loading } = useSiteContent();

  if (loading || !siteData) {
    return (
      <div className="min-h-screen bg-farina-100 flex items-center justify-center">
        <div className="text-center">
          <Wheat className="w-16 h-16 text-granite-600 animate-pulse mx-auto mb-4" />
          <p className="text-granite-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  const { about } = siteData;

  return (
    <>
      <SEO
        title="Chi Siamo"
        description={about.intro}
        url="/chi-siamo"
      />

      <section className="pt-32 pb-16 bg-gradient-warm">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-granite-600/10 rounded-full text-granite-600 text-sm font-medium mb-6">
              <Wheat className="w-4 h-4" />
              La Nostra Storia
            </span>
            <h1 className="font-display text-display-lg text-granite-950 mb-6">{about.title}</h1>
            <p className="font-accent text-2xl text-granite-600 italic">{about.subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-2xl font-display text-granite-950 mb-8">{about.intro}</p>
              <div className="space-y-6 text-granite-600 leading-relaxed">
                {about.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="aspect-4/3 bg-gradient-to-br from-granite-100 to-granite-200 rounded-2xl flex items-center justify-center">
                <Wheat className="w-32 h-32 text-granite-300" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-granite-950 text-white rounded-2xl p-6">
                <p className="text-4xl font-display font-bold">45+</p>
                <p className="text-granite-400">Anni di esperienza</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section bg-farina-100">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-display-md text-granite-950 mb-4">I Nostri Valori</h2>
            <div className="divider-center" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {about.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-warm text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-granite-100 to-granite-200 rounded-2xl flex items-center justify-center">
                  <Wheat className="w-10 h-10 text-granite-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-granite-950 mb-3">{value.title}</h3>
                <p className="text-granite-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
