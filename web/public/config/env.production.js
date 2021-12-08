window.env = {
  api: {
    authUrl: 'https://market.bitzlato.com/api/v2/barong',
    tradeUrl: 'https://market.bitzlato.com/api/v2/peatio',
    finexUrl: 'https://market.bitzlato.com/api/v2/finex',
    applogicUrl: 'https://market.bitzlato.com/api/v2/applogic',
    rangerUrl: 'wss://market.bitzlato.com/api/v2/ranger',
  },
  auth0: {
    domain: 'auth.bitzlato.bz',
    client_id: 'sW5Er9tgeD9T8XuklzCX_FcNX0ETttJK',
    redirect_uri: 'https://market.bitzlato.com/wallets',
  },
  logoUrl: 'https://market.bitzlato.com/assets/bitzlato_logo--sm--blue--nav.svg',
  logoDarkUrl: 'https://market.bitzlato.com/assets/bitzlato_logo--sm--white--nav.svg',
  minutesUntilAutoLogout: '120',
  withCredentials: false,
  finex: false,
  gaTrackerKey: '',
  rangerReconnectPeriod: '1',
  msAlertDisplayTime: '10000',
  incrementalOrderBook: true,
  isResizable: false,
  isDraggable: false,
  languages: ['en', 'ru'],
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
  captchaLogin: false,
  usernameEnabled: false,
  valuationPrimaryCurrency: 'USDT-ERC20',
  valuationPrimaryCurrencyName: 'USD',
  valuationSecondaryCurrency: 'BTC',
  valuationSecondaryCurrencyName: 'BTC',
  quickExchange: true,
};
