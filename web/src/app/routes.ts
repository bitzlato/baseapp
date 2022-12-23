export const ROUTES = {
  // Public
  quickExchange: '/quick-exchange',
  fees: '/fees',
  tradingView: '/trading-view/:symbol?',
  walletsStat: '/wallets_stat',
  signedOpsConfirm: '/signed-ops/confirm',
  // oauth: ['/signin0', '/signup0'],
  signin: '/signin',
  signup: '/signup',
  forgotPassword: '/forgot_password',
  resetPassword: '/accounts/password_reset',
  confirmation: '/accounts/confirmation',
  trading: '/trading/:market?',
  main: ['/', '/main'],
  // magicLink: '/magic-link',
  docsComponents: '/docs/components',
  docs: '/docs',
  // restriction: '/restriction',
  // maintenance: '/maintenance',

  // Private
  gifts: '/gifts',
  giftsActive: '/gifts/active',
  giftsHistory: '/gifts/history',
  report: '/reports/:code',
  deeplink: '/deeplinks/:id?',
  wallet: ['/wallets/:currency/:tab?'],
  wallets: '/wallets',
  confirm: '/confirm',
  orders: '/orders',
  history: '/history',
  // internalTransfer: '/internal-transfer',
  profile: '/profile',
  profileTelegram: '/profile/telegram',
  profile2FA: '/profile/2fa',
  // only mobile
  profileSettings: '/profile/settings',
  profileActivity: '/profile/account-activity',
  profileApiKeys: '/profile/api-keys',
  profileLanguage: '/profile/language',
  profileTheme: '/profile/theme',
  profileReports: '/reports',

  // P2P Public
  board: '/p2p/:filter?',
  advert: ['/p2p/exchange/(buy|sell)/:id', '/p2p/exchange/:id/*'],
  trader: '/p2p/users/:name',

  // P2P Private
  deal: '/p2p/trades/:tradeId',
  deals: '/p2p/trades/',
  createAdvert: '/p2p/adverts/create',
  myAdverts: '/p2p/adverts/',
  myAdvert: '/p2p/adverts/:advertId',
};

export const ROUTES_WITH_LANG = [
  ROUTES.walletsStat,
  ROUTES.board,
  ...ROUTES.advert,
  ROUTES.trader,
  ROUTES.deal,
  ROUTES.deals,
  ROUTES.createAdvert,
  ROUTES.myAdverts,
  ROUTES.myAdvert,
  ROUTES.profileTelegram,
].map((item) => `/:lang${item}`);
