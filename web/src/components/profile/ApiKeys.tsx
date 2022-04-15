import { FC, useState } from 'react';
import { Stack } from 'web/src/components/ui/Stack';
import { Container } from 'web/src/components/Container/Container';
import { Card } from 'web/src/components/Card/Card';
import { Tab, TabList, Tabs } from 'web/src/components/Tabs';
import { useT } from 'web/src/hooks/useT';
import { ProfileApiKeys } from 'web/src/containers/ProfileApiKeys';
import { P2PApiKeys } from './apiKeys/P2PApiKeys';

const API_KEYS_TAB_EXCHANGE = 'exchange';
const API_KEYS_TAB_P2P = 'p2p';

export const ApiKeys: FC = () => {
  const t = useT();
  const [tab, setTab] = useState(API_KEYS_TAB_EXCHANGE);

  return (
    <Container maxWidth="xl" my="4">
      <Card
        header={
          <Stack marginRight="4x" alignItems="center">
            <Tabs value={tab} onSelectionChange={setTab}>
              <TabList>
                <Tab size="small" value={API_KEYS_TAB_EXCHANGE}>
                  {t('Exchange API Keys')}
                </Tab>
                <Tab size="small" value={API_KEYS_TAB_P2P}>
                  {t('P2P API Keys')}
                </Tab>
              </TabList>
            </Tabs>
          </Stack>
        }
      >
        {tab === API_KEYS_TAB_EXCHANGE ? <ProfileApiKeys /> : <P2PApiKeys />}
      </Card>
    </Container>
  );
};
