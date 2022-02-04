import { Box } from 'src/components/Box/Box';
import { useT } from 'web/src/hooks/useT';
import { ApiCurrency } from 'web/src/modules';
import { QuickExchangeLimits } from 'web/src/modules/public/quickExchangePublic/types';
import { PriceLimit } from './PriceLimit';

interface Props {
  limits: QuickExchangeLimits;
  ccy: ApiCurrency;
}

export const Limits: React.FC<Props> = ({ limits, ccy }) => {
  const t = useT();
  return (
    <Box col spacing>
      <PriceLimit
        label={t('page.body.quick.exchange.limit.order')}
        limit={limits.order_limit}
        ccy={ccy}
        price={ccy.price}
      />
      <PriceLimit
        label={t('page.body.quick.exchange.limit.daily')}
        limit={limits.daily_limit}
        ccy={ccy}
        price={ccy.price}
      />
      <PriceLimit
        label={t('page.body.quick.exchange.limit.weekly')}
        limit={limits.weekly_limit}
        ccy={ccy}
        price={ccy.price}
      />
    </Box>
  );
};
