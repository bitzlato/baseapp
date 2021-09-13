window.env = {
    api: {
      authUrl: 'https://market-s3.bitzlato.com/api/v2/barong',
      tradeUrl: 'https://market-s3.bitzlato.com/api/v2/peatio',
      finexUrl: 'https://market-s3.bitzlato.com/api/v2/finex',
      applogicUrl: 'https://market-s3.bitzlato.com/api/v2/applogic',
      rangerUrl: 'wss://market-s3.bitzlato.com/api/v2/ranger',
    },
    auth0: {
      domain: 'bitzlato-dev.auth0.com',
      client_id: 'OL926gD0Zha6h80uJx4TVhJLMKrJemjb',
      redirect_uri: 'https://market-s3.bitzlato.com/success_signin',
      auth_url: 'https://market-s3.bitzlato.com/api/v2/barong/identity/sessions/auth0',
      signedin_url: 'https://market-s3.bitzlato.com/wallets'
    },
    signInUrl: '/signin/bitzlato.html',
    signUpUrl: '/signin/bitzlato.html',
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
    directSigninUrl: 'https://bitzlato.com/auth/login?ex=true&returnTo=https%3A%2F%2Fmarket-s3.bitzlato.com%2Fsuccess_signin%2Fbitzlato.html',
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
