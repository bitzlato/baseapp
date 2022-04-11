import { deeplinkTexts as base } from '../../translations/deeplinks.en';

export const deeplinkTexts = {
  ...base,
  'common.loading': 'Загрузка сведений',
  'common.action.sign_in_up': 'Войти или создать учетную запись',
  'common.action.discard': 'Отказаться',
  'common.action.accept': 'Принять',
  'common.action.accepting': 'Приём...',

  'deeplink.not_supported': 'Неподдерживаемая ссылка',
  'deeplink.cant_load.title': 'Не удалось считать информацию',
  'deeplink.cant_load.text': 'Ссылка недействительна или срок объявления истек.',

  'deeplink.voucher.title': 'Ваучер',
  'deeplink.voucher.info':
    'Единовременный ваучер на сумму {totalCrypto} {totalFiat}, выписан пользователем {user}.',
  'deeplink.voucher.comment_label': 'Комментарий',
  'deeplink.voucher.expired': 'Срок действия ваучера истек.',
  'deeplink.voucher.cashed': 'Ваучер погашен в {cashed_at}.',

  'deeplink.voucher.just_cashed': 'Ваучер зачислен на ваш кошелек.',
  'deeplink.voucher.cash_failed': 'Не удалось погасить ваучер.',

  'deeplink.profile.current_account_label': `Авторизация аккаунта`,
  'deeplink.profile.need_auth': 'Войдите в свою учетную запись для погашения.',
};
