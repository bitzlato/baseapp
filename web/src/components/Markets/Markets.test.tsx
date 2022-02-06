import { shallow, ShallowWrapper } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { Markets, MarketsProps } from '.';

const data = [
  ['ETH/BTC', '0.223100', '+50.00%'],
  ['ETH/LTC', '0.223100', '+25.00%'],
  ['LTC/BTC', '0.223100', '-5.00%'],
];
const onSelect = jest.fn();

const defaultProps: MarketsProps = {
  data,
  onSelect,
};

const setup = (props?: Partial<MarketsProps>) =>
  shallow(
    <TestComponentWrapper>
      <Markets {...{ ...defaultProps, ...props }} />
    </TestComponentWrapper>,
  );

describe('Markets', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('should render', () => {
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should render empty data', () => {
    wrapper = setup({ data: [] });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should set selected market in props', () => {
    const keyIndex = 0;
    const selectedKey = 'ETH/LTC';

    const component = setup({
      data,
      rowKeyIndex: keyIndex,
      selectedKey,
      onSelect,
    }).render();

    const selectedRow = component.find('.cr-table__row--selected').first().get(0)?.tagName;
    expect(selectedRow).toBe('tr');
  });
});
