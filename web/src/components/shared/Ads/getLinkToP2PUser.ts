import { Language } from 'web/src/types';

export function getLinkToP2PUser({ lang, userName }: { lang: Language; userName: string }) {
  return `/${lang}/p2p/users/${userName}`;
}
