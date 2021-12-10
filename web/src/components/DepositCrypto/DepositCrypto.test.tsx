import { shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { defaultCurrency } from 'src/modules/public/currencies/defaults';
import { defaultWallet } from 'src/modules/user/wallets/defaults';
import { rootReducer } from '../../modules';
import { CopyableTextField } from '../CopyableTextField';
import { DepositCrypto } from './';

const store = createStore(rootReducer);

describe('DepositCrypto', () => {
  let wrapper: any;
  const handleOnCopy = jest.fn();
  const handleGenerateAddress = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <DepositCrypto
          dimensions={118}
          error={'error123'}
          handleGenerateAddress={handleGenerateAddress}
          handleOnCopy={handleOnCopy}
          wallet={defaultWallet}
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
