type Product = 'p2p' | 'payment-gateway' | 'cryptoloan' | 'exchange';
export const getProductLink = (lang: string, product: Product) => {
  switch (product) {
    case 'exchange':
      return '/trading';

    case 'p2p':
      return `/p2p`;

    default:
      return `https://bitzlato.com/${lang}/${product}`; // external
  }
};

const faqLinks: Record<string, string> = {
  en: 'https://bitzlato.com/faq_category/exchange-en/',
  ru: 'https://bitzlato.com/ru/faq_category/exchange-en-2/',
};

export const getBitzlatoLink = (lang: string, section: string) => {
  switch (section) {
    case 'wallets_stat/':
      return `/${section}`;

    case 'faq':
      return faqLinks[lang] ?? faqLinks.en; // external

    default:
      return `https://bitzlato.com/${lang === 'en' ? '' : `${lang}/`}${section}`; // external
  }
};
