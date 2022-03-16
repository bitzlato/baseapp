import { Language } from 'src/types';

const P2Plinks = {
  ru: 'https://bitzlato.com/ru/p2p',
  en: 'https://bitzlato.com/en/p2p',
};

export const getLinkToP2P = (locale: Language): string => {
  return P2Plinks[locale] ?? P2Plinks.en;
};