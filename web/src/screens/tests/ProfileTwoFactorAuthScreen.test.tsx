import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { ProfileTwoFactorAuthScreen } from '../';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <ProfileTwoFactorAuthScreen />
    </TestComponentWrapper>,
  );

describe('ProfileTwoFactorAuthScreen test', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
