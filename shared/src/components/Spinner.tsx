import { FC } from 'react';
import { Box } from './Box';

import * as s from './Spinner.css';

export const Spinner: FC = () => <Box className={s.loader} />;
