import moment from 'moment';
import { localeDate } from './localeDate';

export const sortByDate = (prop: string, format: string) => {
  return (a: { [x: string]: any }, b: { [x: string]: any }) => {
    return moment(localeDate(a[prop], 'fullDate'), format) >
      moment(localeDate(b[prop], 'fullDate'), format)
      ? -1
      : 1;
  };
};
