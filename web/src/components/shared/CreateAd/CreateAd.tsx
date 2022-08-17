import { Box } from 'web/src/components/ui/Box';
import { Container } from 'web/src/components/ui/Container';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { Card, CardHeader } from 'web/src/components/ui/Card';
import { CreateAdForm } from './CreateAdForm';
import { Rules } from './Rules';
import { Limits } from './Limits';
import { RulesAndLimitsMobile } from './RulesAndLimitsMobile';
import * as s from './CreateAd.css';

export const CreateAd = () => {
  const { t } = useAdapterContext();

  return (
    <Container maxWidth="fullhd">
      <Box display={{ mobile: 'none', tablet: 'block' }} px="8x">
        <Breadcrumbs>
          <BreadcrumbsItem to="/p2p/adverts">{t('My adverts')}</BreadcrumbsItem>
          <BreadcrumbsItem>{t('Create advert')}</BreadcrumbsItem>
        </Breadcrumbs>
      </Box>

      <Box className={s.rulesMobile}>
        <RulesAndLimitsMobile />
      </Box>

      <Box
        px={{ mobile: '0', tablet: '8x' }}
        pb={{ mobile: '4x', tablet: '8x' }}
        display="flex"
        alignItems="flex-start"
        gap="4x"
      >
        <Card className={s.form} pb="5x">
          <Box bg="block" borderRadius="1.5x">
            <Box display={{ mobile: 'none', tablet: 'block' }}>
              <CardHeader>{t('Create advert')}</CardHeader>
            </Box>
            <CreateAdForm />
          </Box>
        </Card>

        <Box className={s.rules} flexDirection="column" gap="4x">
          <Card>
            <CardHeader>{t('createAd.rules')}</CardHeader>
            <Box py="4x" pb="3x" px="6x">
              <Rules />
            </Box>
          </Card>

          <Card pb="5x">
            <CardHeader>{t('createAd.limits')}</CardHeader>
            <Box py="4x" pb="3x" px="6x">
              <Limits />
            </Box>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};
