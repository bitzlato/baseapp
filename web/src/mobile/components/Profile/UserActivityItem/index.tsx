import * as React from 'react';
import { Box } from 'src/components/Box';
import { Text } from 'web/src/components/ui/Text';
import { UserActivityDataInterface } from 'src/modules';
import { useT } from 'src/hooks/useT';
import { getUserAgent, localeDate } from '../../../../helpers';

interface Props {
  item: UserActivityDataInterface;
}

const UserActivityItemComponent: React.FC<Props> = ({ item }) => {
  const t = useT();

  const getResultOfUserAction = (value: string) => {
    switch (value) {
      case 'login':
        return t('page.body.profile.content.action.login');
      case 'logout':
        return t('page.body.profile.content.action.logout');
      case 'request QR code for 2FA':
        return t('page.body.profile.content.action.request2fa');
      case 'enable 2FA':
        return t('page.body.profile.content.action.enable2fa');
      case 'login::2fa':
        return t('page.body.profile.content.action.login.2fa');
      case 'request password reset':
        return t('page.body.profile.content.action.requestPasswordReset');
      case 'password reset':
        return t('page.body.profile.content.action.passwordReset');
      default:
        return value;
    }
  };

  const userAgent = getUserAgent(item.user_agent);
  const resultOfUserAction = getResultOfUserAction(item.action);
  const [itemDate, itemTime] = localeDate(item.created_at, 'fullDate').split(' ');
  const { result } = item;

  return (
    <Box col spacing className="pg-mobile-profile-account-activity-screen__item">
      <Box row spacing="2" justify="between">
        <Text>{userAgent}</Text>
        <Text>{itemDate}</Text>
        <Text color="secondary">{itemTime}</Text>
      </Box>
      <Box row spacing="2" justify="between">
        <Box col>
          <Text color="secondary">{t('page.mobile.profile.accountActivity.action')}</Text>
          <Text>{resultOfUserAction}</Text>
        </Box>
        <Box col>
          <Text color="secondary">{t('page.mobile.profile.accountActivity.ip')}</Text>
          <Text>{item.user_ip}</Text>
        </Box>
        <Box col>
          <Text color="secondary">{t('page.mobile.profile.accountActivity.result')}</Text>
          <Text
            color={
              result === 'succeed'
                ? 'success'
                : result === 'failed' || result === 'denied'
                ? 'danger'
                : undefined
            }
          >
            {result}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export const UserActivityItem = React.memo(UserActivityItemComponent);
