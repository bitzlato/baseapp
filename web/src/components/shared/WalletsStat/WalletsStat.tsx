import { FC, useMemo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Card, CardHeader } from 'web/src/components/ui/Card';
import { Container } from 'web/src/components/ui/Container';
import { Stack } from 'web/src/components/ui/Stack';
import { useDocumentTitle } from 'web/src/hooks/useDocumentTitle';
import { Table, TableHeader, TableBody, TableRow } from 'web/src/components/Gifts/Table';
import { TableColumn, TableHeaderColumn } from 'web/src/components/Gifts/TableColumn';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useFetchP2PWalletStat } from 'web/src/hooks/data/useFetchP2PWallets';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { P2PWalletStat } from 'web/src/modules/p2p/wallet-types';
import { MobileTableRow } from 'web/src/components/Gifts/GiftItem';
import { useAdapterContext } from 'web/src/components/shared/Adapter';

interface WalletsStatProps {
  item: P2PWalletStat;
}

const WalletsStatItem: FC<WalletsStatProps> = ({ item }) => {
  const { t } = useAdapterContext();
  const { isMobileDevice } = useAppContext();

  return isMobileDevice ? (
    <Box mt="4x" py="4x" backgroundColor="block" borderRadius="1.5x">
      <Stack direction="column" marginBottom="5x">
        <MobileTableRow label={t('walletsStat.code')} value={item.code} />
        <MobileTableRow
          label={t('walletsStat.withdrawalFee')}
          value={item.code === 'BTC' ? <span>{t('Dynamic')}</span> : item.fee}
        />
        <MobileTableRow label={t('walletsStat.minDeposit')} value={item.minAcceptableDeposit} />
        <MobileTableRow label={t('walletsStat.minWithdrawal')} value={item.minWithdrawal} />
        <MobileTableRow
          label={t('walletsStat.withdrawEnabled')}
          value={item.withdrawEnabled ? t('Yes') : t('No')}
        />
        <MobileTableRow
          label={t('walletsStat.depositEnabled')}
          value={item.depositEnabled ? t('Yes') : t('No')}
        />
        <MobileTableRow label={t('walletsStat.withdrawalQueue')} value={item.paymentsQueue} />
        <MobileTableRow label={t('walletsStat.withdrawalErrors')} value={item.paymentsError} />
      </Stack>
    </Box>
  ) : (
    <TableRow key={item.code}>
      <TableColumn size="medium">
        <Box pl="6x">
          <Text variant="caption">{item.code}</Text>
        </Box>
      </TableColumn>
      <TableColumn size="medium">
        <Text variant="caption">
          {item.code === 'BTC' ? <span>{t('Dynamic')}</span> : item.fee}
        </Text>
      </TableColumn>
      <TableColumn size="medium">
        <Text variant="caption">{item.minAcceptableDeposit}</Text>
      </TableColumn>
      <TableColumn size="medium">
        <Text variant="caption">{item.minWithdrawal}</Text>
      </TableColumn>
      <TableColumn size="medium">
        <Text variant="caption">{item.withdrawEnabled ? t('Yes') : t('No')}</Text>
      </TableColumn>
      <TableColumn size="medium">
        <Text variant="caption">{item.depositEnabled ? t('Yes') : t('No')}</Text>
      </TableColumn>
      <TableColumn size="medium">
        <Text variant="caption">{item.paymentsQueue}</Text>
      </TableColumn>
      <TableColumn size="medium">
        <Box pl="6x">
          <Text variant="caption">{item.paymentsError}</Text>
        </Box>
      </TableColumn>
    </TableRow>
  );
};

