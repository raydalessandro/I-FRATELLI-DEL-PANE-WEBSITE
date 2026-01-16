import { useState, useEffect } from 'react';
import type { ProductCategory } from '../types';

// Generic content loader hook
export function useContent<T>(filename: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        const response = await fetch(`/content/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${filename}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [filename]);

  return { data, loading, error };
}

// Typed hooks for specific content files
export function useSiteContent() {
  return useContent<{
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
}

export function useContactContent() {
  return useContent<{
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
}

export function useB2BContent() {
  return useContent<{
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
}

export function useProductsContent() {
  return useContent<{
    categories: Array<{
      id: ProductCategory;
      name: string;
      description: string;
    }>;
    products: Array<{
      id: string;
      name: string;
      slug: string;
      category: ProductCategory;
      shortDescription: string;
      description: string;
      price: number | null;
      priceNote?: string;
      unit: string;
      minOrder?: number | null;
      image: string;
      images?: string[];
      available: boolean;
      featured: boolean;
      tags?: string[];
      createdAt: string;
      updatedAt: string;
    }>;
  }>('products.json');
}

export function useReviewsContent() {
  return useContent<{
    googleRating: number;
    googleReviewCount: number;
    googleLink: string;
    featured: Array<{
      author: string;
      rating: number;
      date: string;
      text: string;
      highlight: boolean;
    }>;
  }>('reviews.json');
}

export function usePromosContent() {
  return useContent<{
    activeBanner: {
      enabled: boolean;
      text: string;
      link: string | null;
      bgColor: string;
      textColor: string;
    };
    homePromo: {
      enabled: boolean;
      title: string;
      description: string;
      validUntil: string;
      ctaText: string;
      ctaLink: string;
    };
  }>('promos.json');
}
