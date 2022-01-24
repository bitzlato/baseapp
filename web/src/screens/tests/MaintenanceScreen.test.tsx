import { shallow } from 'enzyme';
import React from 'react';
import { TestComponentWrapper } from 'src/lib/test';
import { IntlProps } from '../../bootstrap';
import { MaintenanceScreen } from '../MaintenanceScreen';

const setup = (props: Partial<IntlProps> = {}) =>
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
