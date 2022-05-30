import { useCallback, useContext, useMemo } from 'react';
import { Box, BoxProps } from 'web/src/components/ui/Box';
import {
  DropdownItem,
  DropdownItemType,
} from 'web/src/components/shared/Header/Dropdown/DropdownItem';
import { getUserContext, HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import { USER_STATUS_AUTHORIZED } from 'web/src/components/shared/sharedConstants';
import {
  Dropdown,
  RenderButtonFn,
  RenderMenuFn,
} from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { ThemeSwitcher } from 'web/src/components/shared/Header/ThemeSwitcher';
import { UserLink } from 'web/src/components/shared/sharedTypes';
import ProfileIcon from 'web/src/assets/svg/ProfileIcon.svg';

type DropdownItemWithKey = { key: string } & DropdownItemType;

interface Props {
  px?: BoxProps['px'];
}

export const UserMenu = ({ px }: Props) => {
  const context = useContext(HeaderContext);
  const userContext = getUserContext(context);
  const { renderLinkComponent, t } = context;

  const formatUserLink = useCallback(
    (link: UserLink): DropdownItemWithKey => {
      if ('to' in link) {
        return { renderLinkComponent, ...link };
      }

      return link;
    },
    [renderLinkComponent],
  );

  const links = useMemo(() => {
    let resultLinks: Array<DropdownItemWithKey> = [
      {
        key: 'theme-switcher',
        type: 'custom',
        children: <ThemeSwitcher />,
      },
    ];

    if (userContext.status === USER_STATUS_AUTHORIZED) {
      if (userContext.profileLink) {
        resultLinks = [formatUserLink(userContext.profileLink), ...resultLinks];
      }

      if (userContext.userLinks) {
        const formatted = userContext.userLinks.map(formatUserLink);

        resultLinks = resultLinks.concat(formatted);
      }

      resultLinks.push({
        type: 'button',
        key: 'logout',
        icon: 'logout',
        children: t('logout'),
        onClick: userContext.onLogoutClick,
      });
    }

    return resultLinks;
  }, [t, userContext, formatUserLink]);

  const renderButton: RenderButtonFn = useCallback(
    ({ onClick }) => (
      <Box
        as="button"
        type="button"
        display="flex"
        height="full"
        alignItems="center"
        color={{ default: 'headerIcon', hover: 'headerIconHover' }}
        textDecoration="none"
        px={px}
        onClick={onClick}
      >
        <ProfileIcon />
      </Box>
    ),
    [px],
  );

  const renderMenu: RenderMenuFn = useCallback(
    ({ closeMenu }) =>
      links?.map((item) => <DropdownItem closeMenu={closeMenu} {...item} key={item.key} />),
    [links],
  );

  return (
    <Dropdown
      dropdownAlign="right"
      renderButton={renderButton}
      renderMenu={renderMenu}
      height="full"
    />
  );
};
