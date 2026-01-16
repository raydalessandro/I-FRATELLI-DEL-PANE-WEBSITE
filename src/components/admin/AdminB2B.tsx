import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Users } from 'lucide-react';
import { Button, Input, Textarea } from '../ui';

interface B2BData {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
  };
  benefits: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  advantages: string[];
  cta: {
    title: string;
    description: string;
    buttonWhatsapp: string;
    buttonPhone: string;
  };
  testimonials: Array<{
    quote: string;
    author: string;
    business: string;
  }>;
}

export function AdminB2B() {
  const [data, setData] = useState<B2BData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/content/b2b.json');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to load b2b.json', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage for now
    localStorage.setItem('b2b_data', JSON.stringify(data));
    localStorage.setItem('b2b_lastSaved', new Date().toISOString());

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addBenefit = () => {
    if (!data) return;
    setData({
      ...data,
      benefits: [...data.benefits, { title: '', description: '', icon: '✨' }],
    });
  };

  const removeBenefit = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      benefits: data.benefits.filter((_, i) => i !== index),
    });
  };

  const updateBenefit = (index: number, field: keyof B2BData['benefits'][0], value: string) => {
    if (!data) return;
    const newBenefits = [...data.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setData({ ...data, benefits: newBenefits });
  };

  const addAdvantage = () => {
    if (!data) return;
    setData({
      ...data,
      advantages: [...data.advantages, ''],
    });
  };

  const removeAdvantage = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      advantages: data.advantages.filter((_, i) => i !== index),
    });
  };

  const updateAdvantage = (index: number, value: string) => {
    if (!data) return;
    const newAdvantages = [...data.advantages];
    newAdvantages[index] = value;
    setData({ ...data, advantages: newAdvantages });
  };

  const addTestimonial = () => {
    if (!data) return;
    setData({
      ...data,
      testimonials: [...data.testimonials, { quote: '', author: '', business: '' }],
    });
  };

  const removeTestimonial = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      testimonials: data.testimonials.filter((_, i) => i !== index),
    });
  };

  const updateTestimonial = (index: number, field: keyof B2BData['testimonials'][0], value: string) => {
    if (!data) return;
    const newTestimonials = [...data.testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setData({ ...data, testimonials: newTestimonials });
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-forno-100 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-forno-600" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-granite-950">
              Gestione B2B
            </h2>
            <p className="text-sm text-granite-500">
              Modifica i contenuti della pagina Per Ristoranti
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
        {/* Hero Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Sezione Hero
          </h3>
          <div className="space-y-4">
            <Input
              label="Badge"
              value={data.hero.badge}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, badge: e.target.value } })}
            />
            <Input
              label="Titolo"
              value={data.hero.title}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
            />
            <Input
              label="Sottotitolo"
              value={data.hero.subtitle}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
            />
            <Textarea
              label="Descrizione"
              value={data.hero.description}
              onChange={(e) => setData({ ...data, hero: { ...data.hero, description: e.target.value } })}
              rows={3}
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-granite-950">
              Benefits
            </h3>
            <Button variant="ghost" size="sm" onClick={addBenefit}>
              <Plus className="w-4 h-4" />
              Aggiungi
            </Button>
          </div>
          <div className="space-y-4">
            {data.benefits.map((benefit, index) => (
              <div key={index} className="p-4 bg-farina-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-granite-600">Benefit {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBenefit(index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <Input
                    label="Icona (emoji)"
                    value={benefit.icon}
                    onChange={(e) => updateBenefit(index, 'icon', e.target.value)}
                  />
                  <Input
                    label="Titolo"
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                  />
                  <Input
                    label="Descrizione"
                    value={benefit.description}
                    onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advantages */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-granite-950">
              Vantaggi
            </h3>
            <Button variant="ghost" size="sm" onClick={addAdvantage}>
              <Plus className="w-4 h-4" />
              Aggiungi
            </Button>
          </div>
          <div className="space-y-3">
            {data.advantages.map((advantage, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={advantage}
                  onChange={(e) => updateAdvantage(index, e.target.value)}
                  placeholder="Scrivi un vantaggio..."
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAdvantage(index)}
                  className="text-red-600 hover:bg-red-50 flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Call to Action
          </h3>
          <div className="space-y-4">
            <Input
              label="Titolo"
              value={data.cta.title}
              onChange={(e) => setData({ ...data, cta: { ...data.cta, title: e.target.value } })}
            />
            <Textarea
              label="Descrizione"
              value={data.cta.description}
              onChange={(e) => setData({ ...data, cta: { ...data.cta, description: e.target.value } })}
              rows={3}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Testo Bottone WhatsApp"
                value={data.cta.buttonWhatsapp}
                onChange={(e) => setData({ ...data, cta: { ...data.cta, buttonWhatsapp: e.target.value } })}
              />
              <Input
                label="Testo Bottone Telefono"
                value={data.cta.buttonPhone}
                onChange={(e) => setData({ ...data, cta: { ...data.cta, buttonPhone: e.target.value } })}
              />
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-granite-950">
              Testimonials
            </h3>
            <Button variant="ghost" size="sm" onClick={addTestimonial}>
              <Plus className="w-4 h-4" />
              Aggiungi
            </Button>
          </div>
          <div className="space-y-4">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 bg-farina-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-granite-600">Testimonial {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTestimonial(index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  label="Quote"
                  value={testimonial.quote}
                  onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                  rows={2}
                />
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    label="Autore"
                    value={testimonial.author}
                    onChange={(e) => updateTestimonial(index, 'author', e.target.value)}
                  />
                  <Input
                    label="Business"
                    value={testimonial.business}
                    onChange={(e) => updateTestimonial(index, 'business', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
