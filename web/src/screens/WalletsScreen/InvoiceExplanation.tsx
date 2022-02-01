import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'src/components/Box/Box';
import { useT } from 'src/hooks/useT';
import s from 'src/containers/QuickExchange/QuickExchange.postcss';

interface Props {
  onClick: () => void;
  currency: string;
}
export const InvoiceExplanation: React.FC<Props> = (props) => {
  const t = useT();
  return (
    <Box textColor="primary">
      {t('p2p_deposit_withdraw', {
        transfer: (
          <Link
            to={`/wallets/${props.currency.toLowerCase()}/transfer`}
            onClick={() => props.onClick()}
            className={s.link}
          >
            {t('p2p_transfer')}
          </Link>
        ),
      })}
    </Box>
  );
};
