type Product = 'p2p' | 'payment-gateway' | 'cryptoloan' | 'exchange';
export const getProductLink = (locale: string, product: Product) => {
  switch (product) {
    case 'exchange':
      return '/trading';

    case 'p2p':
      return `/${locale}/p2p`;

    default:
      return `https://bitzlato.com/${locale}/${product}`; // external
  }
};

const faqLinks: Record<string, string> = {
  en: 'https://bitzlato.com/faq_category/exchange-en/',
  ru: 'https://bitzlato.com/ru/faq_category/exchange-en-2/',
};

export const getBitzlatoLink = (locale: string, section: string) => {
  switch (section) {
    case 'wallets_stat/':
      return `/${locale}/${section}`;

    case 'faq':
      return faqLinks[locale] ?? faqLinks.en; // external

    default:
      return `https://bitzlato.com/${locale === 'en' ? '' : `${locale}/`}${section}`; // external
  }
};
