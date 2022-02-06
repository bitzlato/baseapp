import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { SignUpScreen } from '../SignUpScreen';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <SignUpScreen />
    </TestComponentWrapper>,
  );

describe('SignUpScreen', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
