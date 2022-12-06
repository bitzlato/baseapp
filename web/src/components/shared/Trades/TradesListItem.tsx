import { MouseEventHandler, useMemo } from 'react';
import { downloadFile } from 'web/src/components/profile/reports/ReportDownload';
import { Trade } from 'web/src/modules/p2p/trade.types';
import { createMoney } from 'web/src/helpers/money';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Text } from 'web/src/components/ui/Text';
import {
  useFetchP2PCashContract,
  useFetchP2PTradeInvoice,
} from 'web/src/hooks/data/useFetchP2PTrades';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { AdsTableColumn } from 'web/src/components/shared/AdsTable/AdsTableColumn';
import { AdsTableRow } from 'web/src/components/shared/AdsTable/AdsTable';
import { localeDate } from 'web/src/helpers';
import { getLinkToP2PUser } from 'web/src/components/shared/Ads/getLinkToP2PUser';
import { RUB_CASH_AD_PAYMETHOD_ID } from 'web/src/constants';
import { TradeStatusStepper } from './TradeStatusStepper';
import * as s from './TradesListItem.css';

const STATUS_STEP_INDEXES: Partial<Record<Trade['status'], number>> = {
  trade_created: 0,
  confirm_trade: 1,
  dispute: 2,
  payment: 2,
} as const;

const STATUS_LINE_COLORS = {
  cancel: 'danger',
  confirm_payment: 'tradeFinishedStatusLineBg',
  confirm_trade: 'success',
  dispute: 'success',
  payment: 'success',
  trade_created: 'success',
} as const;

const STEP_COUNT = 3;

interface Props {
  trade: Trade;
}

