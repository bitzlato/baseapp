import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { useT } from 'web/src/hooks/useT';
import { selectMobileDeviceState } from 'web/src/modules/public/globalSettings/selectors';
import { Subheader } from 'web/src/mobile/components/Subheader';
import { Container } from 'web/src/components/Container/Container';
import { useHistory } from 'react-router';
import { Card } from 'web/src/components/Card/Card';
import TelegramIcon from 'web/src/assets/svg/TelegramIcon.svg';
import WebIcon from 'web/src/assets/svg/WebIcon.svg';
import * as s from './MergeWithTelegram.css';
import { MergeDirection } from './MergeWithTelegramWizard';
import { MergeWithTelegramWizardModal } from './MergeWithTelegramWizardModal';

export const MergeWithTelegram: FC = () => {
  const t = useT();
  const history = useHistory();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const [state, setState] = useState<{ started: boolean; direction: MergeDirection | undefined }>({
    started: false,
    direction: undefined,
  });

  const handleClose = () => setState((prev) => ({ ...prev, started: false }));
  const handleClickWeb = () => setState({ started: true, direction: 'web' });
  const handleClickTelegram = () => setState({ started: true, direction: 'telegram' });

  const body = (
    <div className={s.row}>
      <div className={s.column}>
        <Box
          bg="statBg"
          borderRadius="1x"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="4x"
          py="7x"
        >
          <Box flexShrink={0} color="text" mr="4x">
            <WebIcon width="60px" height="60px" />
          </Box>
          <Text variant="label">{t('merge.web_with_telegram')}</Text>
          <Box flexShrink={0} ml="4x">
            <Button color="secondary" onClick={handleClickWeb}>
              {t('merge.web_get_code')}
            </Button>
          </Box>
        </Box>
      </div>
      <div className={s.column}>
        <Box
          bg="statBg"
          borderRadius="1x"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="4x"
          py="7x"
        >
          <Box flexShrink={0} color="text" mr="4x">
            <TelegramIcon width="60px" height="60px" />
          </Box>
          <Text variant="label">{t('merge.telegram_with_web')}</Text>
          <Box flexShrink={0} ml="4x">
            <Button color="secondary" onClick={handleClickTelegram}>
              {t('merge.web_enter_code')}
            </Button>
          </Box>
        </Box>
      </div>
      <MergeWithTelegramWizardModal
        direction={state.direction}
        started={state.started}
        onClose={handleClose}
      />
    </div>
  );

  return isMobileDevice ? (
    <Box my="1x">
      <Subheader
        title={t('Settings')}
        backTitle={t('page.body.profile.header.account')}
        onGoBack={() => history.push('/profile')}
      />
      {body}
    </Box>
  ) : (
    <Container maxWidth="xl" my="4">
      <Card header={<h4>{t('merge.title')}</h4>}>{body}</Card>
    </Container>
  );
};
