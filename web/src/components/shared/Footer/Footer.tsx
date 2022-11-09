import { Box } from 'web/src/components/ui/Box';
import cn from 'classnames';
import { createT } from 'web/src/components/shared/sharedI18n';
import { FC } from 'react';
import { RenderLinkComponent } from 'web/src/components/shared/sharedTypes';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import { Language, Theme } from 'web/src/types';
import { FooterMenu } from './FooterMenu';
import { FooterLogo } from './FooterLogo';
import { FooterEmails } from './FooterEmails';
import { FooterSocials } from './FooterSocials';
import { FooterApps } from './FooterApps';
import * as s from './Footer.css';

export interface SharedFooterProps {
  theme: Theme;
  language: Language;
  renderMarketLink: RenderLinkComponent;
  logoURL: string;
}

export const Footer: FC<SharedFooterProps> = ({ theme, language, renderMarketLink, logoURL }) => {
  const themeClassName = theme === 'light' ? themeLight : themeDark;
  const t = createT(language);

  return (
    <Box className={cn(themeClassName, s.footer)}>
      <Box className={s.footerContainer}>
        <Box
          display="flex"
          flexDirection={{ mobile: 'column', tablet: 'row' }}
          borderBottomWidth="1x"
          borderBottomColor="footerBorder"
          borderBottomStyle="solid"
          pt="9x"
          pb="7x"
        >
          <Box className={s.leftColumn} display={{ mobile: 'none', tablet: 'block' }}>
            <FooterLogo logoURL={logoURL} />
          </Box>
          <FooterMenu t={t} language={language} renderMarketLink={renderMarketLink} />
          <Box className={s.rightColumn}>
            <FooterEmails t={t} />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={{ mobile: 'column', tablet: 'row' }}
          alignItems="center"
          pt="4x"
          pb="6x"
        >
          <Box className={cn(s.leftColumn, s.copyright)} color="footerColor" fontSize="caption">
            {t('copyright')}
          </Box>
          <Box className={s.socialNetworks}>
            <FooterSocials t={t} language={language} />
          </Box>
          <Box className={cn(s.rightColumn, s.apps)}>
            <FooterApps language={language} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
