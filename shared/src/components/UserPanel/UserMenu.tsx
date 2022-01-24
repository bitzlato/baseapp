import { FC, useCallback, useContext } from 'react';
import { Links, User } from 'types';
import { Box } from 'components/Box';
import { DropdownItem } from 'components/Dropdown/DropdownItem';
import { HeaderContext } from 'components/HeaderContext';
import ToProfileIcon from 'assets/svg/ToProfileIcon.svg';
import * as s from './UserMenu.css';
import { Dropdown, RenderMenuFn } from 'components/Dropdown/Dropdown';

export interface Props {
  user: User;
  userLinks?: Links | undefined;
}

export const UserMenu: FC<Props> = ({ user, userLinks }) => {
  const { renderLinkComponent, t } = useContext(HeaderContext);

  const userDetails = (
    <>
      {user && user.userpic ? (
        <Box as="span" display="block" bg="interactive" borderRadius="circle" size="6x">
          <Box as="img" src={user.userpic} borderRadius="circle" size="6x" />
        </Box>
      ) : (
        <ToProfileIcon />
      )}
      {user.username && (
        <Box as="span" display={['none', 'block']} ml="2x">
          {user.username}
        </Box>
      )}
    </>
  );

  const renderButton = useCallback(
    () =>
      userLinks && userLinks.length > 0 ? (
        <Box as="span" className={s.user}>
          {userDetails}
        </Box>
      ) : (
        renderLinkComponent({
          className: s.user,
          children: userDetails,
          to: '/profile',
          title: t('profile'),
        })
      ),
    [userLinks],
  );

  const renderMenu: RenderMenuFn = useCallback(
    ({ closeMenu }) =>
      userLinks?.map((item) => (
        <DropdownItem closeMenu={closeMenu} renderLinkComponent={renderLinkComponent} {...item} />
      )),
    [userLinks],
  );

  return userLinks && userLinks.length > 0 ? (
    <Dropdown
      dropdownAlign="right"
      renderButton={renderButton}
      renderMenu={renderMenu}
      height="full"
    />
  ) : (
    <>{renderButton()}</>
  );
};
