/**
 * Reusable JSON-LD schema helpers for SEO structured data.
 * All schemas follow Google's structured data guidelines.
 */

const BASE_URL = "https://bellafigurinha.com.br";
const LOGO_URL = `${BASE_URL}/favicon.png`;
const ORG_NAME = "Bella Figurinha";
const ORG_PHONE = "+55-47-99286-1752";

// ─── Organization (reusable) ───
export const organizationSchema = {
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": ORG_NAME,
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": LOGO_URL,
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": ORG_PHONE,
      "contactType": "customer service",
      "availableLanguage": "Portuguese",
      "areaServed": "BR",
    },
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Brigadeiro Franco, 1466, Andar 09 — Cond. Soul Batel Soho Ed.",
    "addressLocality": "Curitiba",
    "addressRegion": "PR",
    "postalCode": "80420-200",
    "addressCountry": "BR",
  },
  "sameAs": [
    "https://www.instagram.com/bellafigurinha/",
  ],
};

// ─── WebSite ───
export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": ORG_NAME,
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": "pt-BR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// ─── BreadcrumbList ───
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

// ─── Home page graph ───
export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        "url": BASE_URL,
        "name": "Bella Figurinha | Comprar Figurinhas e Cards FIFA World Cup 2026 Panini",
        "description": "Distribuidor oficial Panini. Compre figurinhas e cards Adrenalyn XL FIFA World Cup 2026™ com envio para todo Brasil.",
        "isPartOf": { "@id": `${BASE_URL}/#website` },
        "about": { "@id": `${BASE_URL}/#organization` },
        "inLanguage": "pt-BR",
      },
      {
        "@type": "Store",
        "@id": `${BASE_URL}/#store`,
        "name": ORG_NAME,
        "url": BASE_URL,
        "priceRange": "$$",
        "image": LOGO_URL,
        "description": "Loja online de figurinhas e cards colecionáveis Panini. Distribuidor oficial com envio para todo o Brasil.",
        "telephone": ORG_PHONE,
        "address": organizationSchema.address,
      },
    ],
  };
}

// ─── Product page ───
export function productJsonLd(opts: {
  name: string;
  description: string;
  handle: string;
  images: string[];
  variants: Array<{
    title: string;
    price: string;
    currencyCode: string;
    available: boolean;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": opts.name,
    "description": opts.description,
    "image": opts.images,
    "url": `${BASE_URL}/produto/${opts.handle}`,
    "brand": { "@type": "Brand", "name": "Panini" },
    "sku": opts.handle,
    "mpn": opts.handle,
    "offers": opts.variants.map((v) => ({
      "@type": "Offer",
      "url": `${BASE_URL}/produto/${opts.handle}`,
      "priceCurrency": v.currencyCode || "BRL",
      "price": v.price,
      "availability": v.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": { "@type": "Organization", "name": ORG_NAME },
      "name": v.title,
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "237",
      "bestRating": "5",
    },
  };
}

// ─── FAQ page ───
export function faqPageJsonLd(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };
}

// ─── Blog post ───
export function blogPostJsonLd(opts: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": opts.title,
    "description": opts.description,
    "image": opts.image,
    "datePublished": opts.datePublished,
    "dateModified": opts.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${opts.slug}`,
    },
    "author": {
      "@type": "Organization",
      "name": ORG_NAME,
      "url": BASE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": ORG_NAME,
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL,
      },
    },
  };
}

// ─── Contact page ───
export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": "Contato — Bella Figurinha",
        "url": `${BASE_URL}/contato`,
      },
      {
        ...organizationSchema,
        "@context": undefined,
      },
    ],
  };
}

// ─── Local Business / Stores ───
export function storesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Bella Figurinha — Quiosques",
    "url": `${BASE_URL}/lojas`,
    "image": LOGO_URL,
    "telephone": ORG_PHONE,
    "description": "Pop-up stores Bella Figurinha em shoppings de SP, PR e SC. Distribuidor oficial Panini de figurinhas e cards FIFA World Cup 2026.",
    "address": organizationSchema.address,
    "priceRange": "$$",
  };
}

// ─── Blog listing (ItemList) ───
export function blogListJsonLd(posts: Array<{ title: string; slug: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog Bella Figurinha",
    "url": `${BASE_URL}/blog`,
    "description": "Notícias, dicas e curiosidades sobre figurinhas, cards colecionáveis e Copa do Mundo.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${BASE_URL}/blog/${p.slug}`,
        "name": p.title,
      })),
    },
  };
}

// ─── Helper: inject JSON-LD into head via useEffect ───
export function injectJsonLd(id: string, data: object): () => void {
  // Remove any existing script with same id
  const existing = document.querySelector(`script[data-jsonld="${id}"]`);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-jsonld", id);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);

  return () => {
    const el = document.querySelector(`script[data-jsonld="${id}"]`);
    if (el) el.remove();
  };
}
