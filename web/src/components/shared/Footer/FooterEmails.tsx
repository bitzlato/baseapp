import { FC } from 'react';
import { SharedTranslateFn } from 'web/src/components/shared/sharedI18n';
import { Box } from 'web/src/components/ui/Box';
import { FooterEmail } from './FooterEmail';
import * as s from './FooterEmails.css';

interface Props {
  t: SharedTranslateFn;
}

export const FooterEmails: FC<Props> = ({ t }) => (
  <Box className={s.root}>
    <FooterEmail email="support@bitzlato.com" label={t('Support')} />
    <FooterEmail email="management@bitzlato.com" label={t('Management')} />
    <FooterEmail email="marketing@bitzlato.com" label={t('Partnership')} />
    <FooterEmail email="lawyers@bitzlato.com" label={t('Legal Assistance')} />
  </Box>
);
