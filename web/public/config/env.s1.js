window.env = {
  api: {
    authUrl: 'https://s1.s-www.lgk.one/api/v2/barong',
    tradeUrl: 'https://s1.s-www.lgk.one/api/v2/peatio',
    finexUrl: 'https://s1.s-www.lgk.one/api/v2/finex',
    applogicUrl: 'https://s1.s-www.lgk.one/api/v2/applogic',
    rangerUrl: 'wss://s1.s-www.lgk.one/api/v2/ranger',
  },
  auth0: {
    domain: 'bitzlato-dev.auth0.com',
    client_id: 'OL926gD0Zha6h80uJx4TVhJLMKrJemjb',
    redirect_uri: 'https://s1.s-www.lgk.one/wallets',
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
};
