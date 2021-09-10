export const footerLinks = {};

type Product = 'p2p' | 'paymentGateway' | 'cryptoloan' | 'exchange';
export const getProductLink = (locale: string, product: Product) => {
    switch (product) {
        case 'exchange':
            return 'https://market.bitzlato.com/';

        default:
            return `https://bitzlato.com/${locale}/${product}`;
    }
};

const faqLinks = {
    en: 'https://bitzlato.com/faq_category/exchange-en/',
    ru: 'https://bitzlato.com/ru/faq_category/exchange-en-2/',
};

export const getBitzlatoLink = (locale: string, section: string) => {
    switch (section) {
        case 'faq':
            return faqLinks[locale] ?? faqLinks.en;

        default:
            return `https://bitzlato.com/${locale !== 'en' ? '' : `${locale}/`}${section}`;
    }
};
