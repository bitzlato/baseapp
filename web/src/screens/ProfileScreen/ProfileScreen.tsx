import { FC } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { Card } from 'web/src/components/Card/Card';
import { useDocumentTitle } from 'web/src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { ProfileApiKeys, ProfileVerification } from '../../containers';
import { ProfileAccountActivity } from '../../containers/ProfileAccountActivity';
import { ProfileAuthDetails } from '../../containers/ProfileAuthDetails';
import { ReferralProgram } from '../../containers/ReferralProgram';

import s from './ProfileScreen.postcss';

export const ProfileScreen: FC = () => {
  const t = useT();
  const title = t('page.body.profile.header.account');

  useDocumentTitle(title);

  return (
    <div className={s.container}>
      <Card size="xlg" header={<h4>{title}</h4>}>
        <div className="row">
          <div className="col-12 col-md-6 mx-0">
            <Box col>
              <ProfileAuthDetails />
              <ReferralProgram />
            </Box>
          </div>
          <div className="col-12 col-md-6">
            <ProfileVerification />
          </div>
        </div>
      </Card>
      <ProfileApiKeys />
      <ProfileAccountActivity />
    </div>
  );
};
