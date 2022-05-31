import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getVerificationStep } from '../../../helpers';
import { selectLabelData } from '../../../modules/user/kyc/label';
import { ConfirmScreen } from '../../../screens/ConfirmScreen';
import { MobileModal } from '../../components/Modal';

const ConfirmMobileScreen: React.FC = () => {
  const intl = useIntl();
  const history = useHistory();
  const labels = useSelector(selectLabelData);
  const step = getVerificationStep(labels);

  if (step === 'phone') {
    return (
      <div className="cr-mobile-confirm">
        <div className="cr-mobile-confirm__phone">
          <MobileModal
            isOpen
            onClose={() => history.goBack()}
            title={intl.formatMessage({
              id: 'page.body.profile.header.account.profile.phone.unverified.title',
            })}
          >
            <ConfirmScreen />
          </MobileModal>
        </div>
      </div>
    );
  }

  return (
    <div className="cr-mobile-confirm">
      <div className="cr-mobile-confirm__identity">
        <ConfirmScreen />
      </div>
    </div>
  );
};

export { ConfirmMobileScreen };
