import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Generic content context for managing JSON files
interface ContentContextValue<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  updateData: (newData: T) => Promise<void>;
  saveToGitHub: () => Promise<void>;
  lastSaved: string | null;
}

function createContentContext<T>(filename: string) {
  const Context = createContext<ContentContextValue<T> | null>(null);

  function Provider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [lastSaved, setLastSaved] = useState<string | null>(null);

    // Load data from JSON file
    useEffect(() => {
      async function loadData() {
        try {
          setLoading(true);
          const response = await fetch(`/content/${filename}`);
          if (!response.ok) {
            throw new Error(`Failed to load ${filename}`);
          }
          const json = await response.json();
          setData(json);

          // Check localStorage for last saved time
          const saved = localStorage.getItem(`${filename}_lastSaved`);
          if (saved) setLastSaved(saved);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    }, []);

    // Update data locally
    const updateData = async (newData: T) => {
      setData(newData);
      // Save to localStorage as backup
      localStorage.setItem(`${filename}_data`, JSON.stringify(newData));
      localStorage.setItem(`${filename}_lastSaved`, new Date().toISOString());
      setLastSaved(new Date().toISOString());
    };

    // Save to GitHub (placeholder for now)
    const saveToGitHub = async () => {
      try {
        // TODO: Implement GitHub API integration
        console.log('Saving to GitHub:', filename, data);
        // For now, just update lastSaved
        const now = new Date().toISOString();
        localStorage.setItem(`${filename}_lastSaved`, now);
        setLastSaved(now);
      } catch (err) {
        throw new Error('Failed to save to GitHub');
      }
    };

    return (
      <Context.Provider value={{ data, loading, error, updateData, saveToGitHub, lastSaved }}>
        {children}
      </Context.Provider>
    );
  }

  function useContentContext() {
    const context = useContext(Context);
    if (!context) {
      throw new Error(`useContentContext must be used within ${filename} Provider`);
    }
    return context;
  }

  return { Provider, useContentContext };
}

// B2B Content Context
export const B2BContext = createContentContext<{
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
}>('b2b.json');

// Contact Content Context
export const ContactContext = createContentContext<{
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
}>('contact.json');

// Site Content Context
export const SiteContext = createContentContext<{
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
}>('site.json');
