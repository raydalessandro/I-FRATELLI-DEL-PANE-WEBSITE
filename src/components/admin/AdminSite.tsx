import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Settings, Plus, Trash2 } from 'lucide-react';
import { Button, Input, Textarea } from '../ui';

interface SiteData {
  meta: {
    siteTitle: string;
    siteDescription: string;
    ogImage: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  about: {
    title: string;
    subtitle: string;
    intro: string;
    story: string[];
    values: Array<{
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    buttonWhatsapp: string;
    buttonContact: string;
  };
}

export function AdminSite() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/content/site.json');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to load site.json', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.setItem('site_data', JSON.stringify(data));
    localStorage.setItem('site_lastSaved', new Date().toISOString());
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addFeature = () => {
    if (!data) return;
    setData({
      ...data,
      features: [...data.features, { title: '', description: '' }],
    });
  };

  const removeFeature = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      features: data.features.filter((_, i) => i !== index),
    });
  };

  const updateFeature = (index: number, field: keyof SiteData['features'][0], value: string) => {
    if (!data) return;
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setData({ ...data, features: newFeatures });
  };

  const addStoryParagraph = () => {
    if (!data) return;
    setData({
      ...data,
      about: { ...data.about, story: [...data.about.story, ''] },
    });
  };

  const removeStoryParagraph = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      about: { ...data.about, story: data.about.story.filter((_, i) => i !== index) },
    });
  };

  const updateStoryParagraph = (index: number, value: string) => {
    if (!data) return;
    const newStory = [...data.about.story];
    newStory[index] = value;
    setData({ ...data, about: { ...data.about, story: newStory } });
  };

  const addValue = () => {
    if (!data) return;
    setData({
      ...data,
      about: { ...data.about, values: [...data.about.values, { title: '', description: '' }] },
    });
  };

  const removeValue = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      about: { ...data.about, values: data.about.values.filter((_, i) => i !== index) },
    });
  };

  const updateValue = (index: number, field: keyof SiteData['about']['values'][0], value: string) => {
    if (!data) return;
    const newValues = [...data.about.values];
    newValues[index] = { ...newValues[index], [field]: value };
    setData({ ...data, about: { ...data.about, values: newValues } });
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
            <Settings className="w-6 h-6 text-forno-600" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-granite-950">
              Gestione Sito
            </h2>
            <p className="text-sm text-granite-500">
              Modifica i contenuti generali del sito
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
        {/* Meta */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Meta Tags
          </h3>
          <div className="space-y-4">
            <Input
              label="Titolo Sito"
              value={data.meta.siteTitle}
              onChange={(e) => setData({ ...data, meta: { ...data.meta, siteTitle: e.target.value } })}
            />
            <Textarea
              label="Descrizione Sito"
              value={data.meta.siteDescription}
              onChange={(e) => setData({ ...data, meta: { ...data.meta, siteDescription: e.target.value } })}
              rows={3}
            />
            <Input
              label="OG Image"
              value={data.meta.ogImage}
              onChange={(e) => setData({ ...data, meta: { ...data.meta, ogImage: e.target.value } })}
            />
          </div>
        </div>

        {/* Hero */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Hero Homepage
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
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="CTA Primario"
                value={data.hero.ctaPrimary}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaPrimary: e.target.value } })}
              />
              <Input
                label="CTA Secondario"
                value={data.hero.ctaSecondary}
                onChange={(e) => setData({ ...data, hero: { ...data.hero, ctaSecondary: e.target.value } })}
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-granite-950">
              Features
            </h3>
            <Button variant="ghost" size="sm" onClick={addFeature}>
              <Plus className="w-4 h-4" />
              Aggiungi
            </Button>
          </div>
          <div className="space-y-4">
            {data.features.map((feature, index) => (
              <div key={index} className="p-4 bg-farina-50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-granite-600">Feature {index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <Input
                    label="Titolo"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, 'title', e.target.value)}
                  />
                  <Input
                    label="Descrizione"
                    value={feature.description}
                    onChange={(e) => updateFeature(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            Sezione About
          </h3>
          <div className="space-y-6">
            <Input
              label="Titolo"
              value={data.about.title}
              onChange={(e) => setData({ ...data, about: { ...data.about, title: e.target.value } })}
            />
            <Input
              label="Sottotitolo"
              value={data.about.subtitle}
              onChange={(e) => setData({ ...data, about: { ...data.about, subtitle: e.target.value } })}
            />
            <Textarea
              label="Intro"
              value={data.about.intro}
              onChange={(e) => setData({ ...data, about: { ...data.about, intro: e.target.value } })}
              rows={3}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-granite-700">Storia (paragrafi)</h4>
                <Button variant="ghost" size="sm" onClick={addStoryParagraph}>
                  <Plus className="w-4 h-4" />
                  Aggiungi
                </Button>
              </div>
              {data.about.story.map((paragraph, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Textarea
                    value={paragraph}
                    onChange={(e) => updateStoryParagraph(index, e.target.value)}
                    rows={3}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStoryParagraph(index)}
                    className="text-red-600 hover:bg-red-50 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-granite-700">Valori</h4>
                <Button variant="ghost" size="sm" onClick={addValue}>
                  <Plus className="w-4 h-4" />
                  Aggiungi
                </Button>
              </div>
              {data.about.values.map((value, index) => (
                <div key={index} className="p-4 bg-farina-50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-granite-600">Valore {index + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeValue(index)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input
                      label="Titolo"
                      value={value.title}
                      onChange={(e) => updateValue(index, 'title', e.target.value)}
                    />
                    <Input
                      label="Descrizione"
                      value={value.description}
                      onChange={(e) => updateValue(index, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-granite-950 mb-4">
            CTA Finale
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
                label="Testo Bottone Contatti"
                value={data.cta.buttonContact}
                onChange={(e) => setData({ ...data, cta: { ...data.cta, buttonContact: e.target.value } })}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
