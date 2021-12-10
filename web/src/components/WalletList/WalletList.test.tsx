import { Currency, Money } from '@bitzlato/money-js';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { WalletList, WalletListProps } from '../../components';
import { Wallet } from '../../modules';

const onWalletSelectionChange = jest.fn();
const BTC: Currency = {
  code: 'BTC',
  minorUnit: 8,
};
const USD: Currency = {
  code: 'USD',
  minorUnit: 2,
};
const walletItems: Wallet[] = [
  {
    locked: Money.fromDecimal('1', BTC),
    withdraw_fee: Money.fromDecimal(0.123, BTC),
    currency: BTC,
    icon_id: 'BTC',
    name: 'Bitcoin',
    balance: Money.fromDecimal('456', BTC),
    type: 'fiat',
    precision: 8,
    price: '1',
    min_withdraw_amount: Money.fromDecimal(0, BTC),
    limit_24_hour: Money.fromDecimal(0, BTC),
    limit_1_month: Money.fromDecimal(0, BTC),
    explorer_transaction: 'https://testnet.blockchain.info/tx/#{txid}',
    explorer_address: 'https://testnet.blockchain.info/address/#{address}',
  },
  {
    withdraw_fee: Money.fromDecimal(0.123, USD),
    locked: Money.fromDecimal('100', USD),
    currency: USD,
    icon_id: 'USD',
    name: 'United states Dollar',
    balance: Money.fromDecimal('456', USD),
    type: 'coin',
    precision: 8,
    price: '1',
    min_withdraw_amount: Money.fromDecimal(0, USD),
    limit_24_hour: Money.fromDecimal(0, USD),
    limit_1_month: Money.fromDecimal(0, USD),
  },
  {
    withdraw_fee: Money.fromDecimal(0.3, BTC),
    locked: Money.fromDecimal('0.4', BTC),
    currency: BTC,
    icon_id: 'BTC',
    name: 'Bitcoin - 2',
    balance: Money.fromDecimal('2', BTC),
    type: 'fiat',
    precision: 8,
    price: '1',
    min_withdraw_amount: Money.fromDecimal(0, BTC),
    limit_24_hour: Money.fromDecimal(0, BTC),
    limit_1_month: Money.fromDecimal(0, BTC),
  },
];

const defaultProps: WalletListProps = {
  activeIndex: 0,
  onWalletSelectionChange: onWalletSelectionChange,
  walletItems: walletItems,
  onActiveIndexChange: jest.fn,
};

const setup = (props: Partial<WalletListProps> = {}) =>
  shallow(<WalletList {...{ ...defaultProps, ...props }} />);

describe('WalletList', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct className', () => {
    expect(wrapper.hasClass('cr-wallet-list')).toBeTruthy();
  });

  it('should handle onWalletSelectionChange callback when an element is pressed', () => {
    const first = wrapper.find('[onClick]').first();
    first.simulate('click');
    expect(onWalletSelectionChange).toHaveBeenCalled();
    expect(onWalletSelectionChange).toHaveBeenCalledTimes(1);
  });
});
