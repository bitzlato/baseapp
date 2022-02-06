import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { MaintenanceScreen } from '../MaintenanceScreen';

const setup = () =>
  shallow(
    <TestComponentWrapper>
      <MaintenanceScreen />
    </TestComponentWrapper>,
  );

describe('MaintenanceScreen', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
