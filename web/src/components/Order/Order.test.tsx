import { Button } from 'react-bootstrap';
import { mount } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test/wrapper';
import { DEFAULT_ORDER_TYPES } from 'src/helpers/order';
import { Order, OrderComponentProps } from '.';

// tslint:disable:no-magic-numbers

const defaultProps: OrderComponentProps = {
  onSubmit: jest.fn(),
  priceMarketBuy: 5,
  priceMarketSell: 10,
  currentMarketAskPrecision: 4,
  currentMarketBidPrecision: 5,
  availableBase: 200,
  availableQuote: 12,
  from: 'btc',
  to: 'eth',
  asks: [['10', '1']],
  bids: [['10', '1']],
  translate: jest.fn(),
  orderTypes: DEFAULT_ORDER_TYPES,
  minAmount: '0',
};

describe('Order', () => {
  it('button should be disabled', () => {
    // tslint:disable: no-shadowed-variable
    const wrapper = mount(
      <TestComponentWrapper>
        <Order {...{ ...defaultProps }} />
      </TestComponentWrapper>,
    );
    wrapper.find(Button).at(0).simulate('click');
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(0);
    wrapper.unmount();
  });
});
