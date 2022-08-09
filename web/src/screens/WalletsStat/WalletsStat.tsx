import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Card, CardHeader } from 'web/src/components/ui/Card';
import { Container } from 'web/src/components/ui/Container';
import { Stack } from 'web/src/components/ui/Stack';
import { useDocumentTitle } from 'web/src/hooks/useDocumentTitle';
import { useT } from 'web/src/hooks/useT';
import { Table, TableHeader, TableBody, TableRow } from 'web/src/components/Gifts/Table';
import { TableColumn, TableHeaderColumn } from 'web/src/components/Gifts/TableColumn';
import { useIsMobileDevice } from 'web/src/components/app/AppContext';
import { useFetchP2PWalletStat } from 'web/src/hooks/data/useFetchP2PWallets';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { P2PWalletStat } from 'web/src/modules/p2p/wallet-types';
import { MobileTableRow } from 'web/src/components/Gifts/GiftItem';

interface WalletsStatProps {
  item: P2PWalletStat;
}

const WalletsStatItem: FC<WalletsStatProps> = ({ item }) => {
  const t = useT();
  const isMobileDevice = useIsMobileDevice();

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

export const WalletsStatScreen: FC = () => {
  const t = useT();
  const isMobileDevice = useIsMobileDevice();
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

  return (
    <Container maxWidth="xl" my="6x">
      <Card>
        <CardHeader>{t('walletsStat.title')}</CardHeader>

        <Box py={{ mobile: '2x', tablet: '6x' }} px={{ mobile: '4x', tablet: '6x' }}>
          <Table header={header} isLoading={!data}>
            {data && data.length > 0 ? (
              <TableBody>
                {data.map((item) => (
                  <WalletsStatItem key={item.code} item={item} />
                ))}
              </TableBody>
            ) : null}
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
