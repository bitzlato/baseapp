import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Adapter } from 'web/src/components/shared/Adapter';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { Container } from 'web/src/components/ui/Container';
import { Box } from 'web/src/components/ui/Box';
import { Card } from 'web/src/components/ui/Card';
import { Text } from 'web/src/components/ui/Text';
import { useDocumentTitle } from 'src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { GiftsNavigation } from 'web/src/components/Gifts/GiftsNavigation';
import { Tab, TabList, Tabs } from 'web/src/components/Tabs';
import { GiftsReceived } from 'web/src/components/Gifts/GiftsReceived';
import { GiftsSent } from 'web/src/components/Gifts/GiftsSent';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import * as s from './HistoryGiftsScreen.css';

export const HistoryGiftsScreen: FC = () => {
  useDocumentTitle('Gifts history');
  const t = useT();
  const history = useHistory();
  const isMobileDevice = useIsMobileDevice();
  const [tab, setTab] = useState<'sent' | 'received'>('sent');

  return (
    <Adapter Link={Link} history={history}>
      <Container maxWidth="xl" my="6x">
        {isMobileDevice ? null : (
          <Box px="4x">
            <Breadcrumbs>
              <BreadcrumbsItem>{t('Gifts')}</BreadcrumbsItem>
              <BreadcrumbsItem>{t('gifts.giftsHistory')}</BreadcrumbsItem>
            </Breadcrumbs>
          </Box>
        )}

        <Box px={{ mobile: '0', tablet: '4x' }}>
          <Card
            display="flex"
            flexDirection="column"
            pt="6x"
            pb="9x"
            px={{ tablet: '6x', desktop: '15x' }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={{ mobile: '5x', tablet: '0' }}
            >
              <Text variant="h4">{t('gifts.giftsHistory')}</Text>
              <Box display={{ mobile: 'none', tablet: 'block' }}>
                <GiftsNavigation />
              </Box>
            </Box>

            <Box
              className={s.notice}
              as={Text}
              variant="body"
              color="textMuted"
              mt={{ mobile: '3x', tablet: '2x', desktop: '1x' }}
              px={{ mobile: '5x', tablet: '0' }}
            >
              {t('gifts.giftsHistory.notice')}
            </Box>

            <Box
              pt={{ mobile: '5x', tablet: '15x', desktop: '25x' }}
              pb="7x"
              px={{ mobile: '4x', tablet: '0' }}
            >
              {isMobileDevice ? (
                <VariantSwitcher
                  target="form"
                  variants={[
                    { label: t('gifts.sent'), value: 'sent' },
                    { label: t('gifts.received'), value: 'received' },
                  ]}
                  value={tab}
                  onChange={(v) => setTab(v as 'sent' | 'received')}
                />
              ) : (
                <Tabs value={tab} onSelectionChange={(v) => setTab(v as 'sent' | 'received')}>
                  <TabList>
                    <Tab size="large" value="sent">
                      <Box className={s.tabText}>{t('gifts.sent')}</Box>
                    </Tab>
                    <Tab size="large" value="received">
                      <Box className={s.tabText}>{t('gifts.received')}</Box>
                    </Tab>
                  </TabList>
                </Tabs>
              )}

              {tab === 'received' && <GiftsReceived />}
              {tab === 'sent' && <GiftsSent />}
            </Box>
          </Card>
        </Box>
      </Container>
    </Adapter>
  );
};
