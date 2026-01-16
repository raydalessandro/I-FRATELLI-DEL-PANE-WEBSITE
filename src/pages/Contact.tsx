import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { businessTypes } from '../data/site';
import { useContactContent } from '../hooks/useContent';
import { SEO } from '../components/SEO';
import { Button, Input, Textarea, Select, Checkbox } from '../components/ui';
import type { ContactFormData } from '../types';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  businessName: '',
  businessType: undefined,
  message: '',
  privacy: false,
};

export function ContactPage() {
  const { data: contactContent, loading } = useContactContent();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (loading || !contactContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-forno-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-granite-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Il telefono è obbligatorio';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    }

    if (!formData.privacy) {
      newErrors.privacy = 'Devi accettare la privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData(initialFormData);

    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <SEO
        title="Contatti"
        description="Contattaci per informazioni, preventivi o per ordinare il nostro pane artigianale. Siamo a Milano, zona Isola."
        url="/contatti"
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
              {contactContent.hero.title}
            </h1>
            <p className="text-xl text-granite-600">
              {contactContent.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-farina-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* WhatsApp CTA */}
              <div className="bg-whatsapp-500 text-white rounded-2xl p-6">
                <MessageCircle className="w-10 h-10 mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">
                  Risposte Rapide?
                </h3>
                <p className="text-white/90 mb-4">
                  Per risposte immediate, scrivici su WhatsApp.
                  Rispondiamo sempre entro poche ore.
                </p>
                <a
                  href={contactContent.info.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-whatsapp-600 px-5 py-2.5 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Apri WhatsApp
                </a>
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-2xl p-6 shadow-warm space-y-6">
                <h3 className="font-display text-xl font-semibold text-granite-950">
                  Dove Trovarci
                </h3>

                <div className="space-y-4">
                  <a
                    href={contactContent.links.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 text-granite-700 hover:text-granite-600 transition-colors"
                  >
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-granite-400" />
                    <div>
                      <p className="font-medium">{contactContent.info.address.street}</p>
                      <p>{contactContent.info.address.cap} {contactContent.info.address.city}</p>
                      <p className="text-sm text-granite-500">Zona {contactContent.info.address.zone}</p>
                      <p className="text-sm text-granite-500 mt-1">{contactContent.info.address.note}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${contactContent.info.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-4 text-granite-700 hover:text-granite-600 transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0 text-granite-400" />
                    <span className="font-medium">{contactContent.info.phone}</span>
                  </a>

                  <a
                    href={`mailto:${contactContent.info.email}`}
                    className="flex items-center gap-4 text-granite-700 hover:text-granite-600 transition-colors"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0 text-granite-400" />
                    <span className="font-medium">{contactContent.info.email}</span>
                  </a>
                </div>

                <hr className="border-granite-100" />

                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-granite-400" />
                    <div>
                      <p className="font-medium text-granite-950">Orari</p>
                      <p className="text-sm text-granite-600">{contactContent.info.hours.store}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-forno-400" />
                    <div>
                      <p className="font-medium text-granite-950">Consegne B2B</p>
                      <p className="text-sm text-granite-600">{contactContent.info.hours.deliveries}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl p-8 shadow-warm">
                <h3 className="font-display text-2xl font-semibold text-granite-950 mb-6">
                  {contactContent.form.title}
                </h3>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-display text-xl font-semibold text-granite-950 mb-2">
                      Messaggio Inviato!
                    </h4>
                    <p className="text-granite-600">
                      Ti risponderemo il prima possibile.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Nome e Cognome"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        autoComplete="name"
                      />
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        autoComplete="email"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <Input
                        label="Telefono"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                        autoComplete="tel"
                      />
                      <Input
                        label="Nome Locale (opzionale)"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        autoComplete="organization"
                      />
                    </div>

                    <Select
                      label="Tipo di Attività (opzionale)"
                      name="businessType"
                      value={formData.businessType || ''}
                      onChange={handleChange}
                      options={businessTypes}
                      placeholder="Seleziona..."
                    />

                    <Textarea
                      label="Messaggio"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                      required
                      placeholder="Descrivi le tue esigenze..."
                      rows={5}
                    />

                    <Checkbox
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleChange}
                      error={errors.privacy}
                      label={
                        <>
                          Accetto la{' '}
                          <a href="/privacy" className="text-granite-600 underline hover:no-underline">
                            Privacy Policy
                          </a>
                          {' '}e il trattamento dei miei dati. *
                        </>
                      }
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-5 h-5" />}
                      fullWidth
                    >
                      Invia Messaggio
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-granite-200">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.5!2d${contactContent.mapEmbed.lng}!3d${contactContent.mapEmbed.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI5JzI2LjIiTiA5wrAxMScxNC42IkU!5e0!3m2!1sit!2sit!4v1234567890`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mappa Il Pane dei Fratelli"
        />
      </section>
    </>
  );
}
