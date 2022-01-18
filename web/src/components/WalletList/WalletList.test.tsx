import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { BTC_CCY, createCcy, createMoney, USD_CCY } from 'src/helpers/money';
import { WalletList, WalletListProps } from '../../components';
import { WalletItemData } from '../WalletItem/WalletItem';

const onWalletSelectionChange = jest.fn();

const ETH_CCY = createCcy('ETH', 8);

const walletItems: WalletItemData[] = [
  {
    name: 'Bitcoin',
    currency: 'BTC',
    icon: 'BTC',
    balance: createMoney('1', BTC_CCY),
    balanceP2P: createMoney('0.5', BTC_CCY),
    balanceMarket: createMoney('0.5', BTC_CCY),
    approximate: createMoney('41000', USD_CCY),
    locked: createMoney('1', BTC_CCY),
    hasTransfer: true,
  },
  {
    name: 'Ethereum',
    currency: 'ETH',
    icon: 'ETH',
    balance: createMoney('1', ETH_CCY),
    balanceP2P: createMoney('0.5', ETH_CCY),
    balanceMarket: createMoney('0.5', ETH_CCY),
    approximate: createMoney('41000', USD_CCY),
    locked: createMoney('1', ETH_CCY),
    hasTransfer: true,
  },
];

const defaultProps: WalletListProps = {
  activeIndex: 0,
  onWalletSelectionChange: onWalletSelectionChange,
  walletItems: walletItems,
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

  it('should handle onWalletSelectionChange callback when an element is pressed', () => {
    const first = wrapper.find('[onClick]').first();
    first.simulate('click');
    expect(onWalletSelectionChange).toHaveBeenCalled();
    expect(onWalletSelectionChange).toHaveBeenCalledTimes(1);
  });
});
