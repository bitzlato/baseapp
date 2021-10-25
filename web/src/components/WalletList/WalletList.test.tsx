import { Currency, Money } from '@trzmaxim/money';
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
    active: false,
    locked: Money.fromDecimal('1', BTC),
    fee: Money.fromDecimal(0.123, BTC),
    currency: BTC,
    icon_id: 'BTC',
    name: 'Bitcoin',
    balance: Money.fromDecimal('456', BTC),
    type: 'fiat',
    fixed: 8,
    explorerTransaction: 'https://testnet.blockchain.info/tx/#{txid}',
    explorerAddress: 'https://testnet.blockchain.info/address/#{address}',
  },
  {
    active: false,
    fee: Money.fromDecimal(0.123, USD),
    locked: Money.fromDecimal('100', USD),
    currency: USD,
    icon_id: 'USD',
    name: 'United states Dollar',
    balance: Money.fromDecimal('456', USD),
    type: 'coin',
    fixed: 8,
  },
  {
    active: false,
    fee: Money.fromDecimal(0.3, BTC),
    locked: Money.fromDecimal('0.4', BTC),
    currency: BTC,
    icon_id: 'BTC',
    name: 'Bitcoin - 2',
    balance: Money.fromDecimal('2', BTC),
    type: 'fiat',
    fixed: 8,
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
