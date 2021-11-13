import { OrderType } from '../components/Order';

export const PG_TITLE_PREFIX = 'Bitzlato';

export const DEFAULT_CCY_PRECISION = 4;
export const DEFAULT_TRADING_VIEW_INTERVAL = '15';

export const PASSWORD_ENTROPY_STEP = 6;

export const DEFAULT_KYC_STEPS = ['email', 'phone', 'profile', 'document', 'address'];

export const DEFAULT_MARKET_HEADERS = ['Pair', 'Price', '24h Change'];

export const DEFAULT_ORDER_TYPES: OrderType[] = ['Limit', 'Market'];
export const AMOUNT_PERCENTAGE_ARRAY = [0.25, 0.5, 0.75, 1];

export const DEFAULT_TABLE_PAGE_LIMIT = 25;
export const HOST_URL =
  window.location.hostname === 'localhost' ? 'http://localhost:9002' : window.location.origin;

export const ORDER_TYPES_WITH_TRIGGER: OrderType[] = [
  'Stop-loss',
  'Take-profit',
  'Stop-limit',
  'Take-limit',
];
export const ORDER_TYPES_WITH_LIMIT: OrderType[] = ['Limit', 'Stop-limit', 'Take-limit'];

export const TRIGGER_BUY_PRICE_MULT = 1.1;
export const TRIGGER_BUY_PRICE_ADJUSTED_TYPES = ['stop-loss', 'take-profit'];

export const DEFAULT_MARKET = {
  id: '',
  name: '',
  base_unit: '',
  quote_unit: '',
  min_price: '',
  max_price: 0,
  min_amount: 0,
  amount_precision: 0,
  price_precision: 0,
};

export const colors = {
  light: {
    chart: {
      primary: '#fff',
      up: '#54B489',
      down: '#E85E59',
    },
    navbar: {
      sun: 'var(--icons)',
      moon: 'var(--primary-text-color)',
    },
    orderBook: {
      asks: 'var(--asks-level-4)',
      bids: 'var(--bids-level-4)',
    },
    depth: {
      fillAreaAsk: '#fa5252',
      fillAreaBid: '#12b886',
      gridBackgroundStart: '#1a243b',
      gridBackgroundEnd: '#1a243b',
      strokeAreaAsk: '#fa5252',
      strokeAreaBid: '#12b886',
      strokeGrid: '#B8E9F5',
      strokeAxis: '#cccccc',
    },
  },
  dark: {
    chart: {
      primary: 'var(--rgb-body-background-color)',
      up: 'var(--rgb-bids)',
      down: 'var(--rgb-asks)',
    },
    navbar: {
      sun: 'var(--primary-text-color)',
      moon: 'var(--icons)',
    },
    orderBook: {
      asks: 'var(--asks-level-4)',
      bids: 'var(--bids-level-4)',
    },
    depth: {
      fillAreaAsk: 'var(--rgb-asks)',
      fillAreaBid: 'var(--rgb-bids)',
      gridBackgroundStart: 'var(--rgb-asks)',
      gridBackgroundEnd: 'var(--rgb-asks)',
      strokeAreaAsk: 'var(--rgb-asks)',
      strokeAreaBid: 'var(--rgb-bids)',
      strokeGrid: 'var(--rgb-secondary-contrast-cta-color)',
      strokeAxis: 'var(--rgb-primary-text-color)',
    },
  },
};

export const FIXED_VOL_PRECISION = 2;
