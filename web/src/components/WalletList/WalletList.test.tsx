import { mount, shallow } from 'enzyme';
import { BTC_CCY, createCcy, createMoney, USD_CCY } from 'src/helpers/money';
import { TestComponentWrapper } from 'src/lib/test/wrapper';
import { WalletList, WalletListProps } from '..';
import { WalletItemData } from '../WalletItem/WalletItem';

const onWalletSelectionChange = jest.fn();

const ETH_CCY = createCcy('ETH', 8);

const walletItems: WalletItemData[] = [
  {
    name: 'Bitcoin',
    currency: 'BTC',
    balanceTotal: createMoney('1', BTC_CCY),
    balanceP2P: createMoney('0.5', BTC_CCY),
    balanceMarket: createMoney('0.5', BTC_CCY),
    approximate: createMoney('41000', USD_CCY),
    locked: createMoney('1', BTC_CCY),
    hasDepositWithdraw: true,
    hasTransfer: true,
    hasGift: true,
    index: 0,
  },
  {
    name: 'Ethereum',
    currency: 'ETH',
    balanceTotal: createMoney('1', ETH_CCY),
    balanceP2P: createMoney('0.5', ETH_CCY),
    balanceMarket: createMoney('0.5', ETH_CCY),
    approximate: createMoney('41000', USD_CCY),
    locked: createMoney('1', ETH_CCY),
    hasDepositWithdraw: true,
    hasTransfer: true,
    hasGift: true,
    index: 1,
  },
];

const defaultProps: WalletListProps = {
  activeIndex: 0,
  onWalletSelectionChange,
  walletItems,
};

const setup = (props: Partial<WalletListProps> = {}) =>
  shallow(
    <TestComponentWrapper>
      <WalletList {...{ ...defaultProps, ...props }} />
    </TestComponentWrapper>,
  );

const setup2 = (props: Partial<WalletListProps> = {}) =>
  mount(
    <TestComponentWrapper>
      <WalletList {...{ ...defaultProps, ...props }} />
    </TestComponentWrapper>,
  );

describe('WalletList', () => {
  it('should render', () => {
    expect(setup().render()).toMatchSnapshot();
  });

  it('should handle onWalletSelectionChange callback when an element is pressed', () => {
    const wrapper = setup2();
    const first = wrapper.find('button').first();
    first.simulate('click');
    expect(onWalletSelectionChange).toHaveBeenCalled();
    expect(onWalletSelectionChange).toHaveBeenCalledTimes(1);
  });
});
