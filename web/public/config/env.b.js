window.env = {
  routes: {
    profile: '/profile',
    wallets: '/wallets',
  },
  api: {
    authUrl: 'https://b-www.lgk.one/api/v2/barong',
    tradeUrl: 'https://b-www.lgk.one/api/v2/peatio',
    finexUrl: 'https://b-www.lgk.one/api/v2/finex',
    applogicUrl: 'https://b-www.lgk.one/api/v2/applogic',
    rangerUrl: 'wss://b-www.lgk.one/api/v2/ranger',
    accountUrl: 'https://b-www.lgk.one/api/whaler/private/v1',
    accountPublicUrl: 'https://b-www.lgk.one/api/whaler/public/v1',
    p2pUrl: 'https://b-www.lgk.one/api2/p2p',
    p2pAuthUrl: 'https://b-www.lgk.one/api2/auth',
    notificatorUrl: 'wss://b-www.lgk.one/wssb',
    belomorUrl: 'https://b-www.lgk.one/api/belomor',
  },
  auth0: {
    domain: 'auth.lgk.one',
    client_id: 'OL926gD0Zha6h80uJx4TVhJLMKrJemjb',
    redirect_uri: 'https://b-www.lgk.one/wallets',
  },
  logoUrl: 'https://b-www.lgk.one/basestatic/bitzlato_logo--sm--blue--nav.svg',
  logoDarkUrl: 'https://b-www.lgk.one/basestatic/bitzlato_logo--sm--white--nav.svg',
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
