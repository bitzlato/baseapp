export interface Currency {
  code: string;
  minorUnit: number;
}

export interface Money {
  amount: string | number;
  currency: Currency;
}
