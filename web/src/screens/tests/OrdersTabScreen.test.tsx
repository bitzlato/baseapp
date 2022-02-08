import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { OrdersTabScreen } from '..';

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
