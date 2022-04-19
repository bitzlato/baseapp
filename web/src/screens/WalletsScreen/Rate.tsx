/* eslint-disable react/destructuring-assignment */
import { Box } from 'src/components/Box/Box';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'src/hooks/useT';
import { Select } from 'web/src/components/Select/Select';
import { createCcy, createMoney } from 'web/src/helpers/money';
import { useChangeRate, useFetchRate, useFetchRateSources } from 'web/src/hooks/data/useFetchRate';
import { CurrencyRate } from 'web/src/modules/p2p/rate-types';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';

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
        <span>
          (
          <span>
            <MoneyFormat money={createMoney(value.rate, userCcy)} />)
          </span>
        </span>
      </Box>
    );
  };

  return source ? (
    <Box col gap="4">
      <Text variant="body">
        {t('rate.select', {
          pair: `${p.cryptoCurrency}/${p.fiatCurrency}`,
        })}
      </Text>

      <Select
        options={sources}
        value={source}
        onChange={handleChangeSource}
        placeholder={<span>{t('Rate')}</span>}
        formatOptionLabel={renderSelectItem}
        getOptionValue={getSourceId}
        menuPortalTarget={document.body}
      />
    </Box>
  ) : null;
};
