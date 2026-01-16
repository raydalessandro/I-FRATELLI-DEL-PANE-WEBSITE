import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Phone } from 'lucide-react';
import { Button, Input, Textarea } from '../ui';

interface ContactData {
  hero: {
    title: string;
    description: string;
  };
  info: {
    address: {
      street: string;
      cap: string;
      city: string;
      zone: string;
      note: string;
    };
    phone: string;
    email: string;
    whatsapp: string;
    hours: {
      store: string;
      deliveries: string;
    };
  };
  links: {
    googleMaps: string;
    googleBusiness: string;
    googleReviews: string;
  };
  form: {
    title: string;
    submitButton: string;
    successMessage: string;
  };
  mapEmbed: {
    lat: number;
    lng: number;
  };
}

export function AdminContact() {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/content/contact.json');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to load contact.json', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('contact_data', JSON.stringify(data));
    localStorage.setItem('contact_lastSaved', new Date().toISOString());
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-forno-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-granite-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-forno-100 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-forno-600" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-granite-950">
              Gestione Contatti
            </h2>
            <p className="text-sm text-granite-500">
              Modifica i contenuti della pagina Contatti
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          onClick={handleSave}
          isLoading={saving}
          disabled={saving}
        >
          <Save className="w-5 h-5" />
          {saved ? 'Salvato!' : 'Salva Modifiche'}
        </Button>
      </div>

      <div className="space-y-8">
        {/* Hero */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Sezione Hero
          </h3>
          <div className="space-y-4">
            <Input
              label="Titolo"
              value={data.hero.title}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
            />
            <Textarea
              label="Descrizione"
              value={data.hero.description}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
              rows={3}
            />
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Informazioni di Contatto
          </h3>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-granite-700">Indirizzo</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Via"
                  value={data.info.address.street}
                  onChange={(e) => setData({ ...data, info: { ...data.info, address: { ...data.info.address, street: e.target.value } } })}
                />
                <Input
                  label="CAP"
                  value={data.info.address.cap}
                  onChange={(e) => setData({ ...data, info: { ...data.info, address: { ...data.info.address, cap: e.target.value } } })}
                />
                <Input
                  label="Città"
                  value={data.info.address.city}
                  onChange={(e) => setData({ ...data, info: { ...data.info, address: { ...data.info.address, city: e.target.value } } })}
                />
                <Input
                  label="Zona"
                  value={data.info.address.zone}
                  onChange={(e) => setData({ ...data, info: { ...data.info, address: { ...data.info.address, zone: e.target.value } } })}
                />
              </div>
              <Input
                label="Nota"
                value={data.info.address.note}
                onChange={(e) => setData({ ...data, info: { ...data.info, address: { ...data.info.address, note: e.target.value } } })}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-granite-700">Contatti</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  label="Telefono"
                  value={data.info.phone}
                  onChange={(e) => setData({ ...data, info: { ...data.info, phone: e.target.value } })}
                />
                <Input
                  label="Email"
                  value={data.info.email}
                  onChange={(e) => setData({ ...data, info: { ...data.info, email: e.target.value } })}
                />
                <Input
                  label="WhatsApp URL"
                  value={data.info.whatsapp}
                  onChange={(e) => setData({ ...data, info: { ...data.info, whatsapp: e.target.value } })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-granite-700">Orari</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Orari Negozio"
                  value={data.info.hours.store}
                  onChange={(e) => setData({ ...data, info: { ...data.info, hours: { ...data.info.hours, store: e.target.value } } })}
                />
                <Input
                  label="Orari Consegne"
                  value={data.info.hours.deliveries}
                  onChange={(e) => setData({ ...data, info: { ...data.info, hours: { ...data.info.hours, deliveries: e.target.value } } })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Collegamenti
          </h3>
          <div className="space-y-4">
            <Input
              label="Google Maps"
              value={data.links.googleMaps}
              onChange={(e) => setData({ ...data, links: { ...data.links, googleMaps: e.target.value } })}
            />
            <Input
              label="Google Business"
              value={data.links.googleBusiness}
              onChange={(e) => setData({ ...data, links: { ...data.links, googleBusiness: e.target.value } })}
            />
            <Input
              label="Google Reviews"
              value={data.links.googleReviews}
              onChange={(e) => setData({ ...data, links: { ...data.links, googleReviews: e.target.value } })}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Form di Contatto
          </h3>
          <div className="space-y-4">
            <Input
              label="Titolo"
              value={data.form.title}
              onChange={(e) => setData({ ...data, form: { ...data.form, title: e.target.value } })}
            />
            <Input
              label="Testo Bottone"
              value={data.form.submitButton}
              onChange={(e) => setData({ ...data, form: { ...data.form, submitButton: e.target.value } })}
            />
            <Input
              label="Messaggio di Successo"
              value={data.form.successMessage}
              onChange={(e) => setData({ ...data, form: { ...data.form, successMessage: e.target.value } })}
            />
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Coordinate Mappa
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Latitudine"
              type="number"
              step="0.0001"
              value={data.mapEmbed.lat}
              onChange={(e) => setData({ ...data, mapEmbed: { ...data.mapEmbed, lat: parseFloat(e.target.value) } })}
            />
            <Input
              label="Longitudine"
              type="number"
              step="0.0001"
              value={data.mapEmbed.lng}
              onChange={(e) => setData({ ...data, mapEmbed: { ...data.mapEmbed, lng: parseFloat(e.target.value) } })}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
