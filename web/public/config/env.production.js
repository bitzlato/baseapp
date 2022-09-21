const wsHostURL = `${window.location.protocol === 'http:' ? 'ws://' : 'wss://'}${
  window.location.hostname
}`;

window.env = {
  routes: {
    profile: '/profile',
    wallets: '/wallets',
  },
  api: {
    authUrl: '/api/v2/barong',
    tradeUrl: '/api/v2/peatio',
    finexUrl: '/api/v2/finex',
    applogicUrl: '/api/v2/applogic',
    rangerUrl: `${wsHostURL}/api/v2/ranger`,
    accountUrl: '/api/whaler/private/v1',
    accountPublicUrl: '/api/whaler/public/v1',
    p2pUrl: '/api2/p2p',
    p2pAuthUrl: '/api2/auth',
    notificatorUrl: `${wsHostURL}/wssb`,
    belomorUrl: '/api/belomor',
  },
  logoUrl: '/basestatic/bitzlato_logo--sm--blue--nav.svg',
  logoDarkUrl: '/basestatic/bitzlato_logo--sm--white--nav.svg',
  minutesUntilAutoLogout: '120',
  withCredentials: false,
  finex: false,
  rangerReconnectPeriod: '1',
  msAlertDisplayTime: '10000',
  incrementalOrderBook: true,
  isResizable: false,
  isDraggable: false,
  languages: ['en', 'ru', 'uk'],
  sessionCheckInterval: '15000',
  balancesFetchInterval: '3000',
  passwordEntropyStep: 14,
  kycSteps: [
    'email',
    // 'phone',
    // 'profile',
    // 'document',
    // 'address',
  ],
  captchaLogin: true,
  captcha_type: 'recaptcha',
  captcha_id: '6Lf2OO8eAAAAAKi4GmsrEOw-uUiprDgTxBf3ALNZ',
  usernameEnabled: false,
  valuationPrimaryCurrency: 'USDT-ERC20',
  valuationPrimaryCurrencyName: 'USD',
  valuationSecondaryCurrency: 'BTC',
  valuationSecondaryCurrencyName: 'BTC',
};
