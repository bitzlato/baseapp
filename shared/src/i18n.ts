import { Language } from 'types';
import en from './locales/en.json';
import ru from './locales/ru.json';

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
