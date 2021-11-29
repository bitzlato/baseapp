import { en as customTranslations } from '../custom/translations/en';
import { en as mobileTranslations } from '../mobile/translations/en';
import { nationalitiesNames } from './nationalities';

export const en = {
  'page.header.navbar.signIn': 'Sign In',
  'page.header.navbar.quick.exchange': 'Quick Exchange',
  'page.header.navbar.trade': 'Trade',
  'page.header.navbar.wallets': 'Wallets',
  'page.header.navbar.openOrders': 'Orders',
  'page.header.navbar.history': 'History',
  'page.header.navbar.api': 'API Documentation',
  'page.header.navbar.internal.transfer': 'Internal transfer',
  'page.header.navbar.toP2P': 'P2P Trading',

  'page.header.navbar.profile': 'Profile',
  'page.header.navbar.logout': 'Logout',

  'page.sidebar.group.text': 'Fee Group:',
  'page.sidebar.group.value': 'Base',

  'page.body.trade.header.market': 'Market',
  'page.body.trade.header.yours': 'Yours',

  'page.body.trade.header.markets': 'Markets',
  'page.body.trade.header.markets.content.market': 'Market',
  'page.body.trade.header.markets.content.pair': 'Pair',
  'page.body.trade.header.markets.content.price': 'Price',
  'page.body.trade.header.markets.content.last_price': 'Last Price',
  'page.body.trade.header.markets.content.change': 'Change',
  'page.body.trade.header.markets.content.search': 'Search',
  'page.body.trade.header.markets.content.volume': 'Volume',

  'page.body.trade.header.newOrder': 'Order Form',
  'page.body.trade.header.newOrder.content.tabs.buy': 'Buy',
  'page.body.trade.header.newOrder.content.tabs.sell': 'Sell',
  'page.body.trade.header.newOrder.content.orderType': 'Order Type',
  'page.body.trade.header.newOrder.content.orderType.limit': 'Limit',
  'page.body.trade.header.newOrder.content.orderType.market': 'Market',
  'page.body.trade.header.newOrder.content.price': 'Price',
  'page.body.trade.header.newOrder.content.triggerPrice': 'Trigger price {sign} Market p.',
  'page.body.trade.header.newOrder.content.amount': 'Amount',
  'page.body.trade.header.newOrder.content.total': 'Total',
  'page.body.trade.header.newOrder.content.available': 'Available',
  'page.body.trade.header.newOrder.content.filterPrice': 'Valid price step is {priceStep}',
  'page.body.trade.header.newOrder.locked.minLevel.text':
    'Please verify your account to start trading',
  'page.body.trade.header.newOrder.locked.minLevel.buttonText': 'Verify Your Account',
  'page.body.trade.header.newOrder.locked.login.text':
    'Please login to your account to start trading',

  'error.order.create.minAmount': 'Amount is too low. Minimum amount is {amount} {currency}',
  'error.order.create.minPrice': 'Price is too low. Minimum price is {price} {currency}',
  'error.order.create.maxPrice': 'Price is too high. Maximum price is {price} {currency}',
  'error.order.create.minTriggerPrice':
    'Trigger price is too low. Minimum price is {price} {currency}',
  'error.order.create.maxTriggerPrice':
    'Trigger price is too high. Maximum price is {price} {currency}',
  'error.order.create.available': 'Balance exceeded. Available {available} {currency}',

  'page.body.trade.header.marketDepths': 'Market Depth',
  'page.body.trade.header.marketDepths.content.price': 'Price:',
  'page.body.trade.header.marketDepths.content.volume': 'Amount:',
  'page.body.trade.header.marketDepths.content.cumulativeVolume': 'Total:',
  'page.body.trade.header.marketDepths.content.cumulativeValue': 'Estimated Value:',

  'page.body.trade.toolBar.lowest': 'Lowest 24h',
  'page.body.trade.toolBar.lastPrice': 'Last Price',
  'page.body.trade.toolBar.selectMarket': 'Select Market',
  'page.body.trade.toolBar.highest': 'Highest 24h',
  'page.body.trade.toolBar.volume': '24h Volume',
  'page.body.trade.toolBar.change': 'Change',

  'page.body.trade.header.asks': 'Asks',
  'page.body.trade.header.bids': 'Bids',
  'page.body.trade.orderbook': 'Order Book',
  'page.body.trade.orderbook.lastMarket': 'Last Market Price',
  'page.body.trade.orderbook.header.price': 'Price',
  'page.body.trade.orderbook.header.amount': 'Amount',
  'page.body.trade.orderbook.header.volume': 'Total',

  'page.body.trade.header.recentTrades': 'Recent Trades',
  'page.body.trade.header.recentTrades.content.time': 'Time',
  'page.body.trade.header.recentTrades.content.price': 'Price',
  'page.body.trade.header.recentTrades.content.amount': 'Amount',

  'page.body.trade.header.openOrders': 'Open Orders',
  'page.body.trade.header.openOrders.content.date': 'Time',
  'page.body.trade.header.openOrders.content.market': 'Market',
  'page.body.trade.header.openOrders.content.side': 'Side',
  'page.body.trade.header.openOrders.content.side.buy': 'Buy',
  'page.body.trade.header.openOrders.content.side.sell': 'Sell',
  'page.body.trade.header.openOrders.content.type': 'Type',
  'page.body.trade.header.openOrders.content.type.stop_loss': 'Stop-loss',
  'page.body.trade.header.openOrders.content.type.stop_limit': 'Stop-limit',
  'page.body.trade.header.openOrders.content.type.take_limit': 'Take-limit',
  'page.body.trade.header.openOrders.content.type.take_profit': 'Take-profit',
  'page.body.trade.header.openOrders.content.type.limit': 'Limit',
  'page.body.trade.header.openOrders.content.type.market': 'Market',
  'page.body.trade.header.openOrders.content.state': 'State',
  'page.body.trade.header.openOrders.content.price': 'Price',
  'page.body.trade.header.openOrders.content.amount': 'Amount',
  'page.body.trade.header.openOrders.content.total': 'Value',
  'page.body.trade.header.openOrders.content.trigger': 'Trigger',
  'page.body.trade.header.openOrders.content.filled': 'Filled',
  'page.body.trade.header.openOrders.hideOtherPairs': 'Hide other pairs',
  'page.body.trade.header.openOrders.lastPrice': 'Last price',

  /* Charts */
  'page.body.charts.tabs.chart': 'Chart',
  'page.body.charts.tabs.depth': 'Depth',

  /* Markets Table */
  'page.body.marketsTable.filter.all': 'All',
  'page.body.marketsTable.header.pair': 'Market',
  'page.body.marketsTable.header.lastPrice': 'Last Price',
  'page.body.marketsTable.header.change': '24 Change',
  'page.body.marketsTable.header.high': '24  high',
  'page.body.marketsTable.header.low': '24 low',
  'page.body.marketsTable.header.volume': '24 Volume',

  /* Landing */
  'page.body.landing.header.button1': 'profile',
  'page.body.landing.header.button2': 'log in',
  'page.body.landing.header.button3': 'register',

  'page.body.landing.marketInfo.title.text1': 'Welcome',
  'page.body.landing.marketInfo.title.text2': 'Trade cryptocurrency easily',
  'page.body.landing.marketInfo.title.button': 'Start Trading',

  'page.body.landing.platformInfo.item.first.value': '30M+',
  'page.body.landing.platformInfo.item.first.title': 'Customers served',
  'page.body.landing.platformInfo.item.second.value': '$3M+',
  'page.body.landing.platformInfo.item.second.title': '30 days volume',
  'page.body.landing.platformInfo.item.third.value': '101',
  'page.body.landing.platformInfo.item.third.title': 'Countries supported',

  'page.body.landing.register.item.title': 'Regardless of your experience level',
  'page.body.landing.register.item.text':
    'We offer an intuitive interface with real-time order books, charting tools, trade history and a simple ordering process so you can trade from the first day',
  'page.body.landing.register.item.button': 'register',

  'page.body.landing.features.title': 'Platform opportunities',
  'page.body.landing.features.features.item1.title': 'Exchange',
  'page.body.landing.features.features.item2.title': 'Order types',
  'page.body.landing.features.features.item3.title': 'Customizable interface',
  'page.body.landing.features.features.item4.title': 'Security',
  'page.body.landing.features.features.item5.title': 'Community',
  'page.body.landing.features.features.item6.title': 'Industry leading API',
  'page.body.landing.features.features.item1.text':
    'The platform offers a liquid order book, allowing users to easily exchange Bitcoin, Ethereum, EOS, Litecoin, Ripple, NEO and many other digital assets with minimal slippage.',
  'page.body.landing.features.features.item2.text':
    'The platform offers a suite of order types to give traders the tools they need for every scenario. Discover more about our most advanced Algorithmic orders types.',
  'page.body.landing.features.features.item3.text':
    'Set up your workspace according to your needs: compose your layout, choose between themes, set up notifications and data preferences.',
  'page.body.landing.features.features.item4.text':
    'Security of user information and funds is our first priority. Contact us to learn more about our security features and integrations.',
  'page.body.landing.features.features.item5.text':
    'Join a global community that believes in the power of crypto.',
  'page.body.landing.features.features.item6.text':
    'Our Websocket feed lets you easily gain access to real-time market data, while our trading API lets you develop secure, programmatic trading bots.',

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

  'page.body.landing.footer.exchange': 'Exchange',
  'page.body.landing.footer.fees': 'Fees',
  'page.body.landing.footer.faq': 'FAQ',
  'page.body.landing.footer.support': 'Support',
  'page.body.landing.footer.about': 'About us',
  'page.body.landing.footer.blog': 'Blog',
  'page.body.landing.footer.api': 'API',
  'page.body.landing.footer.reviews': 'Reviews',
  'page.body.landing.footer.p2p': 'P2P platform',
  'page.body.landing.footer.paymentGateway': 'Payment Gateway',
  'page.body.landing.footer.cryptoloan': 'Crypto Loan',
  'page.body.landing.footer.rights': 'Bitzlato © All rights reserved.',

  'pagy.body.footer.powered_by': 'Powered by',

  /* Wallets */
  'page.body.wallets.estimated_value': 'Estimated Value',

  'page.body.wallets.locked': 'Locked',
  'page.body.wallets.balance': 'Balance',
  'page.body.wallets.tabs.deposit': 'Deposit',
  'page.body.wallets.tabs.deposit.disabled.message': 'Deposit was disabled by administration',
  'page.body.wallets.warning.deposit.verification':
    'Deposits are allowed after passing KYC verification',
  'page.body.wallets.warning.deposit.verification.button': 'Verify Your Account',
  'page.body.wallets.tabs.deposit.ccy.message.submit':
    'Submit a deposit using the following address or QR code. Your deposit will be reflected in your account after {confirmations} confirmations',
  'page.body.wallets.tabs.deposit.ccy.message.address': 'Deposit Address',
  'page.body.wallets.tabs.deposit.ccy.message.success': 'Address copied',
  'page.body.wallets.tabs.deposit.ccy.message.pending': 'Generating deposit address',
  'page.body.wallets.tabs.deposit.ccy.message.minimum': 'Minimum amount of deposit',
  'page.body.wallets.tabs.deposit.ccy.message.fee': 'Deposit Fee',
  'page.body.wallets.tabs.deposit.ccy.message.fee.free': 'Free',
  'page.body.wallets.tabs.deposit.ccy.message.warning':
    'The asset you have deposited may be lost if the deposit amount is less than the minimum',
  'page.body.wallets.tabs.deposit.ccy.button.generate': 'Generate {currency} address',
  'page.body.wallets.tabs.deposit.ccy.button.create': 'Create Deposit',

  'page.body.wallets.tabs.deposit.fiat.message1': 'Deposit using bank transfer',
  'page.body.wallets.tabs.deposit.fiat.message2':
    'Please use the following credentials to initiate your bank transfer. Your deposit will be reflected in your account within 2 business days.',
  'page.body.wallets.tabs.deposit.fiat.bankName': 'Bank Name',
  'page.body.wallets.tabs.deposit.fiat.accountNumber': 'Account number',
  'page.body.wallets.tabs.deposit.fiat.accountName': 'Account name',
  'page.body.wallets.tabs.deposit.fiat.phoneNumber': 'Phone Number',
  'page.body.wallets.tabs.deposit.fiat.referenceCode': 'Your reference code',
  'page.body.wallets.tabs.deposit.fiat.admin':
    ' To initiate a fiat withdrawal, please contact administrator!',
  'page.body.wallets.table.pending': 'Pending',
  'page.body.wallets.table.rejected': 'Rejected',
  'page.body.wallets.table.invoiced': 'Invoiced',

  'page.body.wallets.tabs.withdraw': 'Withdraw',
  'page.body.wallets.tabs.withdraw.content.amount': 'Withdrawal Amount',
  'page.body.wallets.tabs.withdraw.content.code2fa': '2FA code',
  'page.body.wallets.tabs.withdraw.content.fee': 'Withdrawal Fee',
  'page.body.wallets.tabs.withdraw.content.total': 'Total Withdrawal Amount',
  'page.body.wallets.tabs.withdraw.content.min': 'Min Withdrawal Amount',
  'page.body.wallets.tabs.withdraw.content.limit24h': 'Withdrawal Limit 24h',
  'page.body.wallets.tabs.withdraw.content.limit72h': 'Withdrawal Limit 72h',
  'page.body.wallets.tabs.withdraw.content.button': 'WITHDRAW',
  'page.body.wallets.tabs.withdraw.disabled.message': 'Withdraw was disabled by administration',
  'page.body.wallets.warning.withdraw.verification':
    'Withdraws are allowed after passing KYC verification',
  'page.body.wallets.warning.withdraw.verification.button': 'Verify Your Account',
  'page.body.wallets.warning.withdraw.2fa': 'Withdraws are allowed after enabling 2FA',
  'page.body.wallets.warning.withdraw.2fa.button': 'Enable 2FA',

  'page.body.wallets.tabs.withdraw.modal.confirmation': 'Confirmation',
  'page.body.wallets.tabs.withdraw.modal.message1': 'You will receive ',
  'page.body.wallets.tabs.withdraw.modal.message2': ' on address',
  'page.body.wallets.tabs.withdraw.modal.button.cancel': 'Cancel',
  'page.body.wallets.tabs.withdraw.modal.button.withdraw': 'Withdraw',

  'page.body.wallets.tabs.withdraw.content.enable2fa': 'To withdraw you have to enable 2FA',
  'page.body.wallets.tabs.withdraw.content.enable2faButton': 'Enable 2FA',

  'success.beneficiaries.created': 'Beneficiaries: successfully created',
  'success.beneficiaries.activated': 'Beneficiaries: successfully activated',
  'success.beneficiaries.deleted': 'Beneficiaries: successfully deleted',
  'success.beneficiaries.resent_pin': 'Beneficiaries: pin resent',
  'error.beneficiaries.max10.addresses': 'You can register up to 10 withdrawal addresses',

  'success.deposits.created': 'Deposit intention: successfully created',

  'page.body.wallets.beneficiaries.title': 'Withdraw address',
  'page.body.wallets.beneficiaries.fiat.title': 'Withdrawal details',
  'page.body.wallets.beneficiaries.dropdown.address': 'Address',
  'page.body.wallets.beneficiaries.dropdown.select': 'Select',
  'page.body.wallets.beneficiaries.dropdown.name': 'Name',
  'page.body.wallets.beneficiaries.dropdown.pending': 'Pending',

  'page.body.wallets.beneficiaries.dropdown.fiat.account': 'Account',
  'page.body.wallets.beneficiaries.dropdown.fiat.bankOfBeneficiary': 'Bank of Beneficiary',
  'page.body.wallets.beneficiaries.dropdown.fiat.beneficiary': 'Beneficiary',
  'page.body.wallets.beneficiaries.dropdown.fiat.description': 'Description',
  'page.body.wallets.beneficiaries.dropdown.fiat.name': 'Name',
  'page.body.wallets.beneficiaries.dropdown.fiat.fullName': 'Full Name',

  'page.body.wallets.beneficiaries.addAddress': 'Add Address',
  'page.body.wallets.beneficiaries.addAddressModal.header': 'Add new withdrawal address',

  'page.body.wallets.beneficiaries.addAddressModal.body.coinAddress': 'Blockchain Address',
  'page.body.wallets.beneficiaries.addAddressModal.body.bitzlatoAddress': 'Bitzlato Public Name',
  'page.body.wallets.beneficiaries.addAddressModal.body.invalidAddress': 'Invalid Address',
  'page.body.wallets.beneficiaries.addAddressModal.body.testnetAddress':
    'WARNING! This is testnet address',
  'page.body.wallets.beneficiaries.addAddressModal.body.coinBeneficiaryName':
    'Address title (example Bitzlato Telegram)',
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

  'page.body.wallets.beneficiaries.addAddressModal.body.button': 'Submit for confirmation',

  'page.body.wallets.beneficiaries.confirmationModal.header': 'Confirm new address',
  'page.body.wallets.beneficiaries.confirmationModal.body.text':
    'We have sent you an email containing a confirmation code pin, please enter it below to save the new address:',
  'page.body.wallets.beneficiaries.confirmationModal.body.confirmationModalCode': 'Pin code',
  'page.body.wallets.beneficiaries.confirmationModal.body.resendButton': 'Resend pin',
  'page.body.wallets.beneficiaries.confirmationModal.body.button': 'Confirm',

  'page.body.wallets.beneficiaries.tipAddress': 'Address',
  'page.body.wallets.beneficiaries.tipName': 'Name',
  'page.body.wallets.beneficiaries.tipDescription': 'Note',

  'page.body.wallets.beneficiaries.failAddModal.header': 'Warning',
  'page.body.wallets.beneficiaries.failAddModal.content':
    'You need to confirm your account to add a beneficiary',
  'page.body.wallets.beneficiaries.failAddModal.button': 'Confirm an account',

  'page.body.wallets.deposits.metamask': 'Deposit using the Metamask',
  'page.body.wallets.deposits.addDepositModal.header': 'Select amount to deposit',
  'page.body.wallets.deposits.addDepositModal.body.button': 'Submit',
  'page.body.wallets.deposits.addDepositModal.body.invalidAmount': 'Invalid amount',
  'page.body.wallets.deposits.addDepositModal.amount': 'Deposit Amount',

  'page.body.openOrders.tab.all': 'All',
  'page.body.openOrders.tab.open': 'Open',
  'page.body.openOrders.header.date': 'Date',
  'page.body.openOrders.header.market': 'Market',
  'page.body.openOrders.header.side': 'Side',
  'page.body.openOrders.header.side.buy': 'Buy',
  'page.body.openOrders.header.side.sell': 'Sell',
  'page.body.openOrders.header.orderType': 'Type',
  'page.body.openOrders.header.avgPrice': 'Avg. Price',
  'page.body.openOrders.header.price': 'Price',
  'page.body.openOrders.header.amount': 'Amount',
  'page.body.openOrders.header.value': 'Value',
  'page.body.openOrders.header.trigger': 'Trigger',
  'page.body.openOrders.header.filled': 'Filled',
  'page.body.openOrders.header.status': 'Status',
  'page.body.openOrders.content.status.done': 'Executed',
  'page.body.openOrders.content.status.wait': 'Open',
  'page.body.openOrders.content.status.cancel': 'Stopped',
  'page.body.openOrders.content.status.reject': 'Rejected',
  'page.body.openOrders.header.button.cancelAll': 'Cancel all',
  'page.body.openOrders.header.button.refresh': 'Refresh',

  'page.body.history.deposit': 'Deposit History',
  'page.body.history.deposit.header.txid': 'txID',
  'page.body.history.deposit.header.date': 'Date',
  'page.body.history.deposit.header.currency': 'Currency',
  'page.body.history.deposit.header.amount': 'Amount',
  'page.body.history.deposit.header.status': 'Status',
  'page.body.history.deposit.content.status.accepted': 'Accepted',
  'page.body.history.deposit.content.status.collected': 'Collected',
  'page.body.history.deposit.content.status.submitted': 'Submitted',
  'page.body.history.deposit.content.status.canceled': 'Cancelled',
  'page.body.history.deposit.content.status.rejected': 'Rejected',
  'page.body.history.deposit.content.status.skipped': 'Skipped',
  'page.body.history.deposit.content.status.processing': 'Processing',
  'page.body.history.deposit.content.status.fee_processing': 'Processing',
  'page.body.history.deposit.content.status.errored': 'Errored',
  'page.body.history.deposit.content.status.refunding': 'Refunding',
  'page.body.history.deposit.content.status.wait_payment': 'Waiting for payment',
  'page.body.history.deposit.content.status.confirmed': 'Confirmed',
  'page.body.history.deposit.content.status.confirming': 'Confirming',

  'page.body.history.withdraw': 'Withdrawal History',
  'page.body.history.withdraw.header.id': 'ID',
  'page.body.history.withdraw.header.date': 'Date',
  'page.body.history.withdraw.header.currency': 'Currency',
  'page.body.history.withdraw.header.address': 'Address',
  'page.body.history.withdraw.header.amount': 'Amount',
  'page.body.history.withdraw.header.fee': 'Fee',
  'page.body.history.withdraw.header.status': 'Status',
  'page.body.history.withdraw.content.status.prepared': 'Prepared',
  'page.body.history.withdraw.content.status.submitted': 'Submitted',
  'page.body.history.withdraw.content.status.skipped': 'Skipped',
  'page.body.history.withdraw.content.status.canceled': 'Cancelled',
  'page.body.history.withdraw.content.status.accepted': 'Accepted',
  'page.body.history.withdraw.content.status.suspected': 'Suspected',
  'page.body.history.withdraw.content.status.rejected': 'Rejected',
  'page.body.history.withdraw.content.status.processing': 'Processing',
  'page.body.history.withdraw.content.status.succeed': 'Succeed',
  'page.body.history.withdraw.content.status.failed': 'Failed',
  'page.body.history.withdraw.content.status.confirming': 'Confirming',
  'page.body.history.withdraw.content.status.errored': 'Errored',
  'page.body.history.withdraw.content.status.under_review': 'Under review',

  'page.body.history.trade': 'Trade History',
  'page.body.history.trade.header.id': 'ID',
  'page.body.history.trade.header.date': 'Date',
  'page.body.history.trade.header.side': 'Side',
  'page.body.history.trade.content.side.buy': 'Buy',
  'page.body.history.trade.content.side.sell': 'Sell',
  'page.body.history.trade.header.market': 'Market',
  'page.body.history.trade.header.price': 'Price',
  'page.body.history.trade.header.total': 'Total',
  'page.body.history.trade.header.amount': 'Amount',
  'page.body.history.trade.header.balance': 'Balance',

  'page.body.history.transfer': 'Transfer History',
  'page.body.history.transfer.header.date': 'Date',
  'page.body.history.transfer.header.amount': 'Amount',
  'page.body.history.transfer.header.currency': 'Currency',
  'page.body.history.transfer.header.direction': 'Direction',
  'page.body.history.transfer.header.toAccount': 'To account',
  'page.body.history.transfer.header.status': 'Status',
  'page.body.history.transfer.content.status.completed': 'Completed',

  'page.body.history.quick': 'Quick Exchange',

  'page.body.profile.header.account': 'Profile',

  'page.body.profile.header.account.username': 'Username',
  'page.body.profile.header.account.content.password': 'Password',
  'page.body.profile.header.account.content.password.button.change': 'Change',
  'page.body.profile.header.account.content.password.old': 'Old password',
  'page.body.profile.header.account.content.password.new': 'New password',
  'page.body.profile.header.account.content.password.button.save': 'Save',
  'page.body.profile.header.account.content.password.button.cancel': 'Cancel',
  'page.body.profile.header.account.content.password.conf': 'Password Confirmation',
  'page.body.profile.header.account.content.password.dont.match': "Passwords don't match",
  'page.body.profile.header.account.content.password.change.success': 'Success!',
  'page.body.profile.header.account.content.password.change': 'Change password',

  'page.body.profile.header.account.content.twoFactorAuthentication': '2FA',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.enable': 'Enabled',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.disable': 'Disabled',
  'page.body.profile.header.account.content.twoFactorAuthentication.header': 'Google Authenticator',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.1':
    'Download and install Google Authenticator application from ',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.or': 'or ',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.2':
    'Scan QR code or use secret MFA code:',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.3':
    '* Save this secret in a secure location. This code can be used to gain 2FA access from a different device.',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.mfa': 'MFA code',
  'page.body.profile.header.account.content.twoFactorAuthentication.message.4':
    'Enter 2fa code from the app',
  'page.body.profile.header.account.content.twoFactorAuthentication.subHeader': '2FA code',
  'page.body.profile.header.account.content.twoFactorAuthentication.enable': 'ENABLE',
  'page.body.profile.header.account.content.twoFactorAuthentication.disable': 'DISABLE 2FA',
  'page.body.profile.header.account.content.twoFactorAuthentication.modalBody':
    'Please сontact administrator to disable',
  'page.body.profile.header.account.content.twoFactorAuthentication.modalHeader':
    'Two-factor authentication is enabled',

  'page.body.profile.header.account.profile': 'Profile Verification',
  'page.body.profile.header.account.profile.email.title': 'Email verified',
  'page.body.profile.header.account.profile.email.message': 'Deposit/Withdraw enabled',
  'page.body.profile.header.account.profile.phone.unverified.title': 'Phone verification',
  'page.body.profile.header.account.profile.phone.title': 'Phone verified',
  'page.body.profile.header.account.profile.phone.message': 'Deposit/Trade enabled',
  'page.body.profile.header.account.profile.identity.unverified.title': 'Identity verification',
  'page.body.profile.header.account.profile.identity.title': 'Identity verified',
  'page.body.profile.header.account.profile.identity.message': 'Withdraw enabled',

  'page.body.profile.header.referralProgram': 'Referral Link',
  'page.body.profile.content.copyLink': 'Copy',

  'page.body.profile.apiKeys.header': 'My API Keys',
  'page.body.profile.apiKeys.header.create': 'Create new',

  'page.body.profile.apiKeys.noOtp': 'Please enable Two-factor authentication',
  'page.body.profile.apiKeys.show': 'Show',
  'page.body.profile.apiKeys.noKeys': 'You have no API keys',

  'page.body.profile.apiKeys.modal.btn.show': 'Show',
  'page.body.profile.apiKeys.modal.btn.create': 'Create',
  'page.body.profile.apiKeys.modal.btn.copy': 'Copy',
  'page.body.profile.apiKeys.modal.btn.activate': 'Activate',
  'page.body.profile.apiKeys.modal.btn.disabled': 'Disable',
  'page.body.profile.apiKeys.modal.btn.delete': 'Delete',
  'page.body.profile.apiKeys.modal.header': '2FA Verification',
  'page.body.profile.apiKeys.modal.created_header': 'Created',
  'page.body.profile.apiKeys.modal.access_key': 'Access Key',
  'page.body.profile.apiKeys.modal.secret_key': 'Secret Key',
  'page.body.profile.apiKeys.modal.secret_key_info':
    'This information will be shown only once and cannot be retrieved once lost.',
  'page.body.profile.apiKeys.modal.secret_key_store': 'Please store it properly.',
  'page.body.profile.apiKeys.modal.note': 'Note',
  'page.body.profile.apiKeys.modal.note_content': `To avoid asset loss, please do not tell your Secret Key and Private Key to others.\
 If you forget you Secret Key, please delete it and apply for a new Secret Key pair.`,
  'page.body.profile.apiKeys.modal.title': 'Enter 2fa code from the app',

  'page.body.profile.apiKeys.table.header.kid': 'Kid',
  'page.body.profile.apiKeys.table.header.algorithm': 'Algorithm',
  'page.body.profile.apiKeys.table.header.state': 'State',
  'page.body.profile.apiKeys.table.header.created': 'Created',
  'page.body.profile.apiKeys.table.header.updated': 'Updated',

  'success.api_keys.fetched': 'Successfully fetched API keys',
  'success.api_keys.created': 'API key was created',
  'success.api_keys.copied.access': 'Access key was copied',
  'success.api_keys.copied.secret': 'Secret key was copied',
  'success.api_keys.updated': 'API key was updated',
  'success.api_keys.deleted': 'API key was deleted',

  'page.body.profile.header.accountActivity': 'Account Activity',
  'page.body.profile.header.accountActivity.content.date': 'Date',
  'page.body.profile.header.accountActivity.content.addressip': 'Address IP',
  'page.body.profile.header.accountActivity.content.action': 'Action',
  'page.body.profile.header.accountActivity.content.result': 'Result',
  'page.body.profile.header.accountActivity.content.userAgent': 'User Agent',

  'page.body.profile.content.action.login': 'Login',
  'page.body.profile.content.action.logout': 'Logout',
  'page.body.profile.content.action.request2fa': 'Request QR code for 2FA',
  'page.body.profile.content.action.enable2fa': 'Enable 2FA',
  'page.body.profile.content.action.login.2fa': 'Login with 2FA',
  'page.body.profile.content.action.requestPasswordReset': 'Request password reset',
  'page.body.profile.content.action.passwordReset': 'Password reset',

  'page.body.profile.content.result.succeed': 'Succeed',
  'page.body.profile.content.result.failed': 'Failed',
  'page.body.profile.content.result.denied': 'Denied',

  /* Profile - verification */
  'page.body.profile.verification.email.title': 'Email address',
  'page.body.profile.verification.email.subtitle': 'Withdrawal allowed',
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
  'page.body.profile.verification.verified': 'Verified',
  'page.body.profile.verification.progress.level': 'Level',
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

  'page.body.kyc.phone.head': 'Verify Phone',
  'page.body.kyc.phone.enterPhone': 'Enter phone number',
  'page.body.kyc.phone.enterCode': 'Enter confirmation code',
  'page.body.kyc.identity.firstName': 'Your name',
  'page.body.kyc.identity.lastName': 'Your last name',
  'page.body.kyc.identity.dateOfBirth': 'Date of birth',
  'page.body.kyc.identity.dateOfBirth.placeholder': 'DD/MM/YYYY',
  'page.body.kyc.identity.CoR': 'Select country',
  'page.body.kyc.identity.residentialAddress': 'Your address',
  'page.body.kyc.identity.city': 'Your city',
  'page.body.kyc.identity.postcode': 'Your Postcode',
  'page.body.kyc.documents.drag': 'Drag and drop or browse files',
  'page.body.kyc.documents.maxFile': 'Maximum file size is 10MB',
  'page.body.kyc.documents.maxNum': 'Maximum number of files is 5',
  'page.body.kyc.documents.upload': 'Upload your Photo ID',
  'page.body.kyc.documents.select.passport': 'Passport',
  'page.body.kyc.documents.select.identityCard': 'Identity Card',
  'page.body.kyc.documents.select.driverLicense': 'Driver License',
  'page.body.kyc.documents.select.utilityBill': 'Utility Bill',
  'page.body.kyc.documents.number': ': Number',

  'page.body.kyc.next': 'Continue',
  'page.body.kyc.submit': 'Submit',
  'page.body.kyc.head.phone': 'Phone Verification',
  'page.body.kyc.head.identity': 'Identity Verification',
  'page.body.kyc.head.document': 'Document Verification',
  'page.body.kyc.uploadFile.error.tooBig': 'The size of selected file is too big ({value}KB)',
  'page.body.kyc.uploadFile.error.tooSmall': 'The size of selected file is too small ({value}KB)',

  'page.body.lock.oops': 'Oops!',
  'page.body.lock.expired': 'It seems your trial has expired',
  'page.body.lock.license': 'It seems your license key is invalid',
  'page.body.lock.visit': 'Visit',

  'page.footer.legalDocuments': 'Legal documents',
  'page.footer.faq': 'FAQ',
  'page.footer.information': 'Information',
  'page.footer.products': 'Products',
  'page.footer.company': 'Company',

  'page.header.signIn': 'Sign In',
  'page.header.signIn.email': 'Email',
  'page.header.signIn.password': 'Password',
  'page.header.signIn.password.message.error': 'Password is invalid',
  'page.header.signIn.receiveConfirmation': "Didn't receive your confirmation email?",
  'page.header.signIn.forgotPassword': 'Forgot your password?',
  'page.header.signIn.resetPassword.title': 'Reset password',
  'page.header.signIn.resetPassword.newPassword': 'New password',
  'page.header.signIn.resetPassword.repeatPassword': 'Repeat password',
  'page.header.signIn.resetPassword.button': 'Change',
  'page.header.signIn.resetPassword.error': 'Fields are empty or don`t matches',

  'page.header.signUp': 'Sign Up',
  'page.header.signUp.username.minLength.error':
    'Please, enter more characters. Min number of characters is 4',
  'page.header.signUp.username.maxLength.error':
    'Please, enter fewer characters. Maximum number of characters is 12',
  'page.header.signUp.username.uniqueness.error': 'This username is already taken',
  'page.header.signUp.email': 'Email',
  'page.header.signUp.email.message.error': 'Email is invalid',
  'page.header.signUp.password': 'Password',
  'page.header.signUp.password.message.error':
    'Password must contain at least 8 characters, at least one capital letter and one digit',
  'page.header.signUp.confirmPassword': 'Confirm Password',
  'page.header.signUp.confirmPassword.message.error': "Passwords don't match",
  'page.header.signUp.referalCode': 'Referral Code',
  'page.header.signUp.terms': 'I have read and agree to the Terms of Service',
  'page.header.signUp.modal.header': 'VERIFY YOUR EMAIL ADDRESS',
  'page.header.signUp.modal.body':
    'To complete registration, check for an ' +
    'email in your inbox with further ' +
    'instruction. If you cannot find the email, ' +
    'please check your spam folder',
  'page.header.signUp.modal.footer': 'OK',
  'page.header.signUp.strength.password': 'Password Strength',
  'page.header.signUp.password.too.weak': 'TOO WEAK',
  'page.header.signUp.password.weak': 'WEAK',
  'page.header.signUp.password.good': 'GOOD',
  'page.header.signUp.password.strong': 'STRONG',
  'page.header.signUp.password.very.strong': 'VERY STRONG',
  'page.resendConfirmation': 'Resend Confirmation',
  'page.forgotPassword': 'Forgot Password',
  'page.forgotPassword.message': 'Enter email to reset password',
  'page.password2fa': '2FA verification',
  'page.password2fa.message': 'Enter 2fa code from the app',
  'page.forgotPassword.email': 'Email',
  'page.forgotPassword.send': 'Send',
  'page.noDataToShow': 'There is no data to show',

  'page.modal.withdraw.success': 'Success!',
  'page.modal.withdraw.success.message.content': 'Your withdrawal request has been received',
  'page.modal.withdraw.success.button': 'OK',

  'page.modal.expired.title': 'Your session has expired',
  'page.modal.expired.submit': 'Log in again',

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

  'page.body.customization.images.field.width.label': 'Image width',
  'page.body.customization.images.field.width.placeholder': 'Only number (px)',
  'page.body.customization.images.field.url.label': 'Image url',
  'page.body.customization.images.field.url.placeholder': 'https://yourimage',

  'page.body.customization.images.header_logo.title': 'Header logo',

  /* Documentation */
  'page.documentation.header.version.title': 'Version:',
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
  'page.body.quick.exchange.header': 'Quick Exchange',
  'page.body.quick.exchange.label.exchange': 'You have',
  'page.body.quick.exchange.label.receive': 'You get',
  'page.body.quick.exchange.label.currency': 'Currency',
  'page.body.quick.exchange.sublabel.min_amount': 'Min exchange amount',
  'page.body.quick.exchange.sublabel.balance': 'Available',
  'page.body.quick.exchange.rate': 'Exchange rate',
  'page.body.quick.exchange.slippage': 'Price deviation is allowed within 2%',
  'page.body.quick.exchange.button.rearrange': 'Rearrange currencies',
  'page.body.quick.exchange.button.exchange': 'Exchange',

  'quick.exchange.order.created': 'Order successfully created',
  'quick.exchange.order.cancelled': 'Order rejected',
  'market.swap_order.outdated_price': 'The price has changed too much',

  /* Error pages */

  'page.body.restricted': 'Page not found',
  'page.body.500.maintenance': 'The platform is under maintenance',
  'page.body.500.availableSoon': 'It will be available as soon as possible',

  // success messages
  'success.addresses.accepted': 'Addresses upload was successful',
  'success.documents.accepted': 'Documents upload was successful',
  'success.identity.accepted': 'Identity upload was successful',
  'success.withdraw.action': 'Withdrawal request was received',
  'success.otp.enabled': '2FA was enabled',
  'success.otp.disabled': '2FA was disabled',
  'success.password.changed': 'Password was changed',
  'success.password.forgot': 'Password reset link has been sent to your email',
  'success.password.changed.successfuly': 'Password was changed',
  'success.order.cancelling': 'Order is being cancelled',
  'success.order.canceled': 'Order was cancelled',
  'success.order.canceled.all': 'All orders were cancelled',
  'success.order.cancelling.all': 'All orders are being canceled',
  'success.phone.verification.send': 'Verification code was sent to your phone',
  'success.phone.confirmed': 'Your phone was confirmed',
  'success.phone.confirmation.message': 'Success!',
  'success.message.sent': 'Message was sent',
  'success.email.confirmed': 'Your email address has been successfully confirmed',
  'success.order.created': 'Order was created',
  'success.order.done': 'Order successfully completed',
  'success.data.changed.language': 'Language has been changed',

  // error messages
  'error.order.rejected': 'Order rejected',
  'error.invalid_request': 'Order - invalid request',
  'error.bad_request': 'Order - bad request',
  'error.request_entity_too_large': 'Order - request entity too large',

  // barong
  'resource.labels.private': "Can't update label",
  'resource.user.no_activity': 'No activity recorded or wrong topic',
  'resource.profile.not_exist': 'User has no profile',
  'resource.profile.exist': 'Profile already exists',
  'resource.api_key.2fa_disabled': 'Only accounts with enabled 2FA alowed',
  'resource.api_key.missing_otp': 'Theaccount has enabled 2FA but OTP code is missing',
  'resource.api_key.invalid_otp': 'OTP code is invalid',
  'resource.phone.twillio': 'Something wrong with Twilio Client',
  'resource.phone.invalid_num': 'Phone number is invalid',
  'resource.phone.exists': 'Phone number was not verified. Verification code was resent.',
  'resource.phone.number_exist': 'Phone number already exists',
  'resource.phone.verification_invalid': 'Phone is not found or verification code is invalid',
  'resource.documents.limit_reached': 'Maximum number of documents already reached',
  'resource.documents.limit_will_be_reached': 'Documents amount will reach limit by this upload',
  'resource.otp.already_enabled': '2FA has been already enabled for this account',
  'resource.otp.invalid': 'OTP code is invalid',
  'resource.password.doesnt_match': "New passwords don't match",
  'resource.password.prev_pass_not_correct': 'Previous password is not correct',
  'resource.password.no_change_provided': 'New password cant be the same, as old one',
  'resource.document.empty_doc_expire': 'Expiration Date is invalid',
  'password.requirements': 'Password does not meet the minimum requirements',
  'password.password.password_strength': 'Password is too weak',

  'email.taken': 'Email already have been taken',

  'identity.user.invalid_referral_format': 'Invalid referral uid format',
  'identity.user.referral_doesnt_exist': "Referral doesn't exist",
  'identity.user.active_or_doesnt_exist': "User doesn't exist or has already been activated",
  'identity.password.user_doesnt_exist': "User doesn't exist",
  'identity.user.passwords_doesnt_match': "Passwords don't match",
  'identity.user.utilized_token': 'JWT has already been used',
  'identity.session.invalid_login_params': 'Invalid Email or Password',
  'identity.session.invalid': 'Invalid Session',
  'identity.captcha.required': 'captcha_response is required',
  'identity.captcha.mandatory_fields': 'Mandatory fields must be filled in',
  'identity.session.not_active': 'Your account is not active',
  'identity.session.banned': 'Your account is banned',
  'identity.session.invalid_params': 'Invalid Email or Password',
  'identity.session.missing_otp': 'The account has enabled 2FA but OTP code is missing',
  'identity.session.invalid_otp': 'OTP code is invalid',

  'username.taken': 'This username is already taken',
  'first_name.invalid': 'First name is invalid',
  'last_name.invalid': 'Last name is invalid',
  'city.invalid': 'City is invalid',
  'postcode.invalid': 'Postcode is invalid',
  'address.invalid': 'Address is invalid',
  'first_name.blank': 'First name is missing or empty',
  'last_name.blank': 'Last name is missing or empty',
  'dob.blank': 'Date of birth is invalid',
  'address.blank': 'Address is missing or empty',
  'city.blank': 'City is missing or empty',
  'country.blank': 'Country is missing or empty',
  'postcode.blank': 'Postcode.blank is missing or empty',
  'country.must have alpha2 or alpha3 format': 'Country must have alpha2 or alpha3 format',

  'totp.error': 'OTP code is invalid',

  'record.not_found': 'Record is not found',
  'jwt.decode_and_verify': 'Failed to decode and verify JWT',
  'authz.invalid_session': 'Failed to decode cookies',
  'authz.user_not_active': 'User is not active',
  'authz.invalid_signature': "API Key header 'signature' is invalid",
  'authz.apikey_not_active': "API Key state is 'inactive",
  'authz.disabled_2fa': 'API Key owner has disabled 2FA',
  'authz.invalid_api_key_headers': 'Blank or missing API Key headers',
  'authz.permission_denied': 'Path is denylisted',
  'authz.unexistent_apikey': 'X-Auth-Apikey header is invalid',
  'authz.client_session_mismatch': 'Session mismatch',
  'authz.csrf_token_mismatch': 'CSRF token mismatch',

  // validation errors
  // identity module
  'identity.user.missing_email': 'Email is missing',
  'identity.user.empty_email': 'Email is missing or empty',
  'identity.user.missing_password': 'Password is missing',
  'identity.user.empty_password': 'Password is missing or empty',
  'identity.user.missing_token': 'Token is missing',
  'identity.user.empty_token': 'Token is missing or empty',
  'identity.user.missing_reset_password_token': 'Reset password token is missing',
  'identity.user.empty_reset_password_token': 'Reset password token is missing or empty',
  'identity.user.missing_confirm_password': 'Confirm password is missing',
  'identity.user.empty_confirm_password': 'Confirm password is missing or empty',

  'identity.session.missing_emai': 'Email is missing',
  'identity.session.missing_password': 'Password is missing',
  'identity.session.invalid_captcha_format': 'Invalid captcha format',
  'identity.session.rack_attack_limit':
    'The limit of sign in requests exceeded, please try again in 60 seconds',

  // resource module
  'resource.otp.missing_code': 'OTP code is missing',
  'resource.otp.empty_code': 'OTP code is missing or empty',

  'resource.labels.missing_key': 'Key is missing',
  'resource.labels.empty_key': 'Key is missing or empty',
  'resource.labels.missing_value': 'Value is missing',
  'resource.labels.empty_value': 'Value is missing or empty',

  'resource.documents.missing_doc_expire': 'Documents expiration date is missing',
  'resource.documents.empty_doc_expire': 'Documents expiration date is missing or empty',
  'resource.documents.expire_not_a_date': 'Documents expiration is not a date',
  'resource.documents.missing_doc_type': 'Documents type is missing',
  'resource.documents.empty_doc_type': 'Documents type is missing or empty',
  'resource.documents.missing_doc_number': 'Documents number is missing',
  'resource.documents.empty_doc_number': 'Documents number is missing or empty',
  'resource.documents.missing_upload': 'Attachment is missing',

  'resource.user.missing_topic': 'Topic is missing',
  'resource.user.empty_topic': 'Topic is missing or empty',
  'resource.user.missing_old_password': 'Old password is missing',
  'resource.user.empty_old_password': 'Old password is missing or empty',
  'resource.user.missing_new_password': 'New password is missing',
  'resource.user.empty_new_password': 'New password is missing or empty',
  'resource.user.missing_confirm_password': 'Confirm password is missing',
  'resource.user.empty_confirm_password': 'Confirm password is missing or empty',

  'resource.profile.missing_first_name': 'First name is missing',
  'resource.profile.missing_last_name': 'Last name is missing',
  'resource.profile.missing_dob': 'Date of birth is missing',
  'resource.profile.missing_address': 'Address is missing',
  'resource.profile.missing_postcode': 'Postcode is missing',
  'resource.profile.missing_city': 'City is missing',
  'resource.profile.missing_country': 'Country is missing',

  'resource.api_key.missing_algorithm': 'Algorithm is missing',
  'resource.api_key.empty_algorithm': 'Algorithm is missing or empty',
  'resource.api_key.empty_kid': 'KID is missing or empty',
  'resource.api_key.empty_scope': 'Scope is missing or empty',
  'resource.api_key.missing_totp': 'TOTP code is missing',
  'resource.api_key.empty_totp': 'TOTP code is missing or empty',
  'resource.api_key.missing_kid': 'KID is missing',
  'resource.api_key.empty_state': 'State is missing or empty',
  'resource.api_key.invalid_totp': 'OTP code is invalid',

  'resource.phone.missing_phone_number': 'Phone number is missing',
  'resource.phone.empty_phone_number': 'Phone number is missing or empty',
  'resource.phone.missing_verification_code': 'Verification code is missing',
  'resource.phone.empty_verification_code': 'Verification code is missing or empty',

  // peatio
  'account.currency.doesnt_exist': "Currency doesn't exist",
  'account.deposit.invalid_state': 'Deposit invalid state',
  'account.deposit.non_integer_limit': 'Value you send could not be parsed into Integer type',
  'account.deposit.invalid_limit': 'Invalid limit',
  'account.deposit.non_positive_page': 'Page value must be positive',
  'account.deposit.empty_txid': 'Txid is missing, txid is empty',
  'account.deposit_address.invalid_address_format': 'Invalid deposit address format',
  'account.deposit_address.doesnt_support_cash_address_format':
    "Currency doesn't support cash address format",
  'account.withdraw.non_integer_limit':
    'Limit Value you send could not be parsed into Integer type',
  'account.withdraw.invalid_limit': 'Invalid limit',
  'account.withdraw.non_positive_page': 'Page value must be positive',
  'account.withdraw.non_integer_otp': 'Otp value could not be parsed into Integer type',
  'account.withdraw.empty_otp': 'Otp is missing, otp is empty',
  'account.withdraw.empty_rid': 'Rid is missing, rid is empty',
  'account.withdraw.non_decimal_amount':
    'Amount value you send could not be parsed into Decimal type',
  'account.withdraw.non_positive_amount': 'Amount value must be positive',
  'account.deposit.not_permitted': 'Deposits are allowed after phone verification',
  'account.withdraw.not_permitted':
    'Please, pass the corresponding verification steps to withdraw funds',
  'account.withdraw.insufficient_balance': 'Account balance is insufficient',
  'account.withdraw.invalid_amount': 'Invalid withdraw amount',
  'account.withdraw.create_error': 'Failed to create withdraw',
  'account.withdraw.invalid_otp': 'Invalid otp',
  'account.withdraw.disabled_api': 'Withdrawal API is disabled',

  'account.beneficiary.invalid_pin': 'Invalid beneficiary activation pin',
  'account.beneficiary.cant_resend_within_1_minute': "Can't resend activation pin within 1 minute",
  'account.beneficiary.duplicate_address': 'Beneficiary address already exists',
  'account.beneficiary.failed_to_create': "Can't add the beneficiary: invalid address",

  'market.market.doesnt_exist': "Market doesn't exist",
  'market.order.invalid_state': 'Invalid deposit state',
  'market.order.invalid_limit': 'Invalid limit',
  'market.order.non_integer_limit': 'Limit value you send could not be parsed into Integer type',
  'market.trade.empty_page': 'Page is missing or empty',
  'market.order.invalid_order_by': 'Invalid order_by',
  'market.order.invalid_side': 'Invalid order side',
  'market.order.non_decimal_volume': 'Volume value you send could not be parsed into Decimal type',
  'market.order.non_positive_volume': 'Volume value must be positive',
  'market.order.invalid_type': 'Invalid order type',
  'market.order.non_decimal_price': 'Volume value you send could not be parsed into Decimal type',
  'market.order.non_positive_price': 'Volume value must be positive',
  'market.order.non_integer_id': 'Id value  you send could not be parsed into Integer type',
  'market.order.empty_id': 'Id is missing or empty',
  'market.trade.non_integer_limit': 'Limit value you send could not be parsed into Integer type',
  'market.trade.invalid_limit': 'Invalid limit',
  'market.trade.non_integer_timestamp':
    'Timestamp value you send could not be parsed into Integer type',
  'market.trade.empty_timestamp': 'Timestamp is missing or empty',
  'market.trade.invalid_order_by': 'Invalid order_by',
  'market.order.insufficient_market_liquidity': 'Insufficient market liquidity ',
  'market.order.invalid_volume_or_price': 'Invalid volume or price',
  'market.order.create_error': 'Failed to create error',
  'market.order.cancel_error': 'Failed to cancel error',
  'market.order.market_order_price': "Market order doesn't have price",
  'market.trade.not_permitted':
    'Please, pass the corresponding verification steps to enable trading',
  'market.account.insufficient_balance': 'Account balance is insufficient',

  'public.currency.doesnt_exist': "Currency doesn't exist",
  'public.currency.invalid_type': 'Invalid currency type',
  'public.market.doesnt_exist': "Market doesn't exist",
  'public.order_book.non_integer_ask_limit':
    'Ask limit value you send could not be parsed into Integer type',
  'public.order_book.invalid_ask_limit': 'Invlalid ask limit',
  'public.order_book.non_integer_bid_limit':
    'Bid limir value you send could not be parsed into Integer type',
  'public.order_book.invalid_bid_limit': 'Invalid bid limit',
  'public.trade.non_integer_limit': 'Limit value you send could not be parsed into Integer type',
  'public.trade.invalid_limit': 'Invalid limit',
  'public.trade.non_positive_page': 'Page value must be positive',
  'public.trade.non_integer_timestamp':
    'Timestamp value you send could not be parsed into Integer type',
  'public.trade.invalid_order_by': 'Invalid order by',
  'public.market_depth.non_integer_limit':
    'Limit value you send could not be parsed into Integer type',
  'public.market_depth.invalid_limit': 'Invalid limit',
  'public.k_line.non_integer_period': 'Limit value you send could not be parsed into Integer type',
  'public.k_line.invalid_period': 'Invalid period',
  'public.k_line.non_integer_time_from':
    'Limit value you send could not be parsed into Integer type',
  'public.k_line.empty_time_from': 'Time_from param is missing or empty',
  'public.k_line.non_integer_time_to': 'Limit value you send could not be parsed into Integer type',
  'public.k_line.empty_time_to': 'Time_to param is missing or empty',
  'public.k_line.non_integer_limit': 'Limit value you send could not be parsed into Integer type',
  'public.k_line.invalid_limit': 'Invalid limit',

  'server.internal_error': 'Internal Server Error',

  'password.strength.tip.influence': 'What influence on password strength',
  'password.strength.tip.number.characters': 'At least 8 characters',
  'password.strength.tip.letter': 'At least One upper case and lower case letter',
  'password.strength.tip.digit': 'At least One digit',

  // metamask
  'metamask.success.connected': '[MetaMask] Account connected',

  'metamask.error.noExtension':
    '[MetaMask] No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile',
  'metamask.error.unsupportedNetwork': "[MetaMask] You're connected to an unsupported network",
  'metamask.error.unauthorized':
    '[MetaMask] Please authorize this website to access your Ethereum account',
  'metamask.error.unknown':
    '[MetaMask] An unknown error occurred. Check the console for more details',

  // internal transfer
  'page.body.internal.transfer.header': 'Internal transfer',

  'page.body.internal.transfer.header.input.uid':
    '1. Enter a valid UID of a user whom you want to transfer money',
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

  ...nationalitiesNames,
  ...customTranslations,
  ...mobileTranslations,

  // finex
  'order.action.not_permitted': 'Action is not permitted',
  'order.action_role.not_permitted': 'Action is not permitted for your user role',
  'order.action_level.not_permitted': 'Action is not permitted for your user verification level',

  'page.fees.table.coin': 'Coin',
  'page.fees.table.name': 'Name',
  'page.fees.table.network': 'Network',
  'page.fees.table.min_deposit': 'Min deposit',
  'page.fees.table.min_withdraw': 'Min withdrawal',
  'page.fees.table.deposit_fee': 'Deposit Fee',
  'page.fees.table.withdraw_fee': 'Withdrawal fee',
  your_address: 'Your address',
};
