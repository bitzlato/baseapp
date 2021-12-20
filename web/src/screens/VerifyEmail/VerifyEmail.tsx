import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserDataError } from 'src/modules/user/profile/selectors';
import { Button } from 'src/components/Button/Button';
import { Card } from 'src/components/Card/Card';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import { loginWithRedirect } from 'src/helpers/auth0';
import s from 'src/containers/QuickExchange/QuickExchange.postcss';

export const VerifyEmailModal: React.FC = () => {
  const t = useT();
  const userError = useSelector(selectUserDataError);
  const email = userError?.payload?.email ?? '';

  return (
    <Card className={s.quickExchange} header={<h4>{t('verify.email.header')}</h4>}>
      <Box as="p" textSize="lg">
        {t('verify.email.content', { email })}
      </Box>
      <Button size="large" variant="primary" onClick={() => loginWithRedirect()}>
        OK
      </Button>
    </Card>
  );
};
