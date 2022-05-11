import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { OptionalWithUndefined } from 'web/src/types';

import * as s from './AdsTableColumn.css';

interface Props extends Omit<OptionalWithUndefined<Sprinkles>, 'size'> {
  size: 'small' | 'medium' | 'large';
}

export const AdsTableColumn: FC<Props> = ({ size, ...props }) => (
  <Box className={s.columns[size]} {...props} />
);

export const AdsTableHeaderColumn: FC<Props> = ({ size, ...props }) => (
  <Box className={s.columns[size]} color="adTableHeader" fontSize="medium" {...props} />
);