export const TradesListItem = ({ trade }: Props) => {
  const { user, lang, isMobileDevice } = useAppContext();
  const { t, history, Link } = useAdapterContext();
  const [fetchInvoice] = useFetchP2PTradeInvoice();
  const [fetchCashContract] = useFetchP2PCashContract();
  const isPurchase = trade.type === 'purchase';
  const date = localeDate(
    trade.date,
    'date',
    lang,
    user?.bitzlato_user?.user_profile.timezone ?? undefined,
  );

  const statusLineColor = STATUS_LINE_COLORS[trade.status];
  const statusStepIndex = STATUS_STEP_INDEXES[trade.status];

  const status = useMemo(() => {
    switch (trade.status) {
      case 'confirm_payment':
        return (
          <Text as="span" variant="label" fontStyle="italic" color="success">
            {t(`tradeStatus.${trade.status}`)}
          </Text>
        );

      case 'cancel':
        return (
          <Text as="span" variant="label" fontStyle="italic" color="danger">
            {t(`tradeStatus.${trade.status}`)}
          </Text>
        );

      default:
        return (
          <Text as="span" variant="label">
            {t('tradeStatus.active')}
          </Text>
        );
    }
  }, [t, trade.status]);

  const detailedStatus = useMemo(() => {
    switch (trade.status) {
      case 'confirm_payment':
        return isMobileDevice ? null : (
          <Text as="span" variant="label" fontStyle="italic" color="success">
            {t(`tradeStatus.${trade.status}`)}
          </Text>
        );

      case 'cancel':
        return isMobileDevice ? null : (
          <Text as="span" variant="label" fontStyle="italic" color="danger">
            {t(`tradeStatus.${trade.status}`)}
          </Text>
        );

      default:
        return (
          <Box width="full">
            <Text as="span" variant="label" fontStyle="italic">
              {t(`tradeStatus.${trade.status}`)}
            </Text>
            {statusStepIndex !== undefined ? (
              <TradeStatusStepper step={statusStepIndex} count={STEP_COUNT} />
            ) : null}
          </Box>
        );
    }
  }, [t, trade.status, statusStepIndex, isMobileDevice]);

  const handleStopPropagation: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  const partner = (
    <Box
      as={Link}
      to={getLinkToP2PUser({ userName: trade.partner })}
      className={s.partner}
      color={{ default: 'text', hover: 'tradeLinkHover' }}
      textDecoration="underline"
      onClick={handleStopPropagation}
    >
      {trade.partner}
    </Box>
  );

  const amount = (
    <>
      <MoneyFormat money={createMoney(trade.currency.amount, trade.currency.moneyCurrency)} /> /{' '}
      <MoneyFormat
        money={createMoney(trade.cryptoCurrency.amount, trade.cryptoCurrency.moneyCurrency)}
      />
    </>
  );

  const handleInvoiceDownload: MouseEventHandler<HTMLElement> = async (event) => {
    event.stopPropagation();

    const b64Data = await fetchInvoice(trade.id);

    if (b64Data) {
      downloadFile(b64Data, `Bitzlato trade ${trade.id} invoice.pdf`, 'Download PDF file');
    }
  };

  const handleCashContractDownload: MouseEventHandler<HTMLElement> = async (event) => {
    if (trade.paymethod.id !== RUB_CASH_AD_PAYMETHOD_ID) {
      return;
    }

    event.stopPropagation();

    const b64Data = await fetchCashContract(trade.id);

    if (b64Data) {
      downloadFile(b64Data, `Bitzlato trade ${trade.id} cash contract.doc`, 'Download PDF file');
    }
  };

  const invoice = trade.status === 'confirm_payment' && (
    <Box display="flex" flexDirection="column" gap="1x">
      <Box
        as="button"
        type="button"
        color={{
          default: 'tradeButtonLinkText',
          hover: 'tradeButtonLinkTextHover',
        }}
        textDecoration={{ default: 'none', hover: 'underline' }}
        textAlign="left"
        fontSize="caption"
        onClick={handleInvoiceDownload}
      >
        {t('Download invoice')}
      </Box>
      {trade.paymethod.id === RUB_CASH_AD_PAYMETHOD_ID && (
        <Box
          as="button"
          type="button"
          color={{
            default: 'tradeButtonLinkText',
            hover: 'tradeButtonLinkTextHover',
          }}
          textDecoration={{ default: 'none', hover: 'underline' }}
          textAlign="left"
          fontSize="caption"
          onClick={handleCashContractDownload}
        >
          {t('Download cash contract')}
        </Box>
      )}
    </Box>
  );

  const statusColumn = invoice || detailedStatus;

  const handleTradeClick = () => {
    history.push(`/p2p/trades/${trade.id}`);
  };

  return isMobileDevice ? (
    <Box
      position="relative"
      overflow="hidden"
      pt="5x"
      pb="4x"
      backgroundColor="adBg"
      borderRadius="1.5x"
      cursor="pointer"
      onClick={handleTradeClick}
    >
      <Box position="absolute" top={0} backgroundColor={statusLineColor} width="full" height="1x" />

      <Stack direction="column" marginBottom="4x">
        <Box display="flex" justifyContent="space-between" px="4x">
          <Text variant="label" color="text" fontWeight="strong">
            {isPurchase ? t('Purchase') : t('Selling')}
          </Text>
          {status}
        </Box>
        <Box display="flex" justifyContent="space-between" px="4x">
          <Text variant="label" color="textMuted" fontWeight="strong">
            {t('Date')}
          </Text>
          {date}
        </Box>
        <Box display="flex" justifyContent="space-between" px="4x">
          <Text variant="label" color="textMuted" fontWeight="strong">
            {t('Payment method')}
          </Text>
          {trade.paymethod.description}
        </Box>
        <Box display="flex" justifyContent="space-between" px="4x">
          <Text variant="label" color="textMuted" fontWeight="strong">
            {t('Number')}
          </Text>
          {trade.id}
        </Box>
        <Box display="flex" justifyContent="space-between" px="4x">
          <Text variant="label" color="textMuted" fontWeight="strong">
            {t('Partner')}
          </Text>
          {partner}
        </Box>
        <Box pt="4x" px="4x" borderTopWidth="1x" borderTopStyle="solid" borderColor="inputBorder">
          <Text variant="label" color="textMuted" fontWeight="strong">
            {t('Trade amount')}
          </Text>
          <Box my="2x">{amount}</Box>
        </Box>
        {statusColumn ? (
          <Box
            pt="4x"
            px="4x"
            borderTopWidth="1x"
            borderTopStyle="solid"
            borderColor="inputBorder"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {statusColumn}
          </Box>
        ) : null}
      </Stack>
    </Box>
  ) : (
    <AdsTableRow py="0" height="20x" cursor="pointer" onClick={handleTradeClick}>
      <Box position="absolute" backgroundColor={statusLineColor} width="2x" height="full" />

      <AdsTableColumn size="small">
        <Box pl="6x" overflow="hidden">
          {isPurchase ? t('Purchase') : t('Selling')}
        </Box>
      </AdsTableColumn>
      <AdsTableColumn size="small">
        <Box pr="4x">{date}</Box>
      </AdsTableColumn>
      <AdsTableColumn size="small">
        <Box pr="4x">{trade.id}</Box>
      </AdsTableColumn>
      <AdsTableColumn size="large">
        <Box pr="4x">{amount}</Box>
      </AdsTableColumn>
      <AdsTableColumn size="small">
        <Box pr="4x" textOverflow="ellipsis">
          {trade.paymethod.description}
        </Box>
      </AdsTableColumn>
      <AdsTableColumn size="small">
        <Box pr="4x" textOverflow="ellipsis">
          {partner}
        </Box>
      </AdsTableColumn>
      <AdsTableColumn size="medium">
        <Box pr="5x">{statusColumn}</Box>
      </AdsTableColumn>
    </AdsTableRow>
  );
};
