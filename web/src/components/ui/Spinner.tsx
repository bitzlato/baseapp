import { FC } from 'react';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import { Box } from './Box';
import * as s from './Spinner.css';

type Props = {
  size?: Sprinkles['size'] | undefined;
};

export const Spinner: FC<Props> = ({ size = '8x' }) => <Box className={s.loader} size={size} />;
