import { Money, Currency } from '@trzmaxim/money';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { defaultCurrency } from 'src/modules/public/currencies/defaults';
import { rootReducer, Wallet } from '../../modules';
import { CopyableTextField } from '../CopyableTextField';
import { DepositCrypto } from './';

const store = createStore(rootReducer);

describe('DepositCrypto', () => {
  let wrapper: any;
  const handleOnCopy = jest.fn();
  const handleGenerateAddress = jest.fn();
  const currency: Currency = {
    code: 'ETH',
    minorUnit: 8,
  };
  const wallet: Wallet = {
    currency,
    icon_id: 'eth',
    name: '',
    fixed: 0,
    type: 'coin',
    fee: Money.fromDecimal(0, currency),
  };

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <DepositCrypto
          dimensions={118}
          error={'error123'}
          handleGenerateAddress={handleGenerateAddress}
          handleOnCopy={handleOnCopy}
          wallet={wallet}
          disabled={false}
          currency={defaultCurrency}
        />
        ,
      </Provider>,
    );
  });

  it('should contains QRCode', () => {
    expect(wrapper.find('.qr-code-wrapper')).toBeTruthy();
  });

  it('should contains CopyableTextField', () => {
    expect(wrapper.find(CopyableTextField)).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
