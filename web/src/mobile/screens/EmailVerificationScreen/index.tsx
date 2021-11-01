import * as React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { EmailVerificationScreen } from '../../../screens/EmailVerification';
import { MobileModal } from '../../components';

export const EmailVerificationMobileScreen: React.FC = () => {
  const history = useHistory();
  const intl = useIntl();

  return (
    <div className="cr-mobile-email-verification">
      <MobileModal
        isOpen={true}
        onClose={() => history.push('/trading')}
        title={intl.formatMessage({ id: 'page.header.signUp.modal.header' })}
      >
        <EmailVerificationScreen />
      </MobileModal>
    </div>
  );
};
