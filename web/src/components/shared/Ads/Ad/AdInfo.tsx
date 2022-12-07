import { FC } from 'react';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { P2PMoneyFormat } from 'web/src/components/money/P2PFiatMoney';
import { P2PFiatFormat } from 'web/src/components/money/P2PFiatFormat';
import { MoneyFormat } from 'web/src/components/MoneyFormat/MoneyFormat';
import { Money } from '@bitzlato/money-js';
import { P2PCryptoCurrency } from 'web/src/types/currencies.types';
import { UserInfo } from 'web/src/modules/p2p/user.types';
import { useUser } from 'web/src/components/app/UserContext';
import { AdStat } from './AdStat';

type Props = {
  cryptocurrency: P2PCryptoCurrency;
  rate: Money;
  currencyMin: Money;
  currencyMax: Money;
  cryptoCurrencyMax: Money;
  cryptoCurrencyMin: Money;
  owner: UserInfo;
};

export const AdInfo: FC<Props> = ({
  cryptocurrency,
  rate,
  currencyMin,
  currencyMax,
  cryptoCurrencyMin,
  cryptoCurrencyMax,
  owner,
}) => {
  const { t } = useAdapterContext();
  const user = useUser();

  const isLogged = user !== undefined;
  const showBitzlatoFee = isLogged ? user?.username !== owner.name : false;

  return (
    <>
      <Text variant="h6">{t('Deal info')}</Text>
      <AdStat label={t('Rate')}>
        <Text>
          <P2PMoneyFormat money={rate} cryptoCurrency={cryptocurrency} />
        </Text>
      </AdStat>
      <AdStat label={t('Limits')}>
        <Text>
          <P2PFiatFormat money={currencyMin} cryptoCurrency={cryptocurrency} /> —{' '}
          <P2PMoneyFormat money={currencyMax} cryptoCurrency={cryptocurrency} />
        </Text>
      </AdStat>
      <AdStat label="">
        <Text>
          <MoneyFormat money={cryptoCurrencyMin} /> — <MoneyFormat money={cryptoCurrencyMax} />
        </Text>
      </AdStat>
      {showBitzlatoFee && (
        <AdStat label={t('Bitzlato fee')}>
          <Text>0%</Text>
        </AdStat>
      )}
    </>
  );
};
