import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { ConfirmScreen } from '../ConfirmScreen';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <ConfirmScreen />
    </TestComponentWrapper>,
  );

describe('ConfirmScreen test', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
