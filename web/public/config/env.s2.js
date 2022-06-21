window.env = {
  routes: {
    profile: '/profile',
    wallets: '/wallets',
  },
  api: {
    authUrl: 'https://s2.s-www.lgk.one/api/v2/barong',
    tradeUrl: 'https://s2.s-www.lgk.one/api/v2/peatio',
    finexUrl: 'https://s2.s-www.lgk.one/api/v2/finex',
    applogicUrl: 'https://s2.s-www.lgk.one/api/v2/applogic',
    rangerUrl: 'wss://s2.s-www.lgk.one/api/v2/ranger',
    accountUrl: 'https://account.s-www.lgk.one/api/private/v1',
    accountPublicUrl: 'https://account.s-www.lgk.one/api/public/v1',
    p2pUrl: 'https://s-www.lgk.one/api/p2p',
    p2pAuthUrl: 'https://s-www.lgk.one/api/auth',
  },
  auth0: {
    domain: 'auth.lgk.one',
    client_id: 'OL926gD0Zha6h80uJx4TVhJLMKrJemjb',
    redirect_uri: 'https://s2.s-www.lgk.one/wallets',
  },
  logoUrl: 'https://bitzlato.com/basestatic/bitzlato_logo--sm--blue--nav.svg',
  logoDarkUrl: 'https://bitzlato.com/basestatic/bitzlato_logo--sm--white--nav.svg',
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
  captchaLogin: true,
  captcha_type: 'recaptcha',
  captcha_id: '6Lf2OO8eAAAAAKi4GmsrEOw-uUiprDgTxBf3ALNZ',
  usernameEnabled: false,
  valuationPrimaryCurrency: 'USDT-ERC20',
  valuationPrimaryCurrencyName: 'USD',
  valuationSecondaryCurrency: 'BTC',
  valuationSecondaryCurrencyName: 'BTC',
};
