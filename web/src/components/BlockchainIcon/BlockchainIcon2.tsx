import { FC } from 'react';
import s from './BlockchainIcon2.postcss';

interface Props {
  value: string;
}

export const BlockchainIcon2: FC<Props> = (props) => {
  const src = MAP.get(props.value);
  return src ? <img className={s.blockchainIconSmall} src={src} alt={props.value} /> : null;
};

const MAP = new Map<string, string>([
  ['eth', require('cryptocurrency-icons/svg/color/eth.svg')],
  ['bsc', require('cryptocurrency-icons/svg/color/bnb.svg')],
  ['avax', require('cryptocurrency-icons/svg/color/avax.svg')],
  ['polygon', require('cryptocurrency-icons/svg/color/matic.svg')],
  ['heco', require('cryptocurrency-icons/svg/color/ht.svg')],
]);
