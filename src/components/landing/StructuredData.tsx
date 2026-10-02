import { PACKAGES, SITE } from "@/lib/site";

interface FaqItem {
  q: string;
  a: string;
}

interface StructuredDataProps {
  faq: FaqItem[];
}

/** JSON-LD cho Google: cửa hàng hoa, 3 gói sản phẩm có giá, và khối hỏi đáp. */
export function StructuredData({ faq }: StructuredDataProps) {
  const business = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/brand/greeting-2010.jpg`,
    telephone: `+84${SITE.phone.slice(1)}`,
    description: SITE.description,
    priceRange: "299.000đ – 999.000đ",
    sameAs: [SITE.facebookUrl, SITE.zaloUrl],
    areaServed: "VN",
  };
  const products = PACKAGES.map((pkg) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Gói ${pkg.name} – hoa 20/10`,
    description: pkg.promise,
    image: `${SITE.url}/img/bouquet-lace.jpg`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "VND",
      lowPrice: pkg.priceFrom,
      highPrice: pkg.priceTo,
      availability: "https://schema.org/PreOrder",
      url: `${SITE.url}/#goi-qua`,
    },
  }));
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const json = JSON.stringify([business, ...products, faqPage]);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
