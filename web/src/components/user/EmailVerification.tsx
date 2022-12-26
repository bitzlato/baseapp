import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { ROUTES_NEED_USER_ACTIVATED } from 'web/src/app/routes';
import { selectVerifyEmail } from 'web/src/modules/user/profile/selectors';
import { EmailVerificationModal } from 'web/src/components/user/EmailVerificationModal';

export const EmailVerification: FC = () => {
  const isNeedUserActivated = useRouteMatch(ROUTES_NEED_USER_ACTIVATED);
  const verifyEmail = useSelector(selectVerifyEmail);

  if (!verifyEmail || isNeedUserActivated) {
    return null;
  }

  return <EmailVerificationModal />;
};
