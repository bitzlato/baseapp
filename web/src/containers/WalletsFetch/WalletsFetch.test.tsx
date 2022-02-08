import { shallow } from 'enzyme';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../modules';
import { WalletsFetch } from '.';

const store = createStore(rootReducer);
const Wallets = connect()(WalletsFetch);

const setup = () =>
  shallow(
    <Provider store={store}>
      <Wallets />
    </Provider>,
  );

describe('WalletsFetch component', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = setup();
  });
  it('should render', () => {
    expect(wrapper).toBeDefined();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
