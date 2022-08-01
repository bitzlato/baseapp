import { FC } from 'react';
import { Container } from 'web/src/components/ui/Container';
import { Card } from 'web/src/components/ui/Card';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { Breadcrumbs, BreadcrumbsItem } from 'web/src/components/ui/Breadcrumbs';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useCurrenUserAd } from 'web/src/hooks/data/useUserAds';
import { Spinner } from 'web/src/components/ui/Spinner';
import { UserAdEditContextProvider } from './UserAdEditContext';
import { UserAdEditForm } from './UserAdEditForm';
import { UserAdUnactiveAlert } from './UserAdUnactiveAlert';
import { UserAdDeletingButton } from './UserAdDeletingButton';
import * as s from './UserAd.css';

export const UserAd: FC = () => {
  const {
    t,
    Link,
    params: { advertId },
  } = useAdapterContext<{ advertId: string }>();
  const { lang, isMobileDevice } = useAppContext();
  const { data: ad, error, mutate: mutateAd } = useCurrenUserAd({ advertId, lang });

  const breadcrumbs = isMobileDevice ? null : (
    <Box px="2x">
      <Breadcrumbs>
        <BreadcrumbsItem to={`/${lang}/p2p`}>{t('Market')}</BreadcrumbsItem>
        <BreadcrumbsItem to={`/${lang}/p2p/adverts`}>{t('My adverts')}</BreadcrumbsItem>
        <BreadcrumbsItem>
          {t('Num')} {advertId}
        </BreadcrumbsItem>
      </Breadcrumbs>
    </Box>
  );

  let body;

  if (ad) {
    body = (
      <UserAdEditContextProvider ad={ad}>
        <Card px="8x" pb="8x">
          <Box
            pt={{ mobile: '0', tablet: '5x' }}
            pb={{ mobile: '1x', tablet: '4x' }}
            px={{ mobile: '5x', desktop: '15x' }}
            borderBottomWidth={{ mobile: '0', tablet: '1x' }}
            borderBottomStyle="solid"
            borderBottomColor="cardHeaderBorderBottom"
          >
            <Text variant={isMobileDevice ? 'h4' : 'h3'}>
              {t(ad.type === 'purchase' ? 'userAd.title.buy' : 'userAd.title.sell', {
                cryptocurrency: ad.cryptoCurrency.code,
                currency: ad.paymethod.currency,
              })}
            </Text>
          </Box>

          {ad.unactiveReason ? (
            <Box
              className={s.unactiveAlert}
              display={{ mobile: 'none', tablet: 'block' }}
              pl={{ tablet: '5x', desktop: '7x' }}
              pr={{ mobile: '5x', desktop: '15x' }}
            >
              <UserAdUnactiveAlert ad={ad} />
            </Box>
          ) : null}

          <Box pb="15x" px={{ mobile: '5x', desktop: '15x' }}>
            <Box
              display="flex"
              justifyContent={{ mobile: 'flex-end', tablet: 'flex-start' }}
              pt="2x"
              pb="3x"
            >
              <UserAdDeletingButton adId={ad.id} />
            </Box>

            <UserAdEditForm ad={ad} mutateAd={mutateAd} />
          </Box>
        </Card>
      </UserAdEditContextProvider>
    );
  } else {
    body = (
      <Card>
        <Box
          className={s.loadingContainer}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {error && error.code === 404 ? (
            <Box className={s.emptyContainer} textAlign="center">
              <Text>{t('userAd.empty.title')}</Text>
              <Text>
                <Link className={s.emptyLink} to={`/${lang}/p2p`}>
                  {t('userAd.empty.marketLink')}
                </Link>{' '}
                {t('userAd.empty.title2')}
              </Text>

              <Box mt="6x">
                <Button as={Link} to={`/${lang}/p2p/adverts/create`}>
                  {t('Create advert')}
                </Button>
              </Box>
            </Box>
          ) : (
            <Spinner />
          )}
        </Box>
      </Card>
    );
  }

  return (
    <Container maxWidth="xl" my="6x">
      {breadcrumbs}

      <Box px={{ mobile: '0', tablet: '2x' }}>{body}</Box>
    </Container>
  );
};
