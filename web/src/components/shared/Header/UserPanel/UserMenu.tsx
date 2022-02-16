import { FC, useCallback, useContext, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { DropdownItem } from 'web/src/components/shared/Header/Dropdown/DropdownItem';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import ToProfileIcon from 'web/src/assets/svg/ToProfileIcon.svg';
import { Dropdown, RenderMenuFn } from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { Links, User } from 'web/src/components/shared/sharedTypes';
import * as s from './UserMenu.css';

export interface Props {
  user: User;
  userLinks?: Links | undefined;
}

export const UserMenu: FC<Props> = ({ user, userLinks }) => {
  const { renderLinkComponent, t } = useContext(HeaderContext);

  const userDetails = useMemo(
    () => (
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
    ),
    [user],
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
    [renderLinkComponent, t, userDetails, userLinks],
  );

  const renderMenu: RenderMenuFn = useCallback(
    ({ closeMenu }) =>
      userLinks?.map((item) => (
        <DropdownItem closeMenu={closeMenu} renderLinkComponent={renderLinkComponent} {...item} />
      )),
    [renderLinkComponent, userLinks],
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
