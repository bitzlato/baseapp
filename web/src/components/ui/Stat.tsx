import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';

import { Text } from 'web/src/components/ui/Text';

import * as s from './Stat.css';

export const Stat: FC = ({ children }) => (
  <Box
    className={s.stat}
    bg="statBg"
    borderRadius="1x"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    px="4x"
    py="5x"
  >
    {children}
  </Box>
);

export const StatLabel: FC = ({ children }) => <Text variant="label">{children}</Text>;

export const StatValue: FC = ({ children }) => (
  <Text variant="h3" as="span">
    {children}
  </Text>
);
