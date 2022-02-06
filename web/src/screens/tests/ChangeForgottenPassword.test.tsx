import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { ChangeForgottenPasswordScreen } from '../ChangeForgottenPasswordScreen';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <ChangeForgottenPasswordScreen />
    </TestComponentWrapper>,
  );

describe('ChangeForgottenPasswordScreen test', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
