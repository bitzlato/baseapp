import { shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { defaultWallet } from 'src/modules/user/wallets/defaults';
import { rootReducer } from '../../modules';
import { CopyableTextField } from '../CopyableTextField';
import { DepositCrypto } from './';

const store = createStore(rootReducer);

describe('DepositCrypto', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <DepositCrypto wallet={defaultWallet} />,
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
