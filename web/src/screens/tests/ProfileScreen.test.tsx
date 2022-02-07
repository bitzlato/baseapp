import { render } from '@testing-library/react';
import { TestComponentWrapper } from 'web/src/lib/test';
import { ProfileScreen } from 'web/src/screens/ProfileScreen/ProfileScreen';

describe('ProfileScreen test', () => {
  it('should render', () => {
    const { asFragment } = render(
      <TestComponentWrapper>
        <ProfileScreen />
      </TestComponentWrapper>,
    );

    expect(asFragment().children[0]).toMatchSnapshot();
  });
});
