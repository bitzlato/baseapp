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

  return (key: string) => {
    if (dictionary && key in dictionary) {
      return dictionary[key];
    }

    if (key in defaultDictionary) {
      return defaultDictionary[key];
    }

    return key;
  };
};
