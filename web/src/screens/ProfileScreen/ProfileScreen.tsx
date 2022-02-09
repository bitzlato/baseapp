import { FC } from 'react';
import { Box } from 'web/src/components/Box/Box';
import { Card } from 'web/src/components/Card/Card';
import { Container } from 'web/src/components/Container/Container';
import { useDocumentTitle } from 'web/src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { ProfileApiKeys, ProfileVerification } from 'web/src/containers';
import { ProfileAccountActivity } from 'web/src/containers/ProfileAccountActivity';
import { ProfileAuthDetails } from 'web/src/containers/ProfileAuthDetails';
import { ReferralProgram } from 'web/src/containers/ReferralProgram';

export const ProfileScreen: FC = () => {
  const t = useT();
  const title = t('page.body.profile.header.account');

  useDocumentTitle(title);

  return (
    <Box my="7">
      <Container maxWidth="xl">
        <Card header={<h4>{title}</h4>}>
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
      </Container>
      <ProfileApiKeys />
      <ProfileAccountActivity />
    </Box>
  );
};
