import { shallow } from 'enzyme';
import React from 'react';
import { TestComponentWrapper } from 'src/lib/test';
import { IntlProps } from 'src/types';
import { SignInScreen } from '../SignInScreen';

const setup = (props: Partial<IntlProps> = {}) =>
  shallow(
    <TestComponentWrapper>
      <SignInScreen />
    </TestComponentWrapper>,
  );

describe('SignInScreen', () => {
  it('should render', () => {
    const wrapper = setup().render();
    expect(wrapper).toMatchSnapshot();
  });
});
