import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { OptionalWithUndefined } from 'web/src/types';

import * as s from './TableColumn.css';
import { ColumnsSizes } from './TableColumn.css';

interface Props extends Omit<OptionalWithUndefined<Sprinkles>, 'size'> {
  size: ColumnsSizes;
}

export const TableColumn: FC<Props> = ({ size, ...props }) => (
  <Box className={s.columns[size]} {...props} />
);

export const TableHeaderColumn: FC<Props> = ({ size, ...props }) => (
  <Box className={s.columns[size]} fontSize="medium" {...props} />
);
