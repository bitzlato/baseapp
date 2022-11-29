import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { useT } from 'web/src/hooks/useT';
import { Container } from 'web/src/components/ui/Container';
import { Card } from 'web/src/components/Card/Card';
import { useAppContext } from 'web/src/components/app/AppContext';
import { MergeWithTelegramControls } from './MergeWithTelegramControls';

export const MergeWithTelegram: FC = () => {
  const t = useT();
  const { user, isMobileDevice } = useAppContext();

  if (!user) {
    return null;
  }

  let body;
  if (user.bitzlato_user?.user_profile.merged && user.bitzlato_user?.user_profile.telegram) {
    const {
      username,
      first_name: firstName,
      last_name: lastName,
    } = JSON.parse(user.bitzlato_user.user_profile.telegram) as {
      id: string;
      username?: string | undefined;
      first_name?: string | undefined;
      last_name?: string | undefined;
    };
    let name;
    if (username) {
      name = `(@${username})`;
    } else if (firstName || lastName) {
      name = `(${firstName ? `${firstName} ` : ''}${lastName})`;
    }
    body = (
      <Box color="text" py="7x" fontSize="medium" textAlign="center">
        {t('merge.merged', { username: name })}
      </Box>
    );
  } else {
    body = <MergeWithTelegramControls />;
  }

  return isMobileDevice ? (
    <Box my="4x">{body}</Box>
  ) : (
    <Container maxWidth="xl" my="6x">
      <Card header={<h4>{t('merge.title')}</h4>}>{body}</Card>
    </Container>
  );
};
