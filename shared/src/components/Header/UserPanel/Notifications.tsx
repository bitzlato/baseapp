import { FC, useCallback, useContext } from 'react';
import { Notify } from 'shared/src/types';
import { Box } from 'shared/src/components/Box';
import { HeaderContext } from 'shared/src/components/Header/HeaderContext';
import { Icon } from 'shared/src/components/Icon';
import { Button } from 'shared/src/components/Button';
import { Dropdown, RenderMenuFn } from 'shared/src/components/Dropdown/Dropdown';
import * as s from './Notifications.css';

interface Props {
  notifications: Notify[];
  onAllRead?: (() => void) | undefined;
}

export const Notifications: FC<Props> = ({ notifications, onAllRead }) => {
  const { t } = useContext(HeaderContext);

  const renderButton = useCallback(() => {
    const hasUnreadNotify =
      notifications.length > 0 && notifications.some((notify) => !notify.read);

    return (
      <Box as="span" className={hasUnreadNotify ? s.unread : undefined}>
        <Icon name="notifications" />
      </Box>
    );
  }, [notifications]);

  const renderMenu: RenderMenuFn = useCallback(
    ({ closeMenu }) => (
      <>
        <Box m="4x">
          <Button color="secondary" fullWidth onClick={onAllRead}>
            {t('all_read')}
          </Button>
        </Box>
        <Box className={s.items}>
          {notifications.length > 0 ? (
            notifications.map((notify) => {
              const handleClick = () => {
                closeMenu();
                notify.onClick?.();
              };

              return (
                <Box
                  key={notify.id}
                  as="button"
                  color={notify.read ? 'dropdownItemText' : 'text'}
                  fontWeight={notify.read ? '400' : '600'}
                  cursor="pointer"
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  px="4x"
                  py="2x"
                  borderBottomWidth="2x"
                  borderBottomStyle="solid"
                  borderBottomColor="dropdownItemBorderBottom"
                  textDecoration={{
                    default: 'none',
                    hover: 'none',
                  }}
                  bg={{
                    default: 'dropdownItem',
                    hover: 'dropdownItemHover',
                  }}
                  width="full"
                  fontSize="small"
                  textAlign="left"
                  onClick={handleClick}
                >
                  <Box as="span" color="text">
                    {notify.date}
                  </Box>
                  <Box as="span">{notify.message}</Box>
                </Box>
              );
            })
          ) : (
            <Box m="4x" textAlign="center" color="text">
              {t('notifications_empty')}
            </Box>
          )}
        </Box>
      </>
    ),
    [notifications, onAllRead, t],
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
