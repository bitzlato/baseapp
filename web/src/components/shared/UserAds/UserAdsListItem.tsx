import { FC, SyntheticEvent, useMemo, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { AdsTableColumn } from 'web/src/components/shared/AdsTable/AdsTableColumn';
import { AdsTableRow } from 'web/src/components/shared/AdsTable/AdsTable';
import { UserAdvert } from 'web/src/modules/p2p/types';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';
import { useUpdateUserAd } from 'web/src/hooks/mutations/useUpdateUserAd';
import { FetchError } from 'web/src/helpers/fetch';
import { Modal, ModalBody, ModalFooter } from 'web/src/components/ui/Modal';
import { SwitchField } from './SwitchField';
import * as s from './UserAdsListItem.css';

interface Props {
  ad: UserAdvert;
}

export const UserAdsListItem: FC<Props> = ({ ad }) => {
  const { lang, isMobileDevice } = useAppContext();
  const { t, history } = useAdapterContext();
  const [updateUserAd, { status: updateUserAdState }] = useUpdateUserAd(lang);
  const [showError, setShowError] = useState(false);
  const isPurchase = ad.type === 'purchase';

  const limits = (
    <>
      <P2PFiatFormat money={ad.limitCurrency.min} cryptoCurrency={ad.cryptoCurrency} /> —{' '}
      <P2PFiatFormat money={ad.limitCurrency.max} cryptoCurrency={ad.cryptoCurrency} />
    </>
  );

  const statusLineColor = useMemo(() => {
    switch (ad.status) {
      case 'active':
        return 'success';

      default:
        return 'tradeFinishedStatusLineBg';
    }
  }, [ad.status]);

  const handleStopPropagation = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const handleAdClick = () => {
    history.push(`/p2p/adverts/${ad.id}`);
  };

  const handleUpdateStatus = async () => {
    try {
      await updateUserAd({
        id: ad.id,
        values: { status: ad.status !== 'active' ? 'active' : 'pause' },
      });
    } catch (error) {
      if (
        error instanceof FetchError &&
        error.code === 477 &&
        error.payload.code === 'AdvertIsDisabled'
      ) {
        setShowError(true);
      }
    }
  };

  const controls = (
    <Box className={s.statusSwitch}>
      <SwitchField
        width="full"
        justifyContent={{ mobile: 'space-between', tablet: 'flex-start' }}
        label={
          <Text variant="label" fontStyle="italic">
            {t(`userAds.status.${ad.status === 'active' ? 'active' : 'inactive'}`)}
          </Text>
        }
        labelPosition={isMobileDevice ? 'left' : 'right'}
        isLoading={updateUserAdState === 'running'}
        value={ad.status === 'active'}
        onChange={handleUpdateStatus}
      />
    </Box>
  );

  return (
    <>
      {isMobileDevice ? (
        <Box
          position="relative"
          overflow="hidden"
          py="5x"
          backgroundColor="adBg"
          borderRadius="1.5x"
          cursor="pointer"
          onClick={handleAdClick}
        >
          <Box
            position="absolute"
            top={0}
            backgroundColor={statusLineColor}
            width="full"
            height="1x"
          />

          <Stack direction="column" marginBottom="4x">
            <Box display="flex" justifyContent="space-between" px="4x">
              <Text variant="label" color="text" fontWeight="strong">
                {isPurchase ? t('Purchase') : t('Selling')}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between" px="4x">
              <Text variant="label" color="textMuted" fontWeight="strong">
                {t('Currency')}
              </Text>
              <Text variant="label" textAlign="right">
                {ad.paymethod_currency}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between" px="4x">
              <Text variant="label" color="textMuted" fontWeight="strong">
                {t('Payment method')}
              </Text>
              <Text variant="label" textAlign="right">
                {ad.paymethod_description}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between" px="4x">
              <Text variant="label" color="textMuted" fontWeight="strong">
                {t('Rate')}
              </Text>
              <Text variant="label" textAlign="right">
                <P2PFiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between" px="4x">
              <Text variant="label" color="textMuted" fontWeight="strong">
                {t('Limits')}
              </Text>
              <Text variant="label" textAlign="right">
                {limits}
              </Text>
            </Box>
            <Box
              pt="4x"
              px="4x"
              borderTopWidth="1x"
              borderTopStyle="solid"
              borderColor="inputBorder"
            >
              <Box onClick={handleStopPropagation}>{controls}</Box>
            </Box>
          </Stack>
        </Box>
      ) : (
        <AdsTableRow py="0" height="20x" cursor="pointer" onClick={handleAdClick}>
          <Box position="absolute" backgroundColor={statusLineColor} width="2x" height="full" />

          <AdsTableColumn size="small">
            <Box pl="6x" overflow="hidden">
              {isPurchase ? t('Purchase') : t('Selling')}
            </Box>
          </AdsTableColumn>
          <AdsTableColumn size="small">
            <Box pr="4x">{ad.paymethod_currency}</Box>
          </AdsTableColumn>
          <AdsTableColumn size="small">
            <Box pr="4x">{ad.paymethod_description}</Box>
          </AdsTableColumn>
          <AdsTableColumn size="small">
            <Box pr="4x" textOverflow="ellipsis">
              <P2PFiatFormat money={ad.rate} cryptoCurrency={ad.cryptoCurrency} />
              {ad.ratePercent ? ` (${ad.ratePercent}%)` : null}
            </Box>
          </AdsTableColumn>
          <AdsTableColumn size="small">
            <Box pr="4x">{limits}</Box>
          </AdsTableColumn>
          <AdsTableColumn size="large">
            <Box
              pr="5x"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              onClick={handleStopPropagation}
            >
              {controls}
            </Box>
          </AdsTableColumn>
        </AdsTableRow>
      )}

      <Modal show={showError} onClose={() => setShowError(false)}>
        <Box px="6x" py="5x">
          <Text variant="title" fontWeight="medium" textAlign="center">
            {t('userAds.disabled.title')}
          </Text>
        </Box>
        <ModalBody>
          <Text textAlign="center">{t('userAds.disabled.notice')}</Text>
        </ModalBody>
        <ModalFooter>
          <Box display="flex" alignItems="center" gap="4x" mt="6x" width="full">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => setShowError(false)}
            >
              {t('Cancel')}
            </Button>
            <Button color="secondary" fullWidth onClick={handleAdClick}>
              {t('Go to')}
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    </>
  );
};
