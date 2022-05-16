import React, { FC, useCallback, useContext } from 'react';
import { Notify } from 'web/src/components/shared/sharedTypes';
import { Box } from 'web/src/components/ui/Box';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import { RenderMenuFn } from 'web/src/components/shared/Header/Dropdown/Dropdown';
import NotificationsIcon from 'web/src/assets/svg/NotificationsIcon.svg';
import ReadAllIcon from 'web/src/assets/svg/ReadAllIcon.svg';
import OutlinedCrossIcon from 'web/src/assets/svg/OutlinedCrossIcon.svg';
import { sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './Notifications.css';
import Drawer from '../Drawer/Drawer';

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
        <NotificationsIcon />
      </Box>
    );
  }, [notifications]);

  const renderMenu: RenderMenuFn = useCallback(
    ({ closeMenu }) => (
      <Box className={s.items}>
        {notifications.length > 0 ? (
          <>
            <Box mt="4x" display="flex" justifyContent="space-between">
              <Box as="span" color="text">
                {t('notificationsTitle')}
              </Box>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Box as="button" mx="1x" onClick={onAllRead}>
                  <ReadAllIcon
                    className={sprinkles({
                      color: { default: 'btnDrawer', hover: 'btnDrawerHover' },
                      alignSelf: 'center',
                    })}
                  />
                </Box>

                <Box as="button" mx="1x" color="text" onClick={closeMenu}>
                  <OutlinedCrossIcon
                    className={sprinkles({
                      color: { default: 'btnDrawer', hover: 'btnDrawerHover' },
                      alignSelf: 'center',
                    })}
                  />
                </Box>
              </Box>
            </Box>

            <Box borderStyle="solid" borderWidth="1x" width="full" my="2x" bg="drawerItemDivider" />

            {notifications.map((notify, index) => {
              const handleClick = (event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();

                closeMenu();
                notify.onClick?.();
              };

              const showDate = () => {
                if (index > 0 && notifications[index - 1]!.date === notify.date) {
                  return false;
                }

                return true;
              };

              return (
                <React.Fragment key={notify.id}>
                  {showDate() && (
                    <Box mt="8x" mb="2x">
                      <Box as="span" color="text">
                        {notify.date}
                      </Box>
                    </Box>
                  )}

                  <Box
                    as="button"
                    color={notify.read ? 'dropdownItemText' : 'text'}
                    cursor="pointer"
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    px="4x"
                    py="2x"
                    my="4x"
                    textDecoration={{
                      default: 'none',
                      hover: 'none',
                    }}
                    bg={{
                      default: 'drawerItem',
                      hover: 'dropdownItemHover',
                    }}
                    width="full"
                    fontSize="small"
                    textAlign="left"
                    wordBreak="break-word"
                    onClick={handleClick}
                    borderRadius="2x"
                  >
                    <Box
                      display="flex"
                      width="full"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        as="span"
                        color={notify.read ? 'notificationRead' : 'notificationUnread'}
                      >
                        {notify.read ? t('notificationRead') : t('notificationUnread')}
                      </Box>
                      <Box as="span" color="notificationTime">
                        {notify.time}
                      </Box>
                    </Box>

                    <Box
                      borderStyle="solid"
                      borderWidth="1x"
                      width="full"
                      my="2x"
                      bg="drawerItemDivider"
                    />

                    <Box as="span" color="text">
                      {notify.message}
                    </Box>
                  </Box>
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <Box m="4x" textAlign="center" color="text">
            {t('notifications_empty')}
          </Box>
        )}
      </Box>
    ),
    [notifications, onAllRead, t],
  );

  return <Drawer renderButton={renderButton} renderMenu={renderMenu} />;
};
