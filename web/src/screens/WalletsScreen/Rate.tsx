/* eslint-disable react/destructuring-assignment */
import { useSelector } from 'react-redux';
import { Box } from 'src/components/Box/Box';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'src/hooks/useT';
import { Select } from 'web/src/components/Select/Select';
import { createCcy, createMoney } from 'web/src/helpers/money';
import { useChangeRate, useFetchRate, useFetchRateSources } from 'web/src/hooks/data/useFetchRate';
import { CurrencyRate } from 'web/src/modules/p2p/types';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';

function getSourceId(source: CurrencyRate): string {
  return source.id.toString();
}

interface Props {
  cryptoCurrency: string;
  fiatCurrency: string;
  fetchRate: boolean;
}

export const Rate: React.FC<Props> = (p) => {
  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const rateResponse = useFetchRate(p.cryptoCurrency, p.fetchRate ? p.fiatCurrency : undefined);
  const rateSourcesResponse = useFetchRateSources(
    p.cryptoCurrency,
    p.fetchRate ? p.fiatCurrency : undefined,
  );
  const changeRate = useChangeRate();
  const source = rateResponse.data ?? null;
  const sources = rateSourcesResponse.data ?? [];

  const handleChangeSource = (value: CurrencyRate | null) => {
    changeRate({
      cryptocurrency: p.cryptoCurrency,
      currency: p.fiatCurrency,
      url: value!.url,
    });
  };

  const userCcy = createCcy(p.fiatCurrency, 2);

  const renderSelectItem = (value: CurrencyRate) => {
    return (
      <Box row spacing justify="between">
        <span>{value.description}</span>
        <MoneyFormat money={createMoney(value.rate, userCcy)} />
      </Box>
    );
  };

  const renderContent = () => {
    return source ? (
      <>
        <Text variant="body">
          {t('rate.select', {
            pair: `${p.cryptoCurrency}/${p.fiatCurrency}`,
            br: <br />,
          })}
        </Text>

        <Select
          options={sources}
          value={source}
          onChange={handleChangeSource}
          placeholder={t('Rate')}
          formatOptionLabel={renderSelectItem}
          getOptionValue={getSourceId}
          menuPortalTarget={document.body}
        />
      </>
    ) : null;
  };

  return isMobileDevice ? (
    <Box col spacing="3">
      {renderContent()}
    </Box>
  ) : (
    <Box col gap="4">
      {renderContent()}
    </Box>
  );
};
