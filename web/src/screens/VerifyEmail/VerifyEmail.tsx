import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserDataError } from 'src/modules/user/profile/selectors';
import { userFetch } from 'src/modules/user/profile/actions';
import { Button } from 'src/components/Button/Button';
import { Card } from 'src/components/Card/Card';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import s from 'src/containers/QuickExchange/QuickExchange.postcss';

export const VerifyEmailModal: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();
  const userError = useSelector(selectUserDataError);
  const email = userError?.payload?.email ?? '';

  return (
    <Card className={s.quickExchange} header={<h4>{t('verify.email.header')}</h4>}>
      <Box as="p" textSize="lg">
        {t('verify.email.content', { email })}
      </Box>
      <Button size="large" variant="primary" onClick={() => dispatch(userFetch())}>
        OK
      </Button>
    </Card>
  );
};
