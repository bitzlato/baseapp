import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';

import * as s from './Badge.css';

interface Props {
  variant: 'danger';
}

export const Badge: FC<Props> = ({ children, variant }) => (
  <Box as="span" className={s.badge[variant]}>
    {children}
  </Box>
);
