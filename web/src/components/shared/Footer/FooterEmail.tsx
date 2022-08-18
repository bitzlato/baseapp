import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import * as s from './FooterEmail.css';

interface Props {
  email: string;
  label: string;
}

export const FooterEmail: FC<Props> = ({ email, label }) => (
  <Box className={s.root}>
    <Box as="a" className={s.email} href={`mailto:${email}`}>
      {email}
    </Box>
    <Text variant="caption" color="footerEmailCaption">
      {label}
    </Text>
  </Box>
);
