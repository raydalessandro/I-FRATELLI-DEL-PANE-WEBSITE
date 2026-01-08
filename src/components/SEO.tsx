import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/site';
import type { SEOProps } from '../types';

interface Props extends SEOProps {
  children?: React.ReactNode;
}

export function SEO({
  title,
  description = siteConfig.seo.defaultDescription,
  image = siteConfig.seo.defaultImage,
  url,
  type = 'website',
  noindex = false,
  children,
}: Props) {
  const fullTitle = title 
    ? siteConfig.seo.titleTemplate.replace('%s', title)
    : siteConfig.seo.defaultTitle;
  
  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const fullImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {children}
    </Helmet>
  );
}
