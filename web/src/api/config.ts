const hostUrl =
  window.location.hostname === 'localhost' ? 'http://localhost:9002' : window.location.origin;
const protocolSSL = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
const rangerHostUrl =
  window.location.hostname === 'localhost'
    ? 'ws://localhost:9003'
    : `${protocolSSL}${window.location.hostname}`;

export const defaultConfig: Config = {
  api: {
    authUrl: `${hostUrl}/api/v2/barong`,
    tradeUrl: `${hostUrl}/api/v2/peatio`,
    applogicUrl: `${hostUrl}/api/v2/applogic`,
    rangerUrl: `${rangerHostUrl}/api/v2/ranger`,
    finexUrl: `${hostUrl}/api/v2/finex`,
  },
  finex: false,
  withCredentials: false,
  incrementalOrderBook: false,
  isResizable: false,
  isDraggable: false,
  showLanding: true,
  captchaLogin: false,
  usernameEnabled: false,
  gaTrackerKey: '',
  minutesUntilAutoLogout: '5',
  msAlertDisplayTime: '5000',
  msPricesUpdates: '5000',
  sessionCheckInterval: '15000',
  balancesFetchInterval: '3000',
  passwordEntropyStep: '14',
  storage: {
    defaultStorageLimit: '50',
    orderBookSideLimit: '25',
  },
  languages: ['en', 'ru'],
  kycSteps: ['email', 'phone', 'profile', 'document', 'address'],
  captcha_type: 'none',
  password_min_entropy: 0,
  wizard_step: 'false',
  barong_upload_size_min_range: '1',
  barong_upload_size_max_range: '20',
  themeSwitcher: 'visible',

  logoUrl: '',
  logoDarkUrl: '',
  sonic: false,
  valuationPrimaryCurrency: 'USD',
  valuationPrimaryCurrencyName: 'USD',
  valuationSecondaryCurrency: 'ETH',
  valuationSecondaryCurrencyName: 'ETH',
  internalTransfer: false,
  quickExchange: false,
};

export const Cryptobase = {
  config: defaultConfig,
};

Cryptobase.config = { ...defaultConfig, ...window.env };
Cryptobase.config.storage = { ...defaultConfig.storage, ...Cryptobase.config.storage };

const convertToBoolean = (value: any): boolean => {
  return String(value) === 'true';
};

export const tradeUrl = () => Cryptobase.config.api.tradeUrl;
export const authUrl = () => Cryptobase.config.api.authUrl;
export const applogicUrl = () => Cryptobase.config.api.applogicUrl;
export const rangerUrl = () => Cryptobase.config.api.rangerUrl;
export const finexUrl = () => Cryptobase.config.api.finexUrl || tradeUrl();
export const withCredentials = () => convertToBoolean(Cryptobase.config.withCredentials);
export const incrementalOrderBook = () => convertToBoolean(Cryptobase.config.incrementalOrderBook);
export const isResizableGrid = () => convertToBoolean(Cryptobase.config.isResizable);
export const isDraggableGrid = () => convertToBoolean(Cryptobase.config.isDraggable);
export const isFinexEnabled = () => convertToBoolean(Cryptobase.config.finex);
export const showLanding = () => convertToBoolean(Cryptobase.config.showLanding);
export const captchaLogin = () => convertToBoolean(Cryptobase.config.captchaLogin);
export const minutesUntilAutoLogout = () => Cryptobase.config.minutesUntilAutoLogout;
export const sessionCheckInterval = () => Cryptobase.config.sessionCheckInterval;
export const balancesFetchInterval = () => Cryptobase.config.balancesFetchInterval;
export const gaTrackerKey = () => Cryptobase.config.gaTrackerKey;
export const msAlertDisplayTime = () => Cryptobase.config.msAlertDisplayTime;
export const msPricesUpdates = () => Cryptobase.config.msPricesUpdates;
export const defaultStorageLimit = () => Number(Cryptobase.config.storage.defaultStorageLimit);
export const orderBookSideLimit = () => Number(Cryptobase.config.storage.orderBookSideLimit);
export const passwordEntropyStep = () => Number(Cryptobase.config.passwordEntropyStep);
export const languages =
  Cryptobase.config.languages && Cryptobase.config.languages.length > 0
    ? Cryptobase.config.languages
    : ['en'];
export const kycSteps = () => Cryptobase.config.kycSteps;
export const isUsernameEnabled = () => convertToBoolean(Cryptobase.config.usernameEnabled);
export const captchaType = () => Cryptobase.config.captcha_type;
export const captchaId = () => Cryptobase.config.captcha_id;
export const passwordMinEntropy = () => Number(Cryptobase.config.password_min_entropy);
export const wizardStep = () => String(Cryptobase.config.wizard_step || '1');
export const barongUploadSizeMinRange = Number(
  Cryptobase.config.barong_upload_size_min_range || '1',
);
export const barongUploadSizeMaxRange = Number(
  Cryptobase.config.barong_upload_size_max_range || '20',
);
export const themeSwitcher = () => Cryptobase.config.themeSwitcher;
export const logoUrl = (): string => Cryptobase.config.logoUrl;
export const logoDarkUrl = (): string => Cryptobase.config.logoDarkUrl;
export const isSonicEnabled = () => convertToBoolean(Cryptobase.config.sonic);
export const isWsApiEnabled = () => convertToBoolean(Cryptobase.config.wsApi);
export const isAuth0 = () => Cryptobase.config.auth0 !== undefined;
export const auth0Config = () => Cryptobase.config.auth0;
export const valuationPrimaryCurrency = (): string => Cryptobase.config.valuationPrimaryCurrency;
export const valuationPrimaryCurrencyName = (): string =>
  Cryptobase.config.valuationPrimaryCurrencyName;
export const valuationSecondaryCurrency = (): string =>
  Cryptobase.config.valuationSecondaryCurrency;
export const valuationSecondaryCurrencyName = (): string =>
  Cryptobase.config.valuationSecondaryCurrencyName;
export const showInternalTransfer = () => convertToBoolean(Cryptobase.config.internalTransfer);
export const showQuickExhange = () => convertToBoolean(Cryptobase.config.quickExchange);
