import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { RestrictedScreen } from '../RestrictedScreen';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <RestrictedScreen />
    </TestComponentWrapper>,
  );

describe('RestrictedScreen', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
