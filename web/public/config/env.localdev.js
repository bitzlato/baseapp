window.env = {
  api: {
    authUrl: 'http://localhost:8080/api/v2/barong',
    tradeUrl: 'http://localhost:8080/api/v2/peatio',
    finexUrl: 'http://localhost:8080/api/v2/finex',
    applogicUrl: 'http://localhost:8080/api/v2/applogic',
    rangerUrl: 'ws://localhost:8080/api/v2/ranger',
  },
  auth0: {
    domain: 'bitzlato-dev.auth0.com',
    client_id: 'OL926gD0Zha6h80uJx4TVhJLMKrJemjb',
    redirect_uri: 'http://localhost:8080/success_signin',
    auth_url: 'http://localhost:8080/api/v2/barong/identity/sessions/auth0',
    signedin_url: 'http://localhost:8080/trading',
  },
  signInUrl: '/signin/auth0.html',
  signUpUrl: '/signin/auth0.html',
  logoUrl: 'https://market.bitzlato.com/assets/bitzlato_logo--sm--blue--nav.svg',
  logoDarkUrl: 'https://market.bitzlato.com/assets/bitzlato_logo--sm--white--nav.svg',
  minutesUntilAutoLogout: '120',
  withCredentials: false,
  finex: false,
  gaTrackerKey: '',
  rangerReconnectPeriod: '1',
  msAlertDisplayTime: '10000',
  incrementalOrderBook: true,
  openOrdersFetchInterval: '3000',
  isResizable: false,
  isDraggable: false,
  languages: ['en', 'ru'],
  sessionCheckInterval: '15000',
  balancesFetchInterval: '3000',
  passwordEntropyStep: 14,
  directSigninUrl:
    'https://bitzlato.com/auth/login?ex=true&returnTo=http://localhost:8080/success_signin/bitzlato.html',
  kycSteps: [
    'email',
    // 'phone',
    // 'profile',
    // 'document',
    // 'address',
  ],
  captchaLogin: false,
  usernameEnabled: false,
  wsApi: true,
  valuationPrimaryCurrency: 'USDT-ERC20',
  valuationPrimaryCurrencyName: 'USD',
  valuationSecondaryCurrency: 'BTC',
  valuationSecondaryCurrencyName: 'BTC',
};
