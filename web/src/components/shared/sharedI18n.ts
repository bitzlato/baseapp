import { Language } from 'web/src/types';
import en from './sharedLocales/en.json';
import ru from './sharedLocales/ru.json';

type Dictionary = Record<string, string>;
const defaultDictionary: Dictionary = en;
const dictionaries: Record<string, Dictionary> = {
  en,
  ru,
};

export const createT = (language: Language) => {
  const dictionary = dictionaries[language];

  return (key: string): string => {
    if (dictionary && key in dictionary) {
      const result = dictionary[key];
      if (typeof result === 'string') {
        return result;
      }
    }

    if (key in defaultDictionary) {
      const result = defaultDictionary[key];
      if (typeof result === 'string') {
        return result;
      }
    }

    return key;
  };
};
