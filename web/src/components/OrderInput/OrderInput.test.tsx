import { shallow } from 'enzyme';
import { OrderInput, OrderInputProps } from '.';

const defaultProps: OrderInputProps = {
  currency: 'eth',
  handleChangeValue: () => undefined,
  handleFocusInput: () => undefined,
  value: '',
  onKeyPress: jest.fn(),
};

const setup = (props: Partial<OrderInputProps> = {}) =>
  shallow(<OrderInput {...{ ...defaultProps, ...props }} />);

describe('InputBlock', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct className', () => {
    const wrapper = setup();
    expect(wrapper.hasClass('cr-order-input')).toBeTruthy();
  });

  it('should pass along supplied className', () => {
    const className = 'some-class';
    const wrapper = setup({ className });
    expect(wrapper.hasClass(className)).toBeTruthy();
  });
});
