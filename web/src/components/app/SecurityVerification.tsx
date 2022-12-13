import { FC } from 'react';
import { useSelector } from 'react-redux';
import { SecurityVerificationModal } from 'web/src/containers/modals/SecurityVerificationModal';
import { selectUserNeedVerification } from 'web/src/modules/user/profile/selectors';

export const SecurityVerification: FC = () => {
  const needVerification = useSelector(selectUserNeedVerification);

  if (!needVerification) {
    return null;
  }

  return <SecurityVerificationModal />;
};
