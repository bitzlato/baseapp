import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectVerifyEmail } from 'web/src/modules/user/profile/selectors';
import { EmailVerificationModal } from 'web/src/screens/EmailVerification/EmailVerificationModal';

export const EmailVerification: FC = () => {
  const verifyEmail = useSelector(selectVerifyEmail);

  if (!verifyEmail) {
    return null;
  }

  return <EmailVerificationModal />;
};
