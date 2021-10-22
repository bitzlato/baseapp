import React, { FC } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BlockchainIcon } from 'src/components/BlockchainIcon/BlockchainIcon';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';

import s from './CurrencyTicker.postcss';

type Props = {
  symbol: string | undefined;
};

export const CurrencyTicker: FC<Props> = ({ symbol = '' }: Props) => {
  const isMobile = useSelector(selectMobileDeviceState);
  const [currency, protocol] = symbol.split('-');
  const content = (
    <span className={s.currency}>
      <span>{currency.toUpperCase()}</span>
      {protocol && <BlockchainIcon className={s.blockchainIcon} protocol={protocol} />}
    </span>
  );

  return protocol && !isMobile ? (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={symbol}>{symbol.toUpperCase()}</Tooltip>}
    >
      {content}
    </OverlayTrigger>
  ) : (
    content
  );
};
