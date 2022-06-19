import { parseNumeric } from 'web/src/helpers/parseNumeric';

export const formatRating = (rating: string) =>
  parseNumeric(rating, {
    maxFractionDigits: 4,
    allowNegativeNumeric: true,
  });
