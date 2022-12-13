import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'web/src/lib/test';
import { OrdersTabScreen } from 'web/src/screens/OrdersTabScreen';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <OrdersTabScreen />
    </TestComponentWrapper>,
  );

describe('OrdersTabScreen test', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