export const WalletsStat: FC = () => {
  const { t } = useAdapterContext();
  const { isMobileDevice } = useAppContext();
  useDocumentTitle(t('walletsStat.titleShort'));
  const { data } = useFetchP2PWalletStat();

  const headerTitles = [
    'code',
    'withdrawalFee',
    'minDeposit',
    'minWithdrawal',
    'withdrawEnabled',
    'depositEnabled',
    'withdrawalQueue',
    'withdrawalErrors',
  ];

  const header = isMobileDevice ? null : (
    <TableHeader>
      {headerTitles.map((item, index) => {
        return (
          <TableHeaderColumn key={item} size="medium">
            <Box
              pl={index === 0 ? '6x' : undefined}
              pr={index === headerTitles.length - 1 ? '6x' : undefined}
            >
              <Tooltip
                label={
                  <Text variant="caption" color="tooltipText">
                    {t(`walletsStat.notice.${item}`)}
                  </Text>
                }
              >
                <Box as="span" fontSize="caption" fontWeight="strong">
                  {t(`walletsStat.${item}`)}
                </Box>
              </Tooltip>
            </Box>
          </TableHeaderColumn>
        );
      })}
    </TableHeader>
  );

  const items = useMemo(
    () =>
      data && data.length > 0
        ? data.flatMap((item) =>
            item.blockchains && item.blockchains.length > 0
              ? item.blockchains.map((blockchain) => ({
                  ...item,
                  ...blockchain,
                  code: `${item.code} (${blockchain.code})`,
                }))
              : item,
          )
        : undefined,
    [data],
  );

  return (
    <Container maxWidth="xl" my="6x">
      <Card>
        <CardHeader>{t('walletsStat.title')}</CardHeader>

        <Box py={{ mobile: '2x', tablet: '6x' }} px={{ mobile: '4x', tablet: '6x' }}>
          <Table header={header} isLoading={!data}>
            {items && (
              <TableBody>
                {items.map((item) => (
                  <WalletsStatItem key={item.code} item={item} />
                ))}
              </TableBody>
            )}
          </Table>

          <Box py="4x" px={{ mobile: '0', tablet: '6x' }}>
            <Text variant="h6">{t('Table headers')}</Text>

            {headerTitles.map((item) => {
              return (
                <Box key={`notice-${item}`} pt="4x">
                  <Text as="span" fontWeight="strong">
                    {t(`walletsStat.${item}`)}
                  </Text>{' '}
                  — <Text as="span">{t(`walletsStat.notice.${item}`)}</Text>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Card>
    </Container>
  );
};
// [{"code":"BTC","paymentsHour":68,"minWithdrawal":"0.00000546","withdrawEnabled":true,"depositEnabled":true,"minFee":0.00006,"fee":0.00028,"paymentsQueue":8,"paymentsError":0,"inputHour":36,"unconfirmed":1430,"minAcceptableDeposit":"0.00005","blockchains":[]},{"code":"USDT","paymentsHour":9,"minWithdrawal":"0.01","withdrawEnabled":true,"depositEnabled":true,"minFee":15,"fee":15,"paymentsQueue":0,"paymentsError":0,"inputHour":2,"unconfirmed":0,"minAcceptableDeposit":"45","blockchains":[{"id":1,"name":"Ethereum","code":"ERC-20","key":"p2p-eth-mainnet","minWithdrawal":"0.01","minAcceptableDeposit":"45","minFee":15,"fee":15,"withdrawEnabled":true},{"id":2,"name":"Tron","code":"TRC-20","key":"p2p-tron-mainnet","minWithdrawal":"10","minAcceptableDeposit":"2","minFee":1,"fee":1,"withdrawEnabled":true}]},{"code":"LTC","paymentsHour":8,"minWithdrawal":"0.00000546","withdrawEnabled":true,"depositEnabled":true,"minFee":0.002,"fee":0.002,"paymentsQueue":1,"paymentsError":0,"inputHour":161,"unconfirmed":0,"minAcceptableDeposit":"0.00000001","blockchains":[]},{"code":"ETH","paymentsHour":0,"minWithdrawal":"0.02","withdrawEnabled":true,"depositEnabled":true,"minFee":0.002,"fee":0.002,"paymentsQueue":0,"paymentsError":0,"inputHour":3,"unconfirmed":0,"minAcceptableDeposit":"0.01","blockchains":[]},{"code":"BCH","paymentsHour":0,"minWithdrawal":"0.00000546","withdrawEnabled":true,"depositEnabled":true,"minFee":0.001,"fee":0.001,"paymentsQueue":0,"paymentsError":0,"inputHour":0,"unconfirmed":0,"minAcceptableDeposit":"0.00000001","blockchains":[]},{"code":"DASH","paymentsHour":0,"minWithdrawal":"0.00000546","withdrawEnabled":true,"depositEnabled":true,"minFee":0.001,"fee":0.001,"paymentsQueue":0,"paymentsError":0,"inputHour":1,"unconfirmed":0,"minAcceptableDeposit":"0.00000001","blockchains":[]},{"code":"DOGE","paymentsHour":0,"minWithdrawal":"1","withdrawEnabled":true,"depositEnabled":true,"minFee":10,"fee":10,"paymentsQueue":0,"paymentsError":0,"inputHour":164,"unconfirmed":0,"minAcceptableDeposit":"0.00000001","blockchains":[]},{"code":"USDC","paymentsHour":0,"minWithdrawal":"0","withdrawEnabled":true,"depositEnabled":true,"minFee":15,"fee":15,"paymentsQueue":0,"paymentsError":0,"inputHour":0,"unconfirmed":0,"minAcceptableDeposit":"45","blockchains":[]},{"code":"DAI","paymentsHour":0,"minWithdrawal":"0.01","withdrawEnabled":true,"depositEnabled":true,"minFee":15,"fee":15,"paymentsQueue":0,"paymentsError":0,"inputHour":0,"unconfirmed":0,"minAcceptableDeposit":"45","blockchains":[]},{"code":"MCR","paymentsHour":0,"minWithdrawal":"1000","withdrawEnabled":true,"depositEnabled":true,"minFee":50,"fee":50,"paymentsQueue":0,"paymentsError":0,"inputHour":0,"unconfirmed":0,"minAcceptableDeposit":"3000","blockchains":[]},{"code":"MDT","paymentsHour":0,"minWithdrawal":"25","withdrawEnabled":true,"depositEnabled":true,"minFee":3,"fee":3,"paymentsQueue":0,"paymentsError":0,"inputHour":0,"unconfirmed":0,"minAcceptableDeposit":"100","blockchains":[]}]
