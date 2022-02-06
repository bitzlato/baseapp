import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { ForgotPasswordScreen } from '../ForgotPassword';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <ForgotPasswordScreen />
    </TestComponentWrapper>,
  );

describe('ForgotPasswordScreen', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
