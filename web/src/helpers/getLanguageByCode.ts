export const getLanguageName = (code: string) => {
  switch (code) {
    case 'ru':
      return 'Русский';

    case 'uk':
      return 'Українська';

    case 'zh':
      return '中国';

    case 'en':
    default:
      return 'English';
  }
};
