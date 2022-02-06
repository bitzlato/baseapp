import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { HistoryScreen } from '../History';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <HistoryScreen />
    </TestComponentWrapper>,
  );

describe('HistoryScreen', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
