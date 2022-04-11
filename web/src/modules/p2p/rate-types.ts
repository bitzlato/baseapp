export interface CurrencyRate {
  description: string;
  url: string;
  id: number;
  rate: number;
}

export interface RateSourcesParams {
  cryptocurrency: string;
  currency: string;
  url: string;
}
