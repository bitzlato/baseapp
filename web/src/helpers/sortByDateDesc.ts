import { localeDate } from './localeDate';

export function sortByDateDesc(a: string | number, b: string | number) {
  try {
    return new Date(a) > new Date(b) ? -1 : 1;
  } catch (e) {
    return localeDate(a, 'fullDate') > localeDate(b, 'fullDate') ? -1 : 1;
  }
}
