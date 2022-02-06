import { shallow } from 'enzyme';
import { TestComponentWrapper } from 'src/lib/test';
import { CopyableTextField, CopyableTextFieldProps } from './';

const defaultProps: CopyableTextFieldProps = {
  value: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4dfE',
  fieldId: 'copy_id',
};

const setup = (props: Partial<CopyableTextFieldProps> = {}) =>
  shallow(
    <TestComponentWrapper>
      <CopyableTextField {...{ ...defaultProps, ...props }} />
    </TestComponentWrapper>,
  );

describe('CopyableTextField', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render 1 input tag', () => {
    const wrapper = setup().render();
    const input = wrapper.find('.custom-input');
    expect(input.length).toBe(1);
  });
});
