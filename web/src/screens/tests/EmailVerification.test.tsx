import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { EmailVerificationScreen } from '../EmailVerification';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <EmailVerificationScreen />
    </TestComponentWrapper>,
  );

describe('EmailVerificationScreen', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
