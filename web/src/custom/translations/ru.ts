import { ru as mobileTranslationsRu } from '../../mobile/translations';
import { LangType } from '../../translations';
import { nationalitiesNames } from '../../translations/nationalities';
import { deeplinkTexts } from './deeplinks.ru';

export const ru: LangType = {
  'page.header.navbar.signIn': 'Войти',
  'page.header.navbar.quick-exchange': 'Быстрый обмен',
  'page.header.navbar.trade': 'Торговля',
  'page.header.navbar.wallets': 'Кошельки',
  'page.header.navbar.openOrders': 'Ордера',
  'page.header.navbar.history': 'История',
  'page.header.navbar.api': 'API Документация',
  'page.header.navbar.internal.transfer': 'Internal transfer',
  'page.header.navbar.toP2P': 'Перейти в P2P',

  'page.header.navbar.profile': 'Профиль',
  'page.header.navbar.logout': 'Выйти',

  'notifications.title': 'Уведомления',
  'notifications.readall': 'Прочитать все',
  'notifications.empty': 'Уведомлений нет',

  'notifications.unread': 'Непрочитанное',
  'notifications.read': 'Прочтено',

  'notifications.modal.header': 'Внимание!',
  'notifications.No notifications': 'Нет уведомлений',
  'notifications.Remove All': 'Пометить всё как прочитанное',
  'notifications.Telegram and web accounts have been merged':
    '✅ Телеграм-аккаунт прикреплен к вашей учетной записи.',
  'notifications.adminMessage': 'Сообщение от администрации',
  'notifications.adsActivatedMessage': '✅ Ваши объявления активированы',
  'notifications.adsPausedMessage':
    'Одно из объявлений на продажу отключено из-за суммы на балансе меньше, чем минимальный лимит в объявлении',
  'notifications.adsPausedMessage_maxAllowedMarkup':
    'Одно из ваших объявлений отключено из-за курса ниже, чем {maxAllowedMarkup}% от биржевого',
  'notifications.adsPausedMessage_minBalanceAllowed':
    'Ваши объявления на покупку {currency} недоступны пользователям из-за отсутствия минимального баланса {minBalance} {cryptocurrency}',
  'notifications.checkCashed': '{recipient} обналичил чек на {amount} {cryptocurrency}.',
  'notifications.comissionReturn':
    '🤩🤩🤩 Сделка #{tradeId} прошла бесплатно, вы сэкономили {amount} {cryptocurrency}',
  'notifications.disputeAvailablePurchase': 'Вы получили возможность открыть спор',
  'notifications.disputeAvailableSelling': 'Покупатель получил возможность открыть спор',
  'notifications.disputeAvailableTenMinutes': 'У вас осталось 10 минут на открытие спора',
  'notifications.disputeFail': '😞 Вы проиграли в споре сделки {tradeId}.',
  'notifications.disputeSuccess':
    '✌ Вы победили в споре сделки {tradeId} и получили {amount} {cryptocurrency}.',
  'notifications.dividendsReceived':
    'Вы получили {cryptocurrencyamount} {cryptocurrencycode} вознаграждения от реферала 🤝',
  'notifications.freeze': 'Ваш аккаут заморожен до {expire, LL}',
  'notifications.freezeReason':
    'Причина заморозки "{reason}". Типы запрещенных операций "{type}". Дата окончания {expire, LL}',
  'notifications.freezeTypeall': 'все',
  'notifications.freezeTypeexchange_orders': 'торги на бирже',
  'notifications.freezeTypetrades': 'p2p торги',
  'notifications.freezeTypevouchers': 'создание ваучеров',
  'notifications.freezeTypewithdraw': 'вывод',
  'notifications.inactivityRatingDecline':
    'К сожалению, ваш рейтинг понизился, так как вы не откликаетесь на объявления слишком часто!',
  'notifications.invoicePaid': '✅ Вы успешно оплатили {merchantName} счет {invoiceId}',
  'notifications.invoicePaidToMerchant':
    '🔥 Оплата по счету {invoiceId} от {userName} {amount} {cryptocurrency}',
  'notifications.merchantPaid': 'Вы получили выплату {amount} {cryptocurrency} от {merchantName}',
  'notifications.moneyReceived':
    'Вы получили {cryptocurrencyamount} {cryptocurrencycode} ({currencyamount} {currencycode}) от {donor}!',
  'notifications.mute': 'Ваши объявления сняты с показа на {duration} ч.',
  'notifications.muteReason':
    'Ваши объявления сняты с показа на {duration} ч. Вероятнее всего, Вы нарушили условия размещения объявлений. По истечению срока ограничения объявления станут активны.',
  'notifications.newAdminMessage': 'Новое сообщение от администрации',
  'notifications.newChatMessage': 'Новое сообщение от пользователя {publicName}',
  'notifications.newMessage': 'Новое сообщение',
  'notifications.newReferral': 'У Вас новый реферал {publicName}',
  'notifications.newTradeMessage': 'Новое сообщение в сделке #{tradeId}',
  'notifications.notificationsCount': '{count} уведомлений',
  'notifications.payment-processed': '🚀 Отправка {amount} {cryptocurrency} осуществлена',
  'notifications.tipsReceived':
    '🔥 Вы получили {cryptocurrencyamount} {cryptocurrencycode} чаевых по сделке #{tradeId}!',
  'notifications.tradeExpired': 'Сделка #{tradeId} будет автоматически отменена',
  'notifications.tradeExtendWaitingTime':
    'Сделка #{tradeId}: Пользователь добавил {time} минут на обсуждение сделки!',
  'notifications.tradePause':
    'Упс! Кажется Вас сейчас нет на месте и Вы пропускаете сделки. Мы приостановили показ ваших объявлений до тех пор, пока Вы не вернетесь.',
  'notifications.tradeStatusChanged': 'Изменился статус сделки #{tradeId}',
  'notifications.tradeStatusChangedCancel': 'Сделка #{tradeId} отменена',
  'notifications.tradeStatusChangedConfirmPayment': 'Вы получили ТИКЕР КРИПТА. Сделка #{tradeId}',
  'notifications.tradeStatusChangedCreated': 'Новое предложение! Сделка НОМЕР #{tradeId}',
  'notifications.tradeStatusChangedPayment': 'Проверьте поступление средств. Сделка #{tradeId}',
  'notifications.tradeWillExpire': 'Сделка #{tradeId} будет автоматически отменена {time, fromNow}',
  'notifications.unFreeze': 'Ваш аккаунт разморожен',
  'notifications.unFreezeReason': 'Причина разморозки "{reason}". Типы операций "{type}".',
  'notifications.verification-confirmed': '✅ Ваша заявку на верификацию подтверждена',
  'notifications.verificationReset':
    '❌ Уважаемый клиент! Ваша верификация больше недействительна. Пожалуйста, пройдите заново процедуру верификации',
  'notifications.verification-rejected': '❌ Ваша заявка на верификацию отклонена',
  'notifications.verification-rejected-ext': '❌ Ваша заявка на верификацию отклонена',
  'notifications.wallet-balance-loaded':
    '🔥 Ваш кошелек пополнен на {amount} {cryptocurrency}.\n\nТранзакция: {txid}',
  'notifications.wallet-balance-loaded-dust':
    '🔥 Ваш кошелек пополнен на {amount} {cryptocurrency}\n\nТранзакция: {txid} \n\n ⚠️ Сумма ввода менее {minAcceptableDeposit} {cryptocurrency}, в связи с этим данная транзакция не будет зачислена на ваш баланс, возмещение по данной транзакции не предусмотрено',
  'notifications.webAccountsMerged': 'Аккаунты с одинаковыми email были объединены',
  'notifications.withdrawVoucherExpireFirst':
    '⚠️ У вас есть {count} ваучер(а) на бесплатный вывод который(е) сгорают через 3 дня.\n\n🔥 Самое время ими воспользоваться и не потерять шанс бесплатного вывода монет!',
  'notifications.withdrawVoucherExpireSecond':
    '⚠️ У вас есть {count} ваучер(а) на бесплатный вывод который(е) сгорают через 1 день.\n\n🔥 Самое время ими воспользоваться и не потерять шанс бесплатного вывода монет!',
  'notifications.withdrawVoucherReceived': '  Вы получили {count} ваучеров на бесплатный вывод!',
  'notifications.withdrawVoucherReceived1': '  Вы получили {count} ваучер на бесплатный вывод!',
  'notifications.withdrawVoucherReceived234': '  Вы получили {count} ваучера на бесплатный вывод!',
  'notifications.user24hInactivityMessage':
    'Вы не активны в сервисе более 24 часов, в связи с этим, мы приостановили показ ваших объявлений до тех пор, пока Вы не вернетесь',
  'notifications.walletAddressDropped':
    '✅ Адрес Вашего {cryptocurrency} кошелька успешно сброшен!',
  'notifications.withdrawCanceled':
    'Ваш вывод на адрес {address} на сумму {amount} {cryptocurrency}, включая комиссию {fee} {cryptocurrency}, отменен.\nМонеты зачислены на баланс вашего кошелька, повторите попытку вывода в случае необходимости!',

  'page.sidebar.group.text': 'Fee Group:',
  'page.sidebar.group.value': 'Base',

  'page.body.trade.header.markets': 'Рынки',
  'page.body.trade.header.markets.content.pair': 'Пара',
  'page.body.trade.header.markets.content.price': 'Цена',
  'page.body.trade.header.markets.content.change': 'Изменение',
  'page.body.trade.header.markets.content.market': 'Пара',
  'page.body.trade.header.markets.content.last_price': 'Последняя цена',
  'page.body.trade.header.markets.content.search': 'Поиск',
  'page.body.trade.header.markets.content.volume': 'Объем',

  'page.body.trade.header.newOrder': 'Создание ордера',
  'page.body.trade.header.newOrder.content.tabs.buy': 'Купить',
  'page.body.trade.header.newOrder.content.tabs.sell': 'Продать',
  'page.body.trade.header.newOrder.content.orderType': 'Тип ордера',
  'page.body.trade.header.newOrder.content.orderType.limit': 'Лимит',
  'page.body.trade.header.newOrder.content.orderType.market': 'Рынок',
  'page.body.trade.header.newOrder.content.price': 'Цена',
  'page.body.trade.header.newOrder.content.triggerPrice': 'Trigger price {sign} Market p.',
  'page.body.trade.header.newOrder.content.amount': 'Кол.',
  'page.body.trade.header.newOrder.content.total': 'Всего',
  'page.body.trade.header.newOrder.content.minAmount': 'Мин. кол.',
  'page.body.trade.header.newOrder.content.available': 'Доступно',
  'page.body.trade.header.newOrder.content.filterPrice': 'Валидный шаг цены {priceStep}',
  'page.body.trade.header.newOrder.locked.minLevel.text':
    'Please verify your account to start trading',
  'page.body.trade.header.newOrder.locked.minLevel.buttonText': 'Verify Your Account',
  'page.body.trade.header.newOrder.locked.login.text':
    'Пожалуйста авторизируйтесь, чтобы начать торговлю',

  'error.order.create.minAmount': 'Кол-во слишком мало. Минимальное кол-во: {amount} {currency}',
  'error.order.create.minPrice': 'Цена слишком мала. Минимальная цена: {price} {currency}',
  'error.order.create.maxPrice': 'Цена слишком велика. Максимальная цена: {price} {currency}',
  'error.order.create.minTriggerPrice':
    'Trigger price is too low. Minimum price is {price} {currency}',
  'error.order.create.maxTriggerPrice':
    'Trigger price is too high. Maximum price is {price} {currency}',
  'error.order.create.available': 'Баланс превышен. Доступно {available} {currency}',

  'page.body.trade.header.marketDepths': 'Глубина рынка',
  'page.body.trade.header.marketDepths.content.price': 'Цена:',
  'page.body.trade.header.marketDepths.content.volume': 'Объем:',
  'page.body.trade.header.marketDepths.content.cumulativeVolume': 'Общий объем:',
  'page.body.trade.header.marketDepths.content.cumulativeValue': 'Общее значение:',

  'page.body.trade.toolBar.lowest': 'Наименьшая за 24',
  'page.body.trade.toolBar.lastPrice': 'Последняя цена',
  'page.body.trade.toolBar.selectMarket': 'Выберите рынок',
  'page.body.trade.toolBar.highest': 'Наивысшая за 24ч',
  'page.body.trade.toolBar.volume': 'Объем за 24ч',
  'page.body.trade.toolBar.change': 'Изменение за 24ч',

  'page.body.trade.header.asks': 'Заявки на продажу',
  'page.body.trade.header.bids': 'Заявки на покупку',
  'page.body.trade.orderbook': 'Книга ордеров',
  'page.body.trade.orderbook.lastMarket': 'Последняя рыночная цена',
  'page.body.trade.orderbook.header.price': 'Цена',
  'page.body.trade.orderbook.header.amount': 'Кол.',
  'page.body.trade.orderbook.header.volume': 'Объем',

  'page.body.trade.header.recentTrades': 'История торгов рынка',
  'page.body.trade.header.recentTrades.content.time': 'Время',
  'page.body.trade.header.recentTrades.content.price': 'Цена',
  'page.body.trade.header.recentTrades.content.amount': 'Кол.',
  'page.body.trade.header.market': 'Рыночные сделки',
  'page.body.trade.header.yours': 'Ваши сделки',

  'page.body.trade.header.openOrders': 'Активные ордера',
  'page.body.trade.header.openOrders.content.date': 'Время',
  'page.body.trade.header.openOrders.content.market': 'Пара',
  'page.body.trade.header.openOrders.content.side': 'Сторона',
  'page.body.trade.header.openOrders.content.side.buy': 'Покупка',
  'page.body.trade.header.openOrders.content.side.sell': 'Продажа',
  'page.body.trade.header.openOrders.content.type': 'Тип',
  'page.body.trade.header.openOrders.content.type.stop_loss': 'Stop-loss',
  'page.body.trade.header.openOrders.content.type.stop_limit': 'Stop-limit',
  'page.body.trade.header.openOrders.content.type.take_limit': 'Take-limit',
  'page.body.trade.header.openOrders.content.type.take_profit': 'Take-profit',
  'page.body.trade.header.openOrders.content.type.limit': 'Limit',
  'page.body.trade.header.openOrders.content.type.market': 'Market',
  'page.body.trade.header.openOrders.content.state': 'Состояние',
  'page.body.trade.header.openOrders.content.price': 'Цена',
  'page.body.trade.header.openOrders.content.amount': 'Кол.',
  'page.body.trade.header.openOrders.content.total': 'Всего',
  'page.body.trade.header.openOrders.content.trigger': 'Триггер',
  'page.body.trade.header.openOrders.content.filled': 'Заполненный',
  'page.body.trade.header.openOrders.hideOtherPairs': 'Скрыть другие пары',
  'page.body.trade.header.openOrders.lastPrice': 'Last price',

  /* Charts */
  'page.body.charts.tabs.chart': 'График',
  'page.body.charts.tabs.depth': 'Глубина рынка',

  /* Markets Table */
  'page.body.marketsTable.filter.all': 'Все',
  'page.body.marketsTable.header.pair': 'Рынок',
  'page.body.marketsTable.header.lastPrice': 'Цена',
  'page.body.marketsTable.header.change': 'Изм за 24ч',
  'page.body.marketsTable.header.high': 'Наив за 24ч',
  'page.body.marketsTable.header.low': 'Наим за 24ч',
  'page.body.marketsTable.header.volume': 'Объем за 24ч',

  /* Landing */
  'page.body.landing.header.button1': 'profile',
  'page.body.landing.header.button2': 'log in',
  'page.body.landing.header.button3': 'Зарегистрироваться',

  'page.body.landing.marketInfo.title.text1': 'Welcome',
  'page.body.landing.marketInfo.title.text2': 'Торгуйте криптовалютой легко',
  'page.body.landing.marketInfo.title.button': 'Перейти к торговле',

  'page.body.landing.platformInfo.item.first.value': '30M+',
  'page.body.landing.platformInfo.item.first.title': 'пользователей',
  'page.body.landing.platformInfo.item.second.value': '$3M+',
  'page.body.landing.platformInfo.item.second.title': 'ежемесячный оборот',
  'page.body.landing.platformInfo.item.third.value': '101',
  'page.body.landing.platformInfo.item.third.title': 'доступно страны',

  'page.body.landing.register.item.title': 'Независимо от вашего уровня опыта',
  'page.body.landing.register.item.text':
    'Предлагаем интуитивно понятный интерфейс с книгами заказов в реальном времени, инструментами построения графиков, историей торговли и простым процессом заказа, поэтому вы можете торговать с первого дня',
  'page.body.landing.register.item.button': 'register',

  'page.body.landing.features.title': 'Возможности платформы',
  'page.body.landing.features.features.item1.title': 'Обмен',
  'page.body.landing.features.features.item2.title': 'Типы ордеров',
  'page.body.landing.features.features.item3.title': 'Настраиваемый интерфейс',
  'page.body.landing.features.features.item4.title': 'Безопасность',
  'page.body.landing.features.features.item5.title': 'Сообщество',
  'page.body.landing.features.features.item6.title': 'Ведущий в отрасли API',
  'page.body.landing.features.features.item1.text':
    'Платформа предлагает ликвидную книгу ордеров, позволяющую пользователям легко обменивать Bitcoin, Ethereum, EOS, Litecoin, Ripple, NEO и многие другие цифровые активы с минимальным проскальзыванием.',
  'page.body.landing.features.features.item2.text':
    'Платформа предлагает набор типов ордеров, чтобы дать трейдерам инструменты, необходимые для каждого сценария. Узнайте больше о наших самых передовых типах алгоритмических ордеров.',
  'page.body.landing.features.features.item3.text':
    'Организуйте свое рабочее пространство в соответствии со своими потребностями: составьте макет, выберите между темами, настройте уведомления и параметры данных.',
  'page.body.landing.features.features.item4.text':
    'Безопасность пользовательской информации и средств - наш главный приоритет. Свяжитесь с нами, чтобы узнать больше о наших функциях безопасности и интеграции',
  'page.body.landing.features.features.item5.text':
    'Присоединяйтесь к глобальному сообществу, которое верит в силу криптовалюты.',
  'page.body.landing.features.features.item6.text':
    'Наш веб-канал позволяет легко получить доступ к рыночным данным в реальном времени, а наш торговый API позволяет разрабатывать безопасных программных торговых ботов.',

  'page.body.landing.tradeOnTheGo.item.title': 'Trade on the go',
  'page.body.landing.tradeOnTheGo.item.text1':
    'Our platform is optimized for trading on any device.',
  'page.body.landing.tradeOnTheGo.item.text2':
    'And you don’t need to download any additional applications.',
  'page.body.landing.tradeOnTheGo.item.text3':
    'All the power of Bitzlato cryptocurrency exchange, in the palm of your hand.',
  'page.body.landing.tradeOnTheGo.item.button': 'let’s try',

  'page.body.landing.startTrading.title': 'Start trading now',
  'page.body.landing.startTrading.button1': 'register',
  'page.body.landing.startTrading.button2': 'Start trading',

  'page.body.landing.footer.exchange': 'Биржа',
  'page.body.landing.footer.fees': 'Комиссии',
  'page.body.landing.footer.faq': 'FAQ',
  'page.body.landing.footer.support': 'Поддержка',
  'page.body.landing.footer.about': 'О нас',
  'page.body.landing.footer.blog': 'Блог',
  'page.body.landing.footer.api': 'API',
  'page.body.landing.footer.reviews': 'Отзывы о платформе',
  'page.body.landing.footer.p2p': 'P2P обмен',
  'page.body.landing.footer.paymentGateway': 'Платежный шлюз',
  'page.body.landing.footer.cryptoloan': 'Кредитование',
  'page.body.landing.footer.rights': 'Bitzlato © All rights reserved.',

  'pagy.body.footer.powered_by': 'Сделано',

  /* Error pages */

  'page.body.restricted': 'Страница не найдена',
  'page.body.500.maintenance': 'Платформа находится на обслуживании',
  'page.body.500.availableSoon': 'Платформа будет доступна как можно скорее',

  /* Wallets */
  'page.body.wallets.estimated_value': 'Оценочная стоимость',

  'page.body.wallets.locked': 'Заблокировано',
  'page.body.wallets.balance': 'Баланс',
  'page.body.wallets.tabs.deposit': 'Пополнить',
  'page.body.wallets.tabs.deposit.disabled.message': 'Депозит был отключен администрацией',
  'page.body.wallets.warning.deposit.verification':
    'Deposits are allowed after passing KYC verification',
  'page.body.wallets.warning.deposit.verification.button': 'Verify Your Account',
  'page.body.wallets.tabs.deposit.ccy.message.submit':
    'Пожалуйста, внесите депозитный платеж. Ваш депозит будет доступен после {confirmations} подтверждений',
  'page.body.wallets.tabs.deposit.ccy.message.address': 'Пополнить кошелек',
  'page.body.wallets.tabs.deposit.ccy.message.success': 'Адрес скопирован',
  'page.body.wallets.tabs.deposit.ccy.message.minimum': 'Минимальная сумма депозита',
  'page.body.wallets.tabs.deposit.ccy.message.fee': 'Комиссия',
  'page.body.wallets.tabs.deposit.ccy.message.fee.free': 'Бесплатно',
  'page.body.wallets.tabs.deposit.ccy.message.warning':
    'Внесённый вами актив будет потерян, если сумма депозита меньше минимальной',
  'page.body.wallets.tabs.deposit.ccy.button.create': 'Создать депозит',

  'page.body.wallets.tabs.deposit.ccy.message.pending': 'Генерация адреса',

  'page.body.wallets.tabs.deposit.fiat.message1':
    'Вы можете внести депозит в банке, используя следующие реквизиты',
  'page.body.wallets.tabs.deposit.fiat.message2':
    'Пожалуйста, используйте предоставленную информацию для завершения банковского платежа. Ваш депозит станет доступным на протяжении 2-х рабочих дней.',
  'page.body.wallets.tabs.deposit.fiat.bankName': 'Название банка',
  'page.body.wallets.tabs.deposit.fiat.accountNumber': 'Номер счета',
  'page.body.wallets.tabs.deposit.fiat.accountName': 'Имя счета',
  'page.body.wallets.tabs.deposit.fiat.phoneNumber': 'Номер телефона',
  'page.body.wallets.tabs.deposit.fiat.referenceCode': 'Ваш уникальный код',
  'page.body.wallets.tabs.deposit.fiat.admin':
    'Для того, чтобы вывести эту валюту, обратитесь к администратору!',
  'page.body.wallets.table.pending': 'Обрабатывается',
  'page.body.wallets.table.rejected': 'Отклонен',
  'page.body.wallets.table.invoiced': 'Invoiced',

  'page.body.wallets.tabs.withdraw': 'Вывод',
  'page.body.wallets.tabs.withdraw.content.amount': 'Сумма вывода',
  'page.body.wallets.tabs.withdraw.content.code2fa': '2FA код',
  'page.body.wallets.tabs.withdraw.content.fee': 'Комиссия',
  'page.body.wallets.tabs.withdraw.content.total': 'Сумма вывода',
  'page.body.wallets.tabs.withdraw.content.min': 'Минимальная сумма вывода',
  'page.body.wallets.tabs.withdraw.content.limit24h': 'Лимит на вывод за 24ч',
  'page.body.wallets.tabs.withdraw.content.limit1month': 'Лимит на вывод за 1 месяц',
  'page.body.wallets.tabs.withdraw.content.unlimited': 'Неограниченный',
  'page.body.wallets.tabs.withdraw.content.button': 'Вывести',

  'withdraw.from_balance': 'Вывод с баланса',
  'withdraw.use_voucher': 'Используйте ваучер',
  'withdraw.use_voucher_notice': 'С помощью ваучера вы можете снять деньги без комиссии',
  'withdraw.active_vouchers': 'Активные ваучеры',
  'withdraw.available_balance': 'Доступно для вывода',
  'withdraw.will_deducted': 'будет списана с остатка',
  'Should be more than': 'Должно быть больше {value}',
  Dynamic: 'Динамическая',

  'page.body.wallets.tabs.withdraw.disabled.message': 'Вывод средств был отключен администрацией',
  'page.body.wallets.warning.withdraw.verification':
    'Withdraws are allowed after passing KYC verification',
  'page.body.wallets.warning.withdraw.verification.button': 'Verify Your Account',

  'page.body.wallets.tabs.withdraw.modal.confirmation': 'Подтверждение',
  'page.body.wallets.tabs.withdraw.modal.message1': 'Вы получите ',
  'page.body.wallets.tabs.withdraw.modal.message2': ' на кошелек',
  'page.body.wallets.tabs.withdraw.modal.button.cancel': 'Отменить',
  'page.body.wallets.tabs.withdraw.modal.button.withdraw': 'Вывести',

  'page.body.wallets.tabs.withdraw.content.enable2fa':
    'Вам нужно активировать 2FA, чтобы получить возможность выводить Ваши валюты!',
  'page.body.wallets.tabs.withdraw.content.enable2faButton': 'Активировать 2FA',

  'success.beneficiaries.created': 'Получатель успешно создан',
  'success.beneficiaries.activated': 'Получатель успешно активирован',
  'success.beneficiaries.deleted': 'Получатель успешно удалён',
  'success.beneficiaries.resent_pin': 'Пин-код отправлен повторно',
  'error.beneficiaries.max10.addresses': 'Вы можете создать до 10 адресов для списания',

  'success.deposits.created': 'Создано намерение депонировать',

  'page.body.wallets.beneficiaries.title': 'Адрес вывода',
  'page.body.wallets.beneficiaries.fiat.title': 'Withdrawal details',
  'page.body.wallets.beneficiaries.dropdown.address': 'Адрес',
  'page.body.wallets.beneficiaries.dropdown.select': 'Выбрать',
  'page.body.wallets.beneficiaries.dropdown.name': 'Название',
  'page.body.wallets.beneficiaries.dropdown.pending': 'Ожидает подтверждения',

  'page.body.wallets.beneficiaries.dropdown.fiat.account': 'Account',
  'page.body.wallets.beneficiaries.dropdown.fiat.bankOfBeneficiary': 'Bank of Beneficiary',
  'page.body.wallets.beneficiaries.dropdown.fiat.beneficiary': 'Beneficiary',
  'page.body.wallets.beneficiaries.dropdown.fiat.description': 'Description',
  'page.body.wallets.beneficiaries.dropdown.fiat.name': 'Name',
  'page.body.wallets.beneficiaries.dropdown.fiat.fullName': 'Full Name',

  'page.body.wallets.beneficiaries.addAddress': 'Добавить адрес',
  'page.body.wallets.beneficiaries.addAddressModal.header': 'Добавить новый кошелек для вывода',

  'page.body.wallets.beneficiaries.addAddressModal.body.coinAddress': 'Адрес кошелька',
  'page.body.wallets.beneficiaries.addAddressModal.body.bitzlatoAddress': 'Bitzlato Public Name',
  'page.body.wallets.beneficiaries.addAddressModal.body.invalidAddress': 'Invalid Address',
  'page.body.wallets.beneficiaries.addAddressModal.body.testnetAddress':
    'WARNING! This is testnet address',
  'page.body.wallets.beneficiaries.addAddressModal.body.coinBeneficiaryName':
    'Название адреса (пример Bitzlato Telegram)',
  'page.body.wallets.beneficiaries.addAddressModal.body.coinDescription': 'Description (optional)',
  'page.body.wallets.beneficiaries.addAddressModal.body.coinDestinationTag':
    'Destination Tag (optional)',

  'page.body.wallets.beneficiaries.addAddressModal.body.fiatName': 'Beneficiary Name',
  'page.body.wallets.beneficiaries.addAddressModal.body.fiatFullName': 'Full Name',
  'page.body.wallets.beneficiaries.addAddressModal.body.fiatAccountNumber': 'Account Number',
  'page.body.wallets.beneficiaries.addAddressModal.body.fiatBankName': 'Bank Name',
  'page.body.wallets.beneficiaries.addAddressModal.body.fiatBankSwiftCode':
    'Bank Swift Code (optional)',
  'page.body.wallets.beneficiaries.addAddressModal.body.fiatIntermediaryBankName':
    'Intermediary Bank Name (optional)',
  'page.body.wallets.beneficiaries.addAddressModal.body.fiatIntermediaryBankSwiftCode':
    'Intermediary Bank Swift Code (optional)',

  'page.body.wallets.beneficiaries.addAddressModal.body.button': 'Подтвердить',

  'page.body.wallets.beneficiaries.confirmationModal.header': 'Подтверждение нового адреса',
  'page.body.wallets.beneficiaries.confirmationModal.body.text':
    'Вам на почту отправлен пин-код, для подтверждения нового адреса, пожалуйста, укажите его ниже:',
  'page.body.wallets.beneficiaries.confirmationModal.body.confirmationModalCode': 'Пин-код',
  'page.body.wallets.beneficiaries.confirmationModal.body.resendButton': 'Выслать повторно',
  'page.body.wallets.beneficiaries.confirmationModal.body.button': 'Подтвердить',

  'page.body.wallets.beneficiaries.tipAddress': 'Address',
  'page.body.wallets.beneficiaries.tipName': 'Name',
  'page.body.wallets.beneficiaries.tipDescription': 'Note',

  'page.body.wallets.beneficiaries.failAddModal.header': 'Warning',
  'page.body.wallets.beneficiaries.failAddModal.content':
    'You need to confirm your account to add a beneficiary',
  'page.body.wallets.beneficiaries.failAddModal.button': 'Confirm phone',

  'page.body.wallets.deposits.metamask': 'Пополнить через Metamask',
  'page.body.wallets.deposits.addDepositModal.header': 'Укажите сумму пополнения',
  'page.body.wallets.deposits.addDepositModal.body.button': 'Отправить',
  'page.body.wallets.deposits.addDepositModal.body.invalidAmount': 'Недопустимое значение',
  'page.body.wallets.deposits.addDepositModal.amount': 'Сумма пополнения',

  'page.body.wallets.transfers.state.transfered': 'Выполнен',
  'page.body.wallets.transfers.state.canceled': 'Отменен',
  'page.body.wallets.transfers.state.processing': 'Обрабатывается',

  'page.body.openOrders.tab.all': 'Все',
  'page.body.openOrders.tab.open': 'Открытые',
  'page.body.openOrders.header.date': 'Дата',
  'page.body.openOrders.header.market': 'Маркет',
  'page.body.openOrders.header.side': 'Сторона',
  'page.body.openOrders.header.side.buy': 'Покупка',
  'page.body.openOrders.header.side.sell': 'Продажа',
  'page.body.openOrders.header.orderType': 'Тип',
  'page.body.openOrders.header.avgPrice': 'Ср. цена',
  'page.body.openOrders.header.price': 'Цена',
  'page.body.openOrders.header.amount': 'Кол-во',
  'page.body.openOrders.header.value': 'Стоимость',
  'page.body.openOrders.header.trigger': 'Триггер',
  'page.body.openOrders.header.filled': 'Заполненный',
  'page.body.openOrders.header.status': 'Статус',
  'page.body.openOrders.content.status.done': 'Выполнен',
  'page.body.openOrders.content.status.wait': 'Открыт',
  'page.body.openOrders.content.status.cancel': 'Отменен',
  'page.body.openOrders.content.status.reject': 'Отклонен',
  'page.body.openOrders.header.button.cancelAll': 'Отменить все',
  'page.body.openOrders.header.button.refresh': 'Обновить',

  'page.body.history.deposit': 'История депозитов',
  'page.body.history.deposit.header.txid': 'txID',
  'page.body.history.deposit.header.date': 'Дата',
  'page.body.history.deposit.header.currency': 'Валюта',
  'page.body.history.deposit.header.amount': 'Количество',
  'page.body.history.deposit.header.status': 'Статус',
  'page.body.history.deposit.content.status.accepted': 'Принят',
  'page.body.history.deposit.content.status.collected': 'Обработан',
  'page.body.history.deposit.content.status.submitted': 'Отправлен',
  'page.body.history.deposit.content.status.canceled': 'Отменен',
  'page.body.history.deposit.content.status.rejected': 'Отвергнут',
  'page.body.history.deposit.content.status.skipped': 'Пропущен',
  'page.body.history.deposit.content.status.processing': 'Обрабатывается',
  'page.body.history.deposit.content.status.fee_processing': 'Обрабатывается',
  'page.body.history.deposit.content.status.errored': 'Ошибка',
  'page.body.history.deposit.content.status.refunding': 'Возврат',
  'page.body.history.deposit.content.status.wait_payment': 'Ожидается оплата',
  'page.body.history.deposit.content.status.confirmed': 'Выполнен',
  'page.body.history.deposit.content.status.confirming': 'Подтвержение',

  'page.body.history.withdraw': 'История выводов',
  'page.body.history.withdraw.header.id': 'ID',
  'page.body.history.withdraw.header.date': 'Дата',
  'page.body.history.withdraw.header.currency': 'Валюта',
  'page.body.history.withdraw.header.address': 'Адрес',
  'page.body.history.withdraw.header.amount': 'Сумма',
  'page.body.history.withdraw.header.fee': 'Комиссия',
  'page.body.history.withdraw.header.status': 'Статус',
  'page.body.history.withdraw.content.status.prepared': 'Подготовлен',
  'page.body.history.withdraw.content.status.submitted': 'Отправлен',
  'page.body.history.withdraw.content.status.skipped': 'Принят',
  'page.body.history.withdraw.content.status.canceled': 'Отменен',
  'page.body.history.withdraw.content.status.accepted': 'Принят',
  'page.body.history.withdraw.content.status.suspected': 'Просматривается',
  'page.body.history.withdraw.content.status.rejected': 'Отвергнут',
  'page.body.history.withdraw.content.status.processing': 'Обрабатывается',
  'page.body.history.withdraw.content.status.succeed': 'Выполнен',
  'page.body.history.withdraw.content.status.failed': 'Неудачный',
  'page.body.history.withdraw.content.status.confirming': 'Подтверждается',
  'page.body.history.withdraw.content.status.errored': 'Ошибка',
  'page.body.history.withdraw.content.status.under_review': 'На рассмотрении',

  'page.body.history.transfer': 'История трансферов',
  'page.body.history.transfer.header.date': 'Дата',
  'page.body.history.transfer.header.amount': 'Количество',
  'page.body.history.transfer.header.currency': 'Валюта',
  'page.body.history.transfer.header.direction': 'Направление',
  'page.body.history.transfer.header.toAccount': 'На аккаунт',
  'page.body.history.transfer.header.status': 'Статус',
  'page.body.history.transfer.content.status.completed': 'Completed',

  'page.body.history.trade': 'История ордеров',
  'page.body.history.trade.header.id': 'ID',
  'page.body.history.trade.header.date': 'Дата',
  'page.body.history.trade.header.side': 'Тип',

  'page.body.history.trade.content.side.buy': 'Купля',
  'page.body.history.trade.content.side.sell': 'Продажа',

  'page.body.history.trade.header.market': 'Рынок',
  'page.body.history.trade.header.price': 'Цена',
  'page.body.history.trade.header.total': 'Всего',
  'page.body.history.trade.header.amount': 'Кол.',
  'page.body.history.trade.header.balance': 'Баланс',

  'page.body.history.quick': 'Быстрый обмен',

  'page.body.profile.header.account': 'Профиль',

  'page.body.profile.header.account.username': 'Никнейм',
  'page.body.profile.header.account.content.password': 'Пароль',
  'page.body.profile.header.account.content.password.button.change': 'Изменить',
  'page.body.profile.header.account.content.password.old': 'Старый пароль',
  'page.body.profile.header.account.content.password.new': 'Новый пароль',
  'page.body.profile.header.account.content.password.button.save': 'Сохранить',
  'page.body.profile.header.account.content.password.button.cancel': 'Отменить',
  'page.body.profile.header.account.content.password.conf': 'Подтверждение пароля',
  'page.body.profile.header.account.content.password.dont.match': 'Пароли не совпадают',
  'page.body.profile.header.account.content.password.change.success': 'Успешно!',
  'page.body.profile.header.account.content.password.change': 'Смена пароля',

  'page.body.profile.header.account.content.twoFactorAuthentication':
    'Двухфакторная аутентификация',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.enable': 'Включен',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.disable': 'Отключен',
  'page.body.profile.header.account.content.twoFactorAuthentication.header': 'Google Authenticator',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.1':
    'Скачайте и установите приложение Google Authenticator с ',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.or': 'или ',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.2':
    'Отсканируйте QR код или используйте код MFA:',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.3':
    '* Сохраните этот код в надежном месте. Он может быть использован для доступа 2FA кода с разных устройств.',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.mfa': 'MFA код',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.4':
    'Введите 2FA код с приложения',
  'page.body.profile.header.account.content.twoFactorAuthentication.enable': 'Включить',
  'page.body.profile.header.account.content.twoFactorAuthentication.disable': 'Отключить 2FA',
  'page.body.profile.header.account.content.twoFactorAuthentication.modalBody':
    'Пожалуйста, обратитесь с администратором, чтобы отключить 2FA',
  'page.body.profile.header.account.content.twoFactorAuthentication.modalHeader':
    'Двухфакторная аутентификация включена',

  'page.body.profile.header.account.profile': 'Верификация профиля',
  'page.body.profile.header.account.profile.email.title': 'Почта - подтверждено',
  'page.body.profile.header.account.profile.email.message': 'Депозиты и вывод средств не разрешены',
  'page.body.profile.header.account.profile.phone.unverified.title': 'Телефон - подтвердить',
  'page.body.profile.header.account.profile.phone.title': 'Телефон - подтверждено',
  'page.body.profile.header.account.profile.phone.message': 'Депозиты и торги разрешены',
  'page.body.profile.header.account.profile.identity.unverified.title': 'Личность - подтвердить',
  'page.body.profile.header.account.profile.identity.title': 'Личность - подтверждено',
  'page.body.profile.header.account.profile.identity.message': 'Вывод средств разрешен',

  'page.body.profile.header.referralProgram': 'Реферальная программа',
  'page.body.profile.content.copyLink': 'Скопировать',

  'page.body.profile.apiKeys.header.create': 'Создать',

  'page.body.profile.apiKeys.noOtp': 'Пожалуйста, включите двухфакторную аутентификацию',
  'page.body.profile.apiKeys.show': 'Показать',
  'page.body.profile.apiKeys.noKeys': 'У Вас нет API ключей',

  'page.body.profile.apiKeys.modal.btn.show': 'Показать',
  'page.body.profile.apiKeys.modal.btn.create': 'Создать',
  'page.body.profile.apiKeys.modal.btn.copy': 'Копировать',
  'page.body.profile.apiKeys.modal.btn.activate': 'Активировать',
  'page.body.profile.apiKeys.modal.btn.disabled': 'Откл.',
  'page.body.profile.apiKeys.modal.btn.delete': 'Удалить',
  'page.body.profile.apiKeys.modal.header': 'Двухфакторная аутентификация',
  'page.body.profile.apiKeys.modal.created_header': 'Создано',
  'page.body.profile.apiKeys.modal.access_key': 'Ключ доступа',
  'page.body.profile.apiKeys.modal.secret_key': 'Секретный ключ',
  'page.body.profile.apiKeys.modal.secret_key_info':
    'Эта информация видна только один раз и не сможет быть восстановлена',
  'page.body.profile.apiKeys.modal.secret_key_store': 'Пожалуйста, сохраните это надежно',
  'page.body.profile.apiKeys.modal.note': 'Внимание',
  'page.body.profile.apiKeys.modal.note_content': `Для сохранности средств, не сообщайте свой Секретный и ключ Доступа другим.
    Если Вы забыли свой Секретный ключ, удалите его и создайте новую пару ключей.`,
  'page.body.profile.apiKeys.modal.title': 'Введите 2FA код с приложения',

  'page.body.profile.apiKeys.table.header.kid': 'Kid',
  'page.body.profile.apiKeys.table.header.algorithm': 'Алгоритм',
  'page.body.profile.apiKeys.table.header.state': 'Состояние',
  'page.body.profile.apiKeys.table.header.created': 'Создан',
  'page.body.profile.apiKeys.table.header.updated': 'Обновлен',

  'success.api_keys.fetched': 'API ключи получены',
  'success.api_keys.created': 'API ключ успешно создан',
  'success.api_keys.copied.access': 'Ключ Доступа скопирован',
  'success.api_keys.copied.secret': 'Секретный ключ скопирован',
  'success.api_keys.updated': 'API ключ успешно обновлен',
  'success.api_keys.deleted': 'API ключ успешно удален',

  'page.body.profile.header.accountActivity': 'Активность аккаунта',
  'page.body.profile.header.accountActivity.content.date': 'Дата',
  'page.body.profile.header.accountActivity.content.addressip': 'IP адрес',
  'page.body.profile.header.accountActivity.content.action': 'Действие',
  'page.body.profile.header.accountActivity.content.result': 'Результат',
  'page.body.profile.header.accountActivity.content.userAgent': 'Браузер',

  'page.body.profile.content.action.login': 'Вход в систему',
  'page.body.profile.content.action.logout': 'Выход',
  'page.body.profile.content.action.request2fa': 'Запрошен QR-код для 2FA',
  'page.body.profile.content.action.enable2fa': 'Активация 2FA',
  'page.body.profile.content.action.disable2fa': 'Отключение 2FA',
  'page.body.profile.content.action.login.2fa': 'Вход в систему с 2FA',
  'page.body.profile.content.action.requestPasswordReset': 'Запрос на сброс пароля',
  'page.body.profile.content.action.passwordReset': 'Сброс пароля',

  'page.body.profile.content.result.succeed': 'Успешно',
  'page.body.profile.content.result.failed': 'Ошибка',
  'page.body.profile.content.result.denied': 'Отказано',

  /* Profile - verification */
  'page.body.profile.verification.email.title': 'Почта',
  'page.body.profile.verification.email.subtitle': 'Вывод средств разрешен',
  'page.body.profile.verification.email.rejected.tooltip': 'Your email was rejected',
  'page.body.profile.verification.phone.title': 'Verify Phone number',
  'page.body.profile.verification.phone.subtitle': 'To allow Deposits and Trades',
  'page.body.profile.verification.phone.rejected.tooltip': 'Your phone was rejected',
  'page.body.profile.verification.profile.title': 'Complete your profile',
  'page.body.profile.verification.profile.subtitle': ' ',
  'page.body.profile.verification.profile.rejected.tooltip': 'Your profile was rejected',
  'page.body.profile.verification.document.title': 'Verify your Identity',
  'page.body.profile.verification.document.subtitle': 'Increase Withdrawal limit to 10 BTC',
  'page.body.profile.verification.document.rejected.tooltip': 'Your identity was rejected',
  'page.body.profile.verification.address.title': 'Verify Proof of residence',
  'page.body.profile.verification.address.subtitle': 'Increase Withdrawal limit to 100 BTC',
  'page.body.profile.verification.address.rejected.tooltip': 'Your proof of residence was rejected',
  'page.body.profile.verification.pending': 'Pending',
  'page.body.profile.verification.reverify': 'Reverify',
  'page.body.profile.verification.verify': 'Verify',
  'page.body.profile.verification.verified': 'Подтверждено',
  'page.body.profile.verification.progress.level': 'Уровень',
  'page.body.profile.verification.progress.tooltip.email.default':
    'Email address to to get level 1 and allow Withdrawal',
  'page.body.profile.verification.progress.tooltip.email.rejected': 'Your email was rejected',
  'page.body.profile.verification.progress.tooltip.email.pending':
    'Email address verification may take 1-3 business days.',
  'page.body.profile.verification.progress.tooltip.phone.default':
    'Verify Phone number to get level 2 and allow Deposits and Trades',
  'page.body.profile.verification.progress.tooltip.phone.rejected': 'Your phone was rejected',
  'page.body.profile.verification.progress.tooltip.phone.pending':
    'Phone number verification may take 1-3 business days.',
  'page.body.profile.verification.progress.tooltip.profile.default':
    'Complete your profile to get level 3 and Increase Withdrawal limit to 1 BTC',
  'page.body.profile.verification.progress.tooltip.profile.rejected': 'Your profile was rejected',
  'page.body.profile.verification.progress.tooltip.profile.pending':
    'Profile verification may take 1-3 business days.',
  'page.body.profile.verification.progress.tooltip.document.default':
    'Verify you identity to get level 4 and Increase Withdrawal limit to 10 BTC',
  'page.body.profile.verification.progress.tooltip.document.rejected': 'Your identity was rejected',
  'page.body.profile.verification.progress.tooltip.document.pending':
    'Identity verification may take 1-3 business days.',
  'page.body.profile.verification.progress.tooltip.address.default':
    'Verify Proof of residence to get level 5 and Increase Withdrawal limit to 100 BTC',
  'page.body.profile.verification.progress.tooltip.address.rejected':
    'Your proof of residence was rejected',
  'page.body.profile.verification.progress.tooltip.address.pending':
    'Proof of residence verification may take 1-3 business days.',

  /* KYC */
  'page.confirm.title.email': 'Get Verified your email',
  'page.confirm.title.phone': 'Get Verified your phone number',
  'page.confirm.title.profile': 'Get Verified your Profile',
  'page.confirm.title.document': 'Get Verified your Government Issued ID ',
  'page.confirm.title.address': 'Residence verification',
  'page.confirm.title.warning': 'Please, provide all the information in English language',

  'page.body.kyc.phone.phoneNumber': 'Phone number',
  'page.body.kyc.phone.code': 'Enter code that you received',
  'page.body.kyc.phone.send': 'Send code',
  'page.body.kyc.phone.resend': 'Resend code',

  'page.body.kyc.documents.country': 'Issuing country',
  'page.body.kyc.documents.country.placeholder': 'Select country',
  'page.body.kyc.documentsType': 'Select ID type',
  'page.body.kyc.documentsType.placeholder': 'Select',
  'page.body.kyc.documents.idNumber': 'ID number',
  'page.body.kyc.documents.idNumber.placeholder': 'Your ID number',
  'page.body.kyc.documents.issuedDate': 'Issued date',
  'page.body.kyc.documents.issuedDate.placeholder': 'DD / MM / YYYY',
  'page.body.kyc.documents.expiryDate': 'Expiry date (optional)',
  'page.body.kyc.documents.expiryDate.placeholder': 'DD / MM / YYYY',

  'page.body.kyc.documents.uploadFile.front.title': 'Front of ID card',
  'page.body.kyc.documents.uploadFile.front.label':
    'Please upload a copy of your valid ID card (Photo or scan)',
  'page.body.kyc.documents.uploadFile.front.button': 'Upload',
  'page.body.kyc.documents.uploadFile.front.formats': 'JPG, JPEG, PNG, PDF formats',
  'page.body.kyc.documents.uploadFile.back.title': 'Back of ID card',
  'page.body.kyc.documents.uploadFile.back.label':
    'Please upload a copy of your valid ID card (Photo or scan)',
  'page.body.kyc.documents.uploadFile.back.button': 'Upload',
  'page.body.kyc.documents.uploadFile.back.formats': 'JPG, JPEG, PNG, PDF formats',
  'page.body.kyc.documents.uploadFile.selfie.title': 'Selfie image',
  'page.body.kyc.documents.uploadFile.selfie.label':
    'Please upload a photo of you holding your document',
  'page.body.kyc.documents.uploadFile.selfie.button': 'Upload',
  'page.body.kyc.documents.uploadFile.selfie.formats': 'JPG, JPEG, PNG, PDF formats',

  'page.body.kyc.address.address': 'Address',
  'page.body.kyc.address.address.placeholder': 'Your address',
  'page.body.kyc.address.city': 'City',
  'page.body.kyc.address.city.placeholder': 'Your city',
  'page.body.kyc.address.postcode': 'Postcode (ZIP)',
  'page.body.kyc.address.postcode.placeholder': 'Your Postcode',
  'page.body.kyc.address.uploadFile.title': 'Proof of Address',
  'page.body.kyc.address.uploadFile.label':
    'Please upload a Utility bill with your Address (Photo or scan)',
  'page.body.kyc.address.uploadFile.button': 'Upload',
  'page.body.kyc.address.uploadFile.sizeMinMax':
    'Minimum file size is {min}MB, maximum file size is {value}MB',
  'page.body.kyc.address.uploadFile.sizeMax': 'Maximum file size is {value}MB',
  'page.body.kyc.address.uploadFile.formats': 'JPG, JPEG, PNG, PDF formats',
  'page.body.kyc.address.uploadFile.tip':
    'Please take a photo or scan of a utility bill showing your name/surname and your address. For the verification to work, the bill must be issued in your name and less than a 3 months ago',

  'page.body.kyc.phone.head': 'Подтверждение телефона',
  'page.body.kyc.phone.enterPhone': 'Введите свой номер телефона',
  'page.body.kyc.phone.enterCode': 'Введите код, который Вы получили',
  'page.body.kyc.identity.firstName': 'Ваше имя',
  'page.body.kyc.identity.lastName': 'Ваша фамилия',
  'page.body.kyc.identity.dateOfBirth': 'Дата рождения',
  'page.body.kyc.identity.dateOfBirth.placeholder': 'ДД/ММ/ГГГГ',
  'page.body.kyc.identity.CoR': 'Страна проживания',
  'page.body.kyc.identity.residentialAddress': 'Место проживания',
  'page.body.kyc.identity.city': 'Город',
  'page.body.kyc.identity.postcode': 'Почтовый индекс',
  'page.body.kyc.documents.drag': 'Перетащите или загрузите файлы',
  'page.body.kyc.documents.maxFile': 'Максимальный размер 10MB',
  'page.body.kyc.documents.maxNum': 'Максимальное число 5',
  'page.body.kyc.documents.upload': 'Загрузите свое удостоверение личности с фотографией',
  'page.body.kyc.documents.number': ': Номер документа',

  'page.body.kyc.documents.select.passport': 'Паспорт',
  'page.body.kyc.documents.select.identityCard': 'Удостоверение личности',
  'page.body.kyc.documents.select.driverLicense': 'Водительское удостоверение',
  'page.body.kyc.documents.select.utilityBill': 'Коммунальная квитанция',

  'page.body.kyc.next': 'Дальше',
  'page.body.kyc.submit': 'Отправить',
  'page.body.kyc.head.phone': 'Верификация телефона',
  'page.body.kyc.head.identity': 'Верификация личности',
  'page.body.kyc.head.document': 'Верификация документов',
  'page.body.kyc.uploadFile.error.tooBig': 'The size of selected file is too big ({value}KB)',
  'page.body.kyc.uploadFile.error.tooSmall': 'The size of selected file is too small ({value}KB)',

  'page.body.lock.oops': 'Ой!',
  'page.body.lock.expired': 'Похоже, что ваш пробный период истек',
  'page.body.lock.license': 'Похоже, что лицензионный ключ не верный',
  'page.body.lock.visit': 'Перейти на',

  'page.footer.legalDocuments': 'Документы',
  'page.footer.faq': 'Помощь',
  'page.footer.information': 'Информация',
  'page.footer.products': 'Продукты',
  'page.footer.company': 'Компания',

  'page.header.signIn': 'Войти',
  'page.header.signIn.email': 'Почта',
  'page.header.signIn.password': 'Пароль',
  'page.header.signIn.password.message.error': 'Неправильный пароль',
  'page.header.signIn.receiveConfirmation': 'Не получили подтверждение по электронной почте?',
  'page.header.signIn.forgotPassword': 'Забыли пароль?',
  'page.header.signIn.resetPassword.title': 'Сброс пароля',
  'page.header.signIn.resetPassword.newPassword': 'Новый пароль',
  'page.header.signIn.resetPassword.repeatPassword': 'Повторите пароль',
  'page.header.signIn.resetPassword.button': 'Сбросить',
  'page.header.signIn.resetPassword.error': 'Поля пустые или не совпадают',

  'page.header.signUp': 'Регистрация',
  'page.header.signUp.username.minLength.error':
    'Пожалуйста, введите больше символов. Минимальное колисчество символов - 4',
  'page.header.signUp.username.maxLength.error':
    'Пожалуйста, введите меньше символов. Максимальное колисчество символов - 12',
  'page.header.signUp.username.uniqueness.error': 'This username is already taken',
  'page.header.signUp.email': 'Почта',
  'page.header.signUp.email.message.error': 'Почта недействительная',
  'page.header.signUp.password': 'Пароль',
  'page.header.signUp.password.message.error':
    'Пароль должен содержать не менее 8 символов и не менее одной заглавной буквы и цифры',
  'page.header.signUp.confirmPassword': 'Подтвердить пароль',
  'page.header.signUp.confirmPassword.message.error': 'Пароли не совпадают',
  'page.header.signUp.referalCode': 'Промо-код',
  'page.header.signUp.agree': 'Я прочитал и принимаю {terms}',
  'page.header.signUp.terms': 'Условия использования',
  'page.header.signUp.modal.header': 'Проверьте свой адрес электронной почты',
  'page.header.signUp.modal.body':
    'Чтобы завершить регистрацию, найдите в своем' +
    ' почтовом ящике электронное письмо с дальнейшими инструкциями. ' +
    'Если вы не можете найти адрес электронной почты, проверьте свою' +
    ' электронную почту со спамом.',
  'page.header.signUp.modal.body2':
    'Чтобы завершить регистрацию, найдите в своем' +
    ' почтовом ящике {email} электронное письмо с дальнейшими инструкциями. ' +
    'Если вы не можете найти адрес электронной почты, проверьте свою' +
    ' электронную почту со спамом.',
  'page.header.signUp.modal.footer': 'OK',
  'page.header.signUp.strength.password': 'Надежность пароля',
  'page.header.signUp.password.too.weak': 'Слишком слабый',
  'page.header.signUp.password.weak': 'Слабый',
  'page.header.signUp.password.good': 'Хороший',
  'page.header.signUp.password.strong': 'Сильный',
  'page.header.signUp.password.very.strong': 'Очень сильный',
  'page.resendConfirmation': 'Отправить подтверждение снова',
  'page.forgotPassword': 'Забыли пароль',
  'page.forgotPassword.message': 'Введите адрес электронной почты, чтобы сбросить пароль',
  'page.password2fa': '2FA подтверждение',
  'page.password2fa.message': 'Введите 2FA код с приложения',
  'page.forgotPassword.email': 'Почта',
  'page.forgotPassword.send': 'Отправить',
  'page.noDataToShow': 'Нет данных для отображения',

  'page.modal.withdraw.success': 'Успешно!',
  'page.modal.withdraw.success.message.content':
    'Ваш вывод был успешно подтвержден. Пожалуйста, подождите, чтобы получить ' +
    'несколько обязательных подтверждений для завершения этой транзакции.',
  'page.modal.withdraw.success.button': 'OK',

  'page.modal.expired.title': 'Ваша сессия истекла',
  'page.modal.expired.submit': 'Обновить сессию',

  /* Customization */
  'page.body.customization.tabs.themes': 'Colors',
  'page.body.customization.tabs.fonts': 'Fonts',
  'page.body.customization.tabs.spacing': 'Spacing',
  'page.body.customization.tabs.images': 'Images',
  'page.body.customization.comingSoon': 'Coming Soon',
  'page.body.customization.actionButtons.reset': 'Reset',
  'page.body.customization.actionButtons.save': 'Save',

  'page.body.customization.themes.selector.label': 'Theme Presets',
  'page.body.customization.themes.tabs.dark': 'Dark',
  'page.body.customization.themes.tabs.light': 'Light',

  'page.body.customization.themes.color.mainBackgroundColor': 'Main background',
  'page.body.customization.themes.color.bodyBackgroundColor': 'Body background',
  'page.body.customization.themes.color.headerBackgroundColor': 'Header background',
  'page.body.customization.themes.color.subheaderBackgroundColor': 'Subheader background',
  'page.body.customization.themes.color.dropdownBackgroundColor': 'Dropdown background',
  'page.body.customization.themes.color.icon': 'Icons',
  'page.body.customization.themes.color.primaryCtaColor': 'Primary Call to action',
  'page.body.customization.themes.color.contrastCtaColor': 'Contrast Call to action',
  'page.body.customization.themes.color.secondaryContrastCtaColor': 'Secondary Contrast CTA',
  'page.body.customization.themes.color.ctaLayerColor': 'CTA Layer',
  'page.body.customization.themes.color.systemGreen': 'System Green',
  'page.body.customization.themes.color.systemRed': 'System Red',
  'page.body.customization.themes.color.systemYellow': 'System Yellow',
  'page.body.customization.themes.color.asks': 'Asks color',
  'page.body.customization.themes.color.bids': 'Bids color',
  'page.body.customization.themes.color.primaryTextColor': 'Primary text',
  'page.body.customization.themes.color.textContrastColor': 'Text contrast',
  'page.body.customization.themes.color.inputBackgroundColor': 'Input background',
  'page.body.customization.themes.color.dividerColor': 'Divider color',
  'page.body.customization.themes.color.shadowColor': 'Shadow color',
  'page.body.customization.themes.color.landingBackgroundColor': 'Landing background',
  'page.body.customization.themes.color.strengthMeterVeryStrong': 'Password very strong',

  'page.body.customization.themes.theme.basic.title': 'Basic',
  'page.body.customization.themes.theme.basicNew.title': 'Basic (new)',
  'page.body.customization.themes.theme.yellow.title': 'Yellow',
  'page.body.customization.themes.theme.red.title': 'Red',
  'page.body.customization.themes.theme.green.title': 'Green',
  'page.body.customization.themes.theme.violet.title': 'Violet',

  'page.body.customization.images.field.width.label': 'Ширина изображения',
  'page.body.customization.images.field.width.placeholder': 'Только цифры (px)',
  'page.body.customization.images.field.url.label': 'Ссылка на изображение',
  'page.body.customization.images.field.url.placeholder': 'https://yourimage',

  'page.body.customization.images.header_logo.title': 'Header logo',

  /* Documentation */
  'page.documentation.header.version.title': 'Backend version:',
  'page.documentation.header.version.ui': 'Frontend version:',
  'page.documentation.header.contactInfo.title': 'Contact information:',
  'page.documentation.header.license.title': 'License:',

  'page.documentation.endpoints.requestTypeItem.description.title': 'Description',
  'page.documentation.endpoints.requestTypeItem.parameters.title': 'Parameters',
  'page.documentation.endpoints.requestTypeItem.responses.title': 'Responses',

  'page.documentation.endpoints.requestTypeItem.parameters.table.header.name': 'Name',
  'page.documentation.endpoints.requestTypeItem.parameters.table.header.location': 'Located in',
  'page.documentation.endpoints.requestTypeItem.parameters.table.header.description': 'Description',
  'page.documentation.endpoints.requestTypeItem.parameters.table.header.required': 'Required',
  'page.documentation.endpoints.requestTypeItem.parameters.table.header.schema': 'Schema',
  'page.documentation.endpoints.requestTypeItem.parameters.table.data.required.true': 'Yes',
  'page.documentation.endpoints.requestTypeItem.parameters.table.data.required.false': 'No',

  'page.documentation.endpoints.requestTypeItem.responses.table.header.code': 'Code',
  'page.documentation.endpoints.requestTypeItem.responses.table.header.description': 'Description',
  'page.documentation.endpoints.requestTypeItem.responses.table.header.schema': 'Schema',
  'page.documentation.endpoints.requestTypeItem.responses.table.data.noSchema': 'no',

  'page.documentation.models.title': 'Models',
  'page.documentation.models.item.table.header.name': 'Name',
  'page.documentation.models.item.table.header.type': 'Type',
  'page.documentation.models.item.table.header.description': 'Description',
  'page.documentation.models.item.table.header.required': 'Required',
  'page.documentation.models.item.table.data.required.true': 'Yes',
  'page.documentation.models.item.table.data.required.false': 'No',

  /* Quick Exchange */
  'page.body.quick.exchange.header': 'Быстрый обмен',
  'page.body.quick.exchange.label.limits': 'Лимиты',
  'page.body.quick.exchange.label.exchange': 'Вы меняете',
  'page.body.quick.exchange.label.receive': 'Вы получите',
  'page.body.quick.exchange.label.currency': 'Валюта',
  'page.body.quick.exchange.sublabel.min_amount': 'Минимальная сумма обмена',
  'page.body.quick.exchange.sublabel.balance': 'Доступно',
  'page.body.quick.exchange.sublabel.fee': 'Комиссия',
  'page.body.quick.exchange.rate': 'Курс',
  'page.body.quick.exchange.reverse_rate': 'Обратный курс',
  'page.body.quick.exchange.limit.order': 'Лимит на обмен',
  'page.body.quick.exchange.limit.daily': 'Дневной лимит',
  'page.body.quick.exchange.limit.weekly': 'Лимит в неделю',
  'page.body.quick.exchange.tip.amount': 'Введите сумму',
  'page.body.quick.exchange.tip.refresh': 'Обновите курс обмена',
  'page.body.quick.exchange.tip.market': 'Выберите корректную пару',
  'page.body.quick.exchange.button.rearrange': 'Переставить валюты',
  'page.body.quick.exchange.button.refresh': 'Обновить курс',
  'page.body.quick.exchange.button.exchange': 'Обменять',
  'page.body.quick.exchange.warning':
    'Общая сумма, которую вы получите, зависит от текущего обменного курса на момент завершения транзакции.',
  'page.body.quick.exchange.no-market': 'Нет подходящего рынка',
  'page.body.quick.exchange.insufficient_balance': 'Недостаточно средств.',
  'page.body.quick.exchange.top_up_balance': 'Пожалуйста, пополните свой кошелек',
  'page.body.quick.exchange.less_than_min_amount': 'Минимальная сумма {value}',

  'quick.exchange.order.created': 'Обмен совершен успешно',
  'quick.exchange.order.cancelled': 'Заявка отклонена',
  'market.swap_order.outdated_price': 'Курс обмена устарел',
  'market.swap_order.invalid_currency': 'Неверная валюта',
  'market.swap_order.invalid_market_volume': 'Неверная сумма обмена',
  'market.swap_order.invalid_market': 'Неверный рынок',
  'market.swap_order.reached_weekly_limit': 'Превышен недельный лимит',
  'market.swap_order.reached_daily_limit': 'Превышен дневной лимит',
  'market.swap_order.reached_order_limit': 'Превышен лимит на обмен',

  // success messages
  'success.addresses.accepted': 'Ваш адрес успешно приняты',
  'success.documents.accepted': 'Ваши документы успешно приняты',
  'success.identity.accepted': 'Данные профиля успешно приняты',
  'success.withdraw.action': 'Вывод успешен',
  'success.otp.enabled': '2FA успешно активирован',
  'success.otp.disabled': '2FA успешно деактивирован',
  'success.password.changed': 'Пароль изменен',
  'success.password.forgot': 'Ссылка для сброса пароля была отправлена на вашу почту',
  'success.password.changed.successfuly': 'Пароль успешно изменен',
  'success.order.cancelling': 'Запрос отменяется',
  'success.order.canceled': 'Запрос отменен',
  'success.order.canceled.all': 'Все запросы были отменены',
  'success.order.cancelling.all': 'Все запросы отменяются',
  'success.phone.verification.send': 'Код верификации был отправлен на ваш телефон',
  'success.phone.confirmed': 'Ваш телефон подтвержден',
  'success.phone.confirmation.message': 'Успех!',
  'success.message.sent': 'Письмо было успешно отправлено',
  'success.email.confirmed': 'Email был успешно подтвержден',
  'success.order.created': 'Запрос успешно создан',
  'success.order.done': 'Запрос успешно завершён',
  'success.data.changed.language': 'Язык успешно изменен',

  // error messages
  'error.order.rejected': 'Запрос отвергнут',
  'error.invalid_request': 'Запрос - неверный запрос',
  'error.bad_request': 'Запрос - неправильный запрос',
  'error.request_entity_too_large': 'Запрос - слишком большой объект запроса',

  // error messages
  // barong
  'resource.labels.private': 'Нельзя обновить поле',
  'resource.user.no_activity': 'Активность не записана или неправильная тема',
  'resource.profile.not_exist': 'У пользователя нет профиля',
  'resource.profile.exist': 'Профиль уже существует',
  'resource.api_key.2fa_disabled': 'Разрешены только аккаунты с включенным 2FA',
  'resource.api_key.missing_otp': 'Отсутствует код 2FA',
  'resource.api_key.invalid_otp': 'Код 2FA недействителен',
  'resource.phone.twillio': 'Ошибка с Twilio',
  'resource.phone.invalid_num': 'Номер телефона недействителен',
  'resource.phone.exists': 'Номер телефона уже существует',
  'resource.phone.number_exist': 'Номер телефона уже существует',
  'resource.phone.verification_invalid': 'Телефон не найден или код подтверждения недействителен',
  'resource.documents.limit_reached': 'Достигнуто максимальное количество документов',
  'resource.documents.limit_will_be_reached':
    'Количество документов достигнет предела при этой загрузке',
  'resource.otp.already_enabled': '2FA уже включен для этого аккаунта',
  'resource.otp.invalid': 'Код 2FA недействителен',
  'resource.password.doesnt_match': 'Новые пароли не совпадают',
  'resource.password.prev_pass_not_correct': 'Предыдущий пароль неверен',
  'resource.password.no_change_provided': 'Новый пароль не может быть таким же, как старый',
  'resource.document.empty_doc_expire': 'Срок действия недействителен',
  'password.requirements': 'Пароль не соответствует минимальным требованиям',
  'password.password.password_strength': 'Пароль слишком слабый',
  'password.weak': 'Пароль слишком слабый',

  'email.taken': 'Почта уже зарегистрирована',

  'identity.user.invalid_referral_format': 'Неверный формат UID реферала',
  'identity.user.referral_doesnt_exist': 'Реферал не существует',
  'identity.user.active_or_doesnt_exist': 'Пользователь не существует или уже был активирован',
  'identity.password.user_doesnt_exist': 'Пользователь не существует',
  'identity.user.passwords_doesnt_match': 'Пароли не совпадают',
  'identity.user.utilized_token': 'JWT уже был использован',
  'identity.session.invalid_login_params': 'Неправильный адрес электронной почты или пароль',
  'identity.session.invalid': 'Неверный сеанс',
  'identity.captcha.required': 'Необходимо пройти капчу',
  'identity.captcha.mandatory_fields': 'Обязательные поля должны быть заполнены',
  'identity.captcha.verification_failed': 'Ошибка верификации капчи',
  'identity.session.not_active': 'Ваш аккаунт не активен',
  'identity.session.banned': 'Ваш аккаунт заблокирован',
  'identity.session.invalid_params': 'Неправильный адрес электронной почты или пароль',
  'identity.session.missing_otp': 'Отсутствует код 2FA',
  'identity.session.invalid_otp': 'Код 2FA недействителен',
  'identity.session.auth0.email_not_verified': 'Почтовый адрес не подтвержден',
  'identity.session.email_not_verified': 'Почтовый адрес не подтвержден',

  'username.taken': 'Никнейм уже используется',
  'first_name.invalid': 'Имя неверное',
  'last_name.invalid': 'Фамилия неверная',
  'city.invalid': 'Город неверный',
  'postcode.invalid': 'Почтовый индекс неверен',
  'address.invalid': 'Адрес неверен',
  'first_name.blank': 'Имя отсутствует',
  'last_name.blank': 'Фамилия отсутствует',
  'dob.blank': 'Дата рождения отсутствует',
  'address.blank': 'Адрес отсутствует',
  'city.blank': 'Город отсутствует',
  'country.blank': 'Страна отсутствует',
  'postcode.blank': 'Почтовый индекс отсутствует',
  'country.must have alpha2 or alpha3 format': 'Страна должна быть в буквенном формате',

  'totp.error': 'Код 2FA неверен',

  'record.not_found': 'Запись не найдена',
  'jwt.decode_and_verify': 'Не удалось декодировать и проверить JWT',
  'authz.invalid_session': 'Не удалось расшифровать куки',
  'authz.user_not_active': 'Пользователь не активен',
  'authz.invalid_signature': "Заголовок API-ключа 'signature' недействителен",
  'authz.apikey_not_active': 'Состояние ключа API «неактивно»',
  'authz.disabled_2fa': 'Владелец ключа API отключил 2FA',
  'authz.invalid_api_key_headers': 'Пустые или отсутствующие заголовки ключей API',
  'authz.permission_denied': 'Путь занесен в черный список',
  'authz.unexistent_apikey': 'Заголовок X-Auth-Apikey недействителен',
  'authz.client_session_mismatch': 'Сессия не соответствует',
  'authz.csrf_token_mismatch': 'CSRF токен не соответствует',

  // validation errors
  // identity module
  'identity.user.missing_email': 'Почта отсутствует',
  'identity.user.empty_email': 'Почта отсутствует',
  'identity.user.missing_password': 'Пароль отсутствует',
  'identity.user.empty_password': 'Пароль отсутствует',
  'identity.user.missing_token': 'Токен отсутствует',
  'identity.user.empty_token': 'Токен отсутствует',
  'identity.user.missing_reset_password_token': 'Токен пароля отсутствует',
  'identity.user.empty_reset_password_token': 'Токен пароля отсутствует',
  'identity.user.missing_confirm_password': 'Подтверджение пароля отсутствует',
  'identity.user.empty_confirm_password': 'Подтверджение пароля отсутствует',
  'identity.session.rack_attack_limit':
    'Превышен лимит запросов на вход, пожалуйста, повторите попытку через 60 секунд',

  'identity.session.missing_emai': 'Почта отсутствует',
  'identity.session.missing_password': 'Почта отсутствует',
  'identity.session.invalid_captcha_format': 'Неверный формат captcha',

  // resource module
  'resource.otp.missing_code': '2FA отсутствует',
  'resource.otp.empty_code': '2FA отсутствует',

  'resource.labels.missing_key': 'Ключ отсутствует',
  'resource.labels.empty_key': 'Ключ отсутствует',
  'resource.labels.missing_value': 'Значение отсутствует',
  'resource.labels.empty_value': 'Значение отсутствует',

  'resource.documents.missing_doc_expire': 'Дата документа отсутствует',
  'resource.documents.empty_doc_expire': 'Дата документа отсутствует',
  'resource.documents.expire_not_a_date': 'Дата документа отсутствует',
  'resource.documents.missing_doc_type': 'Тип документа отсутствует',
  'resource.documents.empty_doc_type': 'Тип документа отсутствует',
  'resource.documents.missing_doc_number': 'Номер документа отсутствует',
  'resource.documents.empty_doc_number': 'Номер документа отсутствует',
  'resource.documents.missing_upload': 'Фотография документа отсутствует',

  'resource.user.missing_topic': 'Тема отсутствует',
  'resource.user.empty_topic': 'Тема отсутствует',
  'resource.user.missing_old_password': 'Старый пароль отсутствует',
  'resource.user.empty_old_password': 'Старый пароль отсутствует',
  'resource.user.missing_new_password': 'Новый пароль отсутствует',
  'resource.user.empty_new_password': 'Новый пароль отсутствует',
  'resource.user.missing_confirm_password': 'Подтверждение пароля отсутствует',
  'resource.user.empty_confirm_password': 'Подтверждение пароля отсутствует',
  'resource.user.invalid_pin_code': 'Неверный пин-код',

  'resource.profile.missing_first_name': 'Имя отсутствует',
  'resource.profile.missing_last_name': 'Фамилия отсутствует',
  'resource.profile.missing_dob': 'Дата рождения отсутствует',
  'resource.profile.missing_address': 'Адресс отсутствует',
  'resource.profile.missing_postcode': 'Почтовый индекс отсутствует',
  'resource.profile.missing_city': 'Город отсутствует',
  'resource.profile.missing_country': 'Страна отсутствует',

  'resource.api_key.missing_algorithm': 'Алгоритм отсутствует',
  'resource.api_key.empty_algorithm': 'Алгоритм отсутствует',
  'resource.api_key.empty_kid': 'KID отсутствует',
  'resource.api_key.empty_scope': 'Scope отсутствует',
  'resource.api_key.missing_totp': '2FA отсутствует',
  'resource.api_key.empty_totp': '2FA отсутствует',
  'resource.api_key.missing_kid': 'KID отсутствует',
  'resource.api_key.empty_state': 'Состояние отсутствует',
  'resource.api_key.invalid_totp': 'Код 2FA недействителен',

  'resource.phone.missing_phone_number': 'Номер телефона отсутствует',
  'resource.phone.empty_phone_number': 'Номер телефона отсутствует',
  'resource.phone.missing_verification_code': 'Код проверки отсутствует',
  'resource.phone.empty_verification_code': 'Код проверки отсутствует',

  // peatio
  'account.currency.doesnt_exist': 'Валюта не существует',
  'account.deposit.invalid_state': 'Депозит недействителен',
  'account.deposit.non_integer_limit':
    'Невозможно проанализировать отправленное вами значение в тип Integer',
  'account.deposit.invalid_limit': 'Неверный лимит',
  'account.deposit.non_positive_page': 'Значение страницы должно быть положительным',
  'account.deposit.empty_txid': 'Txid отсутствует, Txid пуст',
  'account.deposit_address.invalid_address_format': 'Неверный формат адреса депозита',
  'account.deposit_address.doesnt_support_cash_address_format':
    'Валюта не поддерживает формат денежных адресов',
  'account.withdraw.non_integer_limit':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'account.withdraw.invalid_limit': 'Неверный лимит',
  'account.withdraw.non_positive_page': 'Значение страницы должно быть положительным',
  'account.withdraw.non_integer_otp': 'Значение 2FA не может быть проанализировано в тип Integer',
  'account.withdraw.empty_otp': '2FA отсутствует, 2FA пуст',
  'account.withdraw.empty_rid': 'Rid отсутствует, rid пуст',
  'account.withdraw.non_decimal_amount':
    'Значение суммы, которую вы отправили, не может быть проанализировано в десятичном виде',
  'account.withdraw.non_positive_amount': 'Значение суммы должно быть положительным',
  'account.deposit.not_permitted': 'Депозиты разрешены после подтверждения телефона',
  'account.withdraw.not_permitted':
    'Пожалуйста, пройдите соответствующие шаги проверки для вывода средств',
  'account.withdraw.insufficient_balance': 'Недостаточно средств на счете',
  'account.withdraw.invalid_amount': 'Неверная сумма снятия',
  'account.withdraw.create_error': 'Не удалось создать вывод',
  'account.withdraw.invalid_otp': 'Неверный 2FA',
  'account.withdraw.disabled_api': 'Снятие API отключено',

  'account.beneficiary.invalid_pin': 'Неверный код активации',
  'account.beneficiary.cant_resend_within_1_minute':
    'Нельзя повторно отправить код активации в течение 1 минуты',
  'account.beneficiary.duplicate_address': 'Адрес списания уже добавлен',
  'account.beneficiary.failed_to_create': 'Невозможно добавить получателя: неверный адрес',

  'market.market.doesnt_exist': 'Рынок не существует',
  'market.order.invalid_state': 'Неверное состояние депозита',
  'market.order.invalid_limit': 'Неверный лимит',
  'market.order.non_integer_limit':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'market.trade.empty_page': 'Страница отсутствует или пуста',
  'market.order.invalid_order_by': 'Неверный заказ',
  'market.order.invalid_side': 'Неверная сторона заказа',
  'market.order.non_decimal_volume':
    'Невозможно проанализировать значение тома, которое вы отправили, в десятичный тип',
  'market.order.non_positive_volume': 'Значение объема должно быть положительным',
  'market.order.invalid_type': 'Неверный тип заказа',
  'market.order.non_decimal_price':
    'Невозможно проанализировать значение тома, которое вы отправили, в десятичный тип',
  'market.order.non_positive_price': 'Значение объема должно быть положительным',
  'market.order.non_integer_id':
    'Невозможно проанализировать отправленное вами значение идентификатора в целочисленный тип',
  'market.order.empty_id': 'Идентификатор отсутствует или пуст',
  'market.trade.non_integer_limit':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'market.trade.invalid_limit': 'Неверный лимит',
  'market.trade.non_integer_timestamp':
    'Отправленное вами время не может быть проанализировано в типе Integer',
  'market.trade.empty_timestamp': 'Метка времени отсутствует или пуста',
  'market.trade.invalid_order_by': 'Неверный заказ',
  'market.order.insufficient_market_liquidity': 'Достаточная рыночная ликвидность',
  'market.order.invalid_volume_or_price': 'Неверный объем или цена',
  'market.order.create_error': 'Не удалось создать запрос',
  'market.order.cancel_error': 'Не удалось отменить запрос',
  'market.order.market_order_price': 'Рыночный ордер не имеет цены',
  'market.trade.not_permitted':
    'Пожалуйста, пройдите соответствующие шаги проверки, чтобы включить торговлю',
  'market.account.insufficient_balance': 'Недостаточно средств на счете',

  'public.currency.doesnt_exist': 'Валюта не существует',
  'public.currency.invalid_type': 'Неверный тип валюты',
  'public.market.doesnt_exist': 'Рынок не существует',
  'public.order_book.non_integer_ask_limit':
    'Не удалось проанализировать отправляемое вами предельное значение в тип Integer',
  'public.order_book.invalid_ask_limit': 'Неверный лимит спроса',
  'public.order_book.non_integer_bid_limit':
    'Отправленное вами предельное значение ставки не может быть проанализировано в типе Integer',
  'public.order_book.invalid_bid_limit': 'Неверный лимит ставок',
  'public.trade.non_integer_limit':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'public.trade.invalid_limit': 'Неверный лимит',
  'public.trade.non_positive_page': 'Значение страницы должно быть положительным',
  'public.trade.non_integer_timestamp':
    'Отправленное вами время не может быть проанализировано в типе Integer',
  'public.trade.invalid_order_by': 'Неверный заказ',
  'public.market_depth.non_integer_limit':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'public.market_depth.invalid_limit': 'Неверный лимит',
  'public.k_line.non_integer_period':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'public.k_line.invalid_period': 'Неверный период',
  'public.k_line.non_integer_time_from':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'public.k_line.empty_time_from': 'Параметр Time_from отсутствует или пуст',
  'public.k_line.non_integer_time_to':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'public.k_line.empty_time_to': 'Параметр Time_to отсутствует или пуст',
  'public.k_line.non_integer_limit':
    'Не удается проанализировать отправляемое вами предельное значение в тип Integer',
  'public.k_line.invalid_limit': 'Неверный лимит',

  'server.internal_error': 'Внутренняя ошибка сервера',

  'password.strength.tip.influence': 'Что влияет на надежность вашего пароля',
  'password.strength.tip.number.characters': 'Не менее 8 символов',
  'password.strength.tip.letter': 'По крайней мере, одна заглавная и строчная буква',
  'password.strength.tip.digit': 'По крайней мере, одна цифра',

  // metamask
  'metamask.success.connected': '[MetaMask] Аккаунт подключен',

  'metamask.error.noExtension':
    '[MetaMask] Расширение браузера для Ethereum не было обнаружено, установите MetaMask',
  'metamask.error.unsupportedNetwork': '[MetaMask] Вы подключены к неподдерживаемой сети',
  'metamask.error.unauthorized':
    '[MetaMask] Пожалуйста, авторизуйте этот сайт для доступа к вашей учетной записи Ethereum',
  'metamask.error.unknown':
    '[MetaMask] Произошла неизвестная ошибка. Проверьте консоль для получения дополнительных сведений',

  // internal transfer
  'page.body.internal.transfer.header': 'Internal transfer',

  'page.body.internal.transfer.header.input.uid':
    '1. Enter a valid uid of a user whom you want to transfer money',
  'page.body.internal.transfer.header.input.amount':
    '2. Select currency and enter amount that you want to transfer',
  'page.body.internal.transfer.header.input.otp':
    '3. Enter 2FA code from the Google Authenticator app ',

  'page.body.internal.transfer.label.uid': 'Send to account (UID)',
  'page.body.internal.transfer.label.amount': 'Amount to send',
  'page.body.internal.transfer.label.otp': 'Enter 2FA code',

  'page.body.internal.transfer.placeholder.uid': 'Send to account (UID)',
  'page.body.internal.transfer.placeholder.amount': 'Amount to send',
  'page.body.internal.transfer.placeholder.otp': 'Enter 2FA code',

  'page.body.internal.transfer.continue': 'Continue',

  'page.body.internal.transfer.please.enable.2fa':
    'Please, enable 2FA to be able to use internal transfers functionality',
  'page.body.internal.transfer.enable': 'Enable',

  'page.body.internal.transfer.notice.uid': `All transactions are final! Please, double check receiver's uid before sending.`,
  'page.body.internal.transfer.modal.content.transfer': 'You are going to transfer ',
  'page.body.internal.transfer.modal.content.to': 'to ',
  'page.body.internal.transfer.modal.content.account': 'account.',

  'page.body.internal.transfer.account.balance': 'Available balance: ',
  'page.body.internal.transfer.insufficient.balance': ' - Insufficient balance',

  'page.body.internal.transfer.header.input.username':
    '1. Enter a valid nickname of a user whom you want to transfer money',
  'page.body.internal.transfer.label.username': 'Send to account (nickname)',
  'page.body.internal.transfer.placeholder.username': 'Send to account (nickname)',
  'page.body.internal.transfer.notice.username': `All transactions are final! Please, double check receiver's nickname before sending.`,

  // internal transfer - errors
  'account.internal_transfer.non_decimal_amount': 'Non decimal amount',
  'account.internal_transfer.non_positive_amount': 'Non positive amount',
  'account.internal_transfer.non_integer_otp': 'Non integer otp',
  'account.internal_transfer.receiver_not_found': `Account doesn't exist`,
  'account.internal_transfer.invalid_otp': 'Invalid otp',
  'account.internal_transfer.insufficient_balance': 'Insufficient_balance',
  'account.internal_transfer.can_not_tranfer_to_yourself': 'Can not tranfer to yourself',
  'success.internal.transfer.created': 'Internal transfer was created',

  // verify email
  'verify.email.header': 'Verify email',
  'verify.email.content': 'Please verify your email address {email} and press OK',

  ...nationalitiesNames,
  ...mobileTranslationsRu,

  // deeplink dialogs
  ...deeplinkTexts,

  // finex
  'order.action.not_permitted': 'Action is not permitted',
  'order.action_role.not_permitted': 'Action is not permitted for your user role',
  'order.action_level.not_permitted': 'Action is not permitted for your user verification level',

  'page.fees.trading': 'Торговые комиссии',
  'page.fees.taker': 'Комиссия для тейкеров',
  'page.fees.maker': 'Комиссия для мейкеров',
  'page.fees.table.header': 'Комиссии за ввод/вывод',
  'page.fees.table.coin': 'Монета',
  'page.fees.table.name': 'Имя',
  'page.fees.table.network': 'Сеть',
  'page.fees.table.min_deposit': 'Мин. ввод',
  'page.fees.table.min_withdraw': 'Мин. вывод',
  'page.fees.table.deposit_fee': 'Комиссия за ввод',
  'page.fees.table.withdraw_fee': 'Комиссия за вывод',
  your_address: 'Ваш адрес',

  '2FA code': 'Код 2FA',
  '2FA Verification': '2FA верификация',
  'Create gift': 'Выписать чек',
  'Deposit.noun': 'Ввод',
  'Enter 2FA code from the app': 'Введите 2FA код из приложения',
  'Enter 2FA code from the app for': 'Введите 2FA код из приложения для {name}',
  'error.try_later': 'Пожалуйста, попробуйте позже',
  'Estimated value': 'Оценочная стоимость',
  'Exchange Balance': 'Биржевой баланс',
  'Exchange Wallet': 'Биржевой кошелек',
  'Generate address': 'Сгенерировать адрес',
  'P2P Balance': 'Баланс P2P',
  'P2P Wallet': 'P2P кошелек',
  'Select network': 'Выберите сеть',
  'Select wallet': 'Выберите кошелек',
  'Show QR code': 'Показать QR код',
  'Total balance': 'Общий баланс',
  'Transfer Fee': 'Комиссия перевода',
  'Transfer from': 'Перевод из',
  'Transfer History': 'История переводов',
  'Transfer to': 'Перевод в',
  'Transfer was successfully created': 'Перевод успешно создан',
  'Transfer.noun': 'Перевод',
  'Transfer.verb': 'Перевести',
  'Withdraw.noun': 'Вывод',
  Address: 'Адрес',
  Amount: 'Сумма',
  Coin: 'Валюта',
  Currency: 'Валюта',
  Date: 'Дата',
  Free: 'Бесплатно',
  From: 'Из',
  Gifts: 'Чеки',
  is_transaction_price_too_high: 'Вывод был отключен из-за высокой цены транзакции',
  Locked: 'Заблокировано',
  market: 'Биржа',
  Network: 'Сеть',
  OK: 'OK',
  p2p_deposit_withdraw:
    'В настоящее время ввод и вывод BTC осуществляются с помощью кошельков P2P, пожалуйста, {transfer} активы в/из кошелька P2P.',
  p2p_transfer: 'переведите',
  p2p: 'P2P',
  Rate: 'Курс',
  Rearrange: 'Переставить',
  Send: 'Отправить',
  Status: 'Статус',
  To: 'В',
  Wallets: 'Кошельки',
  Close: 'Закрыть',
  Cancel: 'Отмена',
  Yes: 'Да',
  No: 'Нет',
  Right: 'Верно',
  Settings: 'Настройки',
  'Default currency': 'Основная валюта',
  General: 'Общий',
  Security: 'Безопасность',
  Notifications: 'Уведомления',
  'Safe Mode': 'Безопасный режим',
  Timezone: 'Часовой пояс',
  Rating: 'Рейтинг',
  Comments: 'Отзывы',
  'Deals completed': 'Сделок совершено',
  'Show all': 'Показать все',
  'Referral Links': 'Реферальные ссылки',
  'Switch account': 'Переключить аккаунт',
  "It's you": 'Это вы',
  'Password change': 'Сменить пароль',
  'Create API key': 'Создать API ключ',
  'Key name': 'Имя ключа',
  Active: 'Активен',
  Inactive: 'Неактивен',
  Read: 'Чтение',
  Trade: 'Трейдинг',
  Transfer: 'Переводы',
  'Private key': 'Секретный ключ',
  'Public key': 'Публичный ключ',
  'P2P API Keys': 'P2P API Ключи',
  'Exchange API Keys': 'Биржевые API Ключи',
  Authorities: 'Доступы',
  Enable: 'Включить',
  Disable: 'Выключить',
  Loading: 'Загрузка',
  'Account Statement': 'Авторизованная выписка',
  Change: 'Изменить',
  Rename: 'Переименовать',
  Reports: 'Отчёты',
  'AD Board': 'Доска объявлений',
  'My adverts': 'Мои Объявления',
  'My trades': 'Сделки',
  'Active users': 'Активные пользователи',

  'p2p.apiKeys.descr':
    'Создание приватного API ключа позволяет получить доступ к торговле и другим сервисам Bitzlato через сторонние сайты или приложения. Ознакомится с <link>документацией</link>',
  'p2p.apiKeys.warning':
    'Внимание! Если вы передаете ключ третьим лицам (и даже поддержке сервиса или службе безопасности), то вы предоставляете доступ к своему аккаунту!',
  'p2p.apiKeys.active_tooltip':
    'Ключ будет активен после создания и его можно будет сразу использовать, если поставить эту галку',
  'p2p.apiKeys.read_tooltip': 'Возможность чтения данных в аккаунте',
  'p2p.apiKeys.trade_tooltip': 'Возможность ведения трейдинга',
  'p2p.apiKeys.transfer_tooltip': 'Возможность делать вводы/выводы',
  'p2p.apiKeys.gen_new': 'Сгенерировать новый ключ',
  'p2p.apiKeys.enter_key_name': 'Введите имя ключа',
  'p2p.apiKeys.copy_key':
    'Скопируйте и сохраните этот ключ, после закрытия окна его нельзя будет получить.',
  'p2p.apiKeys.send': 'Отправить публичный ключ',
  'p2p.apiKeys.send_desc':
    'Отправьте публичный ключ на сервер чтобы сохранить его там. Если у вас уже есть ключ, после сохранения нового он будет удалён. Пока ключ не отправлен им нельзя будет авторизоваться.',
  'p2p.apiKeys.sended': 'Публичный ключ отправлен на сервер!',
  'p2p.apiKeys.delete_irreversible': 'Это действие необратимо',

  'page_profile.button.select_avatar': 'Выбрать аватар',
  'page_profile.button.upload_avatar': 'Установить аватар',
  'page_profile.modal.info':
    'Вы можете установить аватар пользователя. Учтите, что аватары с рекламной информацией запрещены, а аккаунты с такими аватарами могут быть ограничены от использования сервиса.Доступные форматы: PNG, JPEG, JPG',
  'page_profile.modal.format_error': 'Только png, jpg, jpeg',
  'page_profile.button.set_avatar': 'Установить аватар',
  'page_profile.modal.title': 'Установить аватар',

  Freeze: 'Заблокировать',
  'Freeze Account': 'Блокировка аккаунта',
  'Freeze Info':
    '❗️ Вы уверены что хотите <strong>заблокировать</strong> свой аккаунт? Разблокировку можно будет ' +
    'провести только через поддержку сервиса и ' +
    '<strong>при условии прохождения верификации</strong>!{br}{br}' +
    '⚠️ Блокировка аккаунта <strong>отменит</strong> все финансовые операции по выводу средств ' +
    '(если транзакция еще не вышла в сеть) и возможность проводить новые финансовые операции будет приостановлена!',
  'Freeze Completed':
    'Ваш аккаунт заблокирован.{br}{br}' + 'Для восстановления обратитесь в поддержку',
  'Public name title': '👤 Укажите публичное имя',
  'Public name': 'Публичное имя',
  'Public name length error': 'Длинна имени привышат 15 символов',
  'Public name format error': 'Неверный формат имени',
  'Public name check error': 'Недопустимое имя',
  'Public name irreversable':
    'Действие необратимо. Вы не сможете изменить публичное имя в будущем!',
  'Public name help': 'Только латинские буквы и цифры. Максимальная длина 15 символов',
  'safemode.title': 'Выключение безопасного режима',
  'safemode.begin':
    '🔒 Для продолжения Вам необходимо пройти тест на знание безопасности при работе с сервисом.\nЭта операция разовая и не займет много времени!',
  'safemode.error': 'Упс! Это ошибка, которая может стоит Вам потери средств. Попробуйте сначала.',
  'safemode.success': 'Поздравляем! Теперь вы можете создавать чеки и отключать безопасный режим',
  'safemode.start_test': 'Начать тест',
  'safemode.question1':
    'Вы начали сделку, но ваш контрагент предлагает провести сделку через оператора сервиса, в ручном режиме. Ведь так быстрее и проще, и вообще курс лучше.\nСуществуют ли в сервисе операторы/агенты поддержки которые проводят сделки?',
  'safemode.question2':
    'С Вами связался агент поддержки и просит сообщить ему номер телефона и код из смс.\nНужно ли сообщать данную информацию?',
  'safemode.question3':
    'Передача средств по сделке с помощью чеков не является нарушением и не приведет к потере денежных средств из-за возможного мошенничества?',
  'safemode.next_question': 'Следующий вопрос',
  'safemode.check_is_gift': 'Чек - это подарок',

  'notification_setting.off': 'Выключено',
  'notification_setting.on': 'Включено',
  'notification_setting.silent': 'Тихо',
  'notification_setting.no-nighttime': 'Выключить ночью',
  'notification_setting.silent,no-nighttime': 'Выключить ночью и тихо',

  'settings.save_requisites': 'Сохранять реквизиты',
  'settings.notifications_help': 'Ночное время — это с 23 до 9 по вашему локальному времени',
  'settings.new_referral': 'Новые рефералы',
  'settings.new_referral_help':
    'Уведомления о новых рефералах после того как пользователь зарегистрировался в сервисе по вашей реферальной ссылке.',
  'settings.dividends_received': 'Реферальные выплаты',
  'settings.dividends_received_help':
    'Уведомления о выплатах после того как пользователь провел сделку.',
  'settings.comission_return': 'Бесплатные сделки',
  'settings.comission_return_help':
    'Уведомление о том, что ваша сделка прошла бесплатно и комиссия вернулась на баланс.',
  'settings.user_message': 'Сервисные рассылки',
  'settings.user_message_help':
    'Bitzlato очень редко, но рассылает сообщения с важнейшей информацией по пользователям, но комфорт пользователей мы ценим больше, поэтому вы можете изменить настройки получения таких сообщений.',
  'settings.safe_mode_help':
    'При включенном безопасном режиме Вам доступны заявки только доверенных трейдеров.',

  'profile.verification_link_1': 'Если ссылка не открылась автоматически,',
  'profile.verification_link_2': 'нажмите сюда',
  'profile.verification_no': 'Верификация не пройдена',
  'profile.verification_goto': 'Пройти верификацию',
  'profile.verification_yes': 'Верификация пройдена',
  'profile.suspicious': 'Подозрительный ',
  'profile.suspicious_desc': 'Вашему аккаунту присвоен статус Подозрительный',
  'profile.deals_stat': 'сделок на сумму',

  'Cashed by': 'Обналичен',
  'Gift for': 'Чек на сумму {money}',
  'gift.check_spam': 'Обязательно проверьте папку "Спам", если не получили письмо',
  'gift.confirmation_email': 'На {email} отправлено письмо для подтверждения',
  'gift.copy_link': 'Вы можете скопировать ссылку на чек',
  'gift.transfer':
    'Чеки выписываются с использованием баланса P2P. Вы можете переместить средства между P2P и Биржевым балансами используя {transfer}.',
  'Server error': 'Ошибка на сервере',
  'Successfully changed': 'Успешно изменен',
  'Successfully copied': 'Успешно скопировано',
  Cashed: 'Обналиченные',
  Comment: 'Комментарий',
  Confirmation: 'Подтверждение',
  Created: 'Созданные',
  More: 'Дополнительно',
  'Send an email again': 'Отправить письмо еще раз',
  'Balance is insufficient': 'Недостаточно средств',
  'Could not be less than 1': 'Сумма не может быть меньше 1',

  'deposit.usdx.e':
    'Принимаются только депозиты токенов {currency}, будьте внимательны при отправке средств!',
  'withdraw.usdx.e':
    'Вывод осуществляется только токенов {currency}. Пожалуйста убедитесь, что формат токенов совпадает.',
  'deposit.erc20warning': 'Средства принимаются только по сети ERC-20',
  'deposit.erc20MDTWarning':
    'Средства принимаются только в виде ERC-20 токенов MonolithosDAO Token (MDT)',
  'deposit.contract': 'Прием средств с контрактных адресов может занять длительное время',

  'verification.pass': 'Пройдите верификацию',
  'verification.oops': '😔 Упс!',
  'verification.info':
    'Финансовые операции на вашем аккаунте временно недоступны.{br}' +
    'Если вы новый пользователь, вам необходимо пройти верификацию.{br}' +
    'Если вы уже давно зарегистрированы, то возможно, ваш аккаунт ограничен за нарушение условий сервиса.',
  'verification.support': '🤖 Поддержка:',

  'rate.select':
    'Установите источник курса для пары {pair}.{br}Источник курса будет использоваться в Ваших объявлениях для Р2Р торговли, с плавающим курсом.',

  'proposal_otp.body':
    'Вы используете значительную сумму средств при работе с платформой. Пока у вас не установлена 2FA, вы находитесь в зоне риска.{br}{br}Настоятельно рекомендуем установить 2FA для защиты своего аккаунта!',
  'proposal_otp.yes': 'Установить',
  'proposal_otp.no': 'Позже',

  'reports.report_100': 'Отчет о движении денежных средств',
  'reports.report_101': 'История обменов',
  'reports.report_102': 'Выписанные чеки',
  'reports.report_103': 'Выписка по кошельку',
  'reports.report_104': 'Реферальная программа',
  'reports.report_105': 'Общий финансовый отчет',

  'P2P Deposits': 'P2P депозиты',
  'P2P Withdrawals': 'P2P выводы',
  'Exchange Deposits': 'Биржевые депозиты',
  'Exchange Withdrawals': 'Биржевые выводы',
  'Edit comment': 'Редактировать комментарий',
  'Deposit History': 'История депозитов',
  'Withdrawal History': 'История выводов',
  Exchange: 'Биржа',
  P2P: 'P2P',
  of: 'из',
  today: 'Сегодня',
  yesterday: 'Вчера',

  'Email verification code': 'Код подтверждения',
  Confirm: 'Подтвердить',
  'Resend code': 'Выслать повторно',

  'signed.command.TwoFA.Cancel': 'Двухфакторная аутентификация успешно отключена',
  'signed.command.Withdraw.Submit': 'Вывод подтвержден!',
  'signed.command.Voucher.Create': 'Чек успешно создан!',
  'signed.command.ApiKey.Create-usr': 'API ключ успешно создан!',
  'signed.command.ApiKey.Create-mob': 'Мобильное устройство привязано',
  'signed.error.TokenIsExpired': 'Требуется токен',
  'signed.error.TokenIsNotFound': 'Токен не найден',
  'signed.error.MalformedToken': 'Неправильный токен',
  'signed.error.NotAllowed': 'Запрещено',
  'signed.error.Failed': 'Ошибка',
  'signed.error.title': 'Произошла ошибка',
  'signed.error.subtitle': 'Попробуйте повторить операцию или обратитесь в службу поддержки',
  'signed.error.auth': 'Для выполнения операции, пожалуйста, войдите в систему',

  'Try again': 'Повторить',
  Forward: 'Далее',
  Login: 'Войти',
  'Nothing found': 'Ничего не найдено',
  Search: 'Поиск',
};
