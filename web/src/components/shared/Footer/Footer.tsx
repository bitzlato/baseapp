import { Box } from 'web/src/components/ui/Box';
import cn from 'classnames';
import { Stack } from 'web/src/components/ui/Stack';
import { createT } from 'web/src/components/shared/sharedI18n';
import { FC, useState } from 'react';
import { RenderLinkComponent } from 'web/src/components/shared/sharedTypes';
import { themeDark, themeLight } from 'web/src/theme/vars.css';
import FacebookIcon from 'web/src/assets/svg/FacebookIcon.svg';
import InstagramIcon from 'web/src/assets/svg/InstagramIcon.svg';
import TelegramIcon from 'web/src/assets/svg/TelegramIcon.svg';
import TwitterIcon from 'web/src/assets/svg/TwitterIcon.svg';
import YoutubeIcon from 'web/src/assets/svg/YoutubeIcon.svg';
import { Language, Theme } from 'web/src/types';
import { getBitzlatoLink } from 'web/src/helpers/links';
import { FooterMenu } from './FooterMenu';
import * as s from './Footer.css';

type Product = 'p2p' | 'payment-gateway' | 'cryptoloan' | 'exchange';
export const getProductLink = (locale: string, product: Product) => {
  switch (product) {
    case 'exchange':
      return '/trading';

    case 'p2p':
      return `/${locale}/p2p`;

    default:
      return `https://bitzlato.com/${locale}/${product}`;
  }
};

export interface SharedFooterProps {
  theme: Theme;
  language: Language;
  renderMarketLink: RenderLinkComponent;
}

export const Footer: FC<SharedFooterProps> = ({ theme, language, renderMarketLink }) => {
  const [active, setActive] = useState<string | undefined>();
  const themeClassName = theme === 'light' ? themeLight : themeDark;
  const t = createT(language);

  const handleClick = (section: string) =>
    setActive((prev) => (prev !== section ? section : undefined));

  return (
    <>
      <Box
        className={cn(themeClassName, s.footer)}
        bg="footerBg"
        borderBottomWidth="2x"
        borderBottomColor="footerBorder"
        borderBottomStyle="solid"
        py={{ mobile: '4x', tablet: '7x' }}
        px={{ mobile: '4x', tablet: '0' }}
      >
        <Stack
          direction={{ mobile: 'column', tablet: 'row' }}
          justifyContent="center"
          marginBottom={{ mobile: '0', tablet: '9x' }}
          marginRight={{ mobile: '0', tablet: '8x' }}
        >
          <FooterMenu
            section="products"
            title={t('Products')}
            active={active === 'products'}
            onTitleClick={handleClick}
          >
            <Box as="a" className={s.link} href={getProductLink(language, 'p2p')}>
              {t('P2P Platform')}
            </Box>
            <Box as="a" className={s.link} href={getProductLink(language, 'exchange')}>
              {t('Exchange')}
            </Box>
            <Box as="a" className={s.link} href={getProductLink(language, 'cryptoloan')}>
              {t('Crypto Loan')}
            </Box>
          </FooterMenu>
          <FooterMenu
            section="information"
            title={t('Information')}
            active={active === 'information'}
            onTitleClick={handleClick}
          >
            <Box as="a" className={s.link} href={getBitzlatoLink(language, 'knowledgebase')}>
              {t('Support')}
            </Box>
            <Box as="a" className={s.link} href={getBitzlatoLink(language, 'faq')}>
              {t('FAQ')}
            </Box>
            <Box as="a" className={s.link} href={getBitzlatoLink(language, 'blog')}>
              {t('Blog')}
            </Box>
            <Box as="a" className={s.link} href={getBitzlatoLink(language, 'wallets_stat/')}>
              {t('Wallets statistic')}
            </Box>
            {renderMarketLink({
              key: 'api',
              className: s.link,
              to: '/docs',
              children: t('API'),
            })}
          </FooterMenu>
          <FooterMenu
            section="company"
            title={t('Company')}
            active={active === 'company'}
            onTitleClick={handleClick}
          >
            <Box as="a" className={s.link} href={getBitzlatoLink(language, 'about')}>
              {t('About us')}
            </Box>
            <Box as="a" className={s.link} href={getBitzlatoLink(language, 'reviews')}>
              {t('Reviews')}
            </Box>
            {renderMarketLink({
              key: 'fees',
              className: s.link,
              to: '/fees',
              children: t('Fees'),
            })}
          </FooterMenu>
          <FooterMenu
            section="legal_documents"
            title={t('Legal documents')}
            active={active === 'legal_documents'}
            onTitleClick={handleClick}
          >
            <Box
              as="a"
              className={s.link}
              href={getBitzlatoLink(language, 'official-replies-from-bitzlato')}
            >
              {t('Official replies from Bitzlato')}
            </Box>
            <Box
              as="a"
              className={s.link}
              href={getBitzlatoLink(
                language,
                'anti-money-laundering-policy-and-know-your-client-policy',
              )}
            >
              {t('AML/KYC Policy')}
            </Box>
            <Box
              as="a"
              className={s.link}
              href={getBitzlatoLink(language, 'terms-of-service-bitzlato')}
            >
              {t('Terms of Service Bitzlato')}
            </Box>
            <Box
              as="a"
              className={s.link}
              href={getBitzlatoLink(language, 'exchange-terms-and-conditions')}
            >
              {t('Exchange terms and conditions')}
            </Box>
            <Box as="a" className={s.link} href={getBitzlatoLink(language, 'policy')}>
              {t('Security Policy')}
            </Box>
          </FooterMenu>
        </Stack>

        {language === 'ru' ? (
          <Stack justifyContent="center" marginRight="4x">
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://t.me/bitzlato"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Telegram Channel')}
            >
              <TelegramIcon />
            </Box>
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://www.facebook.com/bitzlato.ru"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Facebook')}
            >
              <FacebookIcon />
            </Box>
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://www.instagram.com/bitzlato"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Instagram')}
            >
              <InstagramIcon />
            </Box>
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://www.youtube.com/c/BZRussia"
              target="_blank"
              rel="noopener noreferrer"
              title={t('YouTube')}
            >
              <YoutubeIcon />
            </Box>
          </Stack>
        ) : (
          <Stack justifyContent="center" marginRight="4x">
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://t.me/bitzlato"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Telegram Channel')}
            >
              <TelegramIcon />
            </Box>
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://www.facebook.com/bitzlato"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Facebook')}
            >
              <FacebookIcon />
            </Box>
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://www.instagram.com/bitzlato.en"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Instagram')}
            >
              <InstagramIcon />
            </Box>
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://www.youtube.com/channel/UCz11WIy4qSWRrRVpEl0Txqg"
              target="_blank"
              rel="noopener noreferrer"
              title={t('YouTube')}
            >
              <YoutubeIcon />
            </Box>
            <Box
              as="a"
              className={s.socialNetwork}
              href="https://twitter.com/bitzlato"
              target="_blank"
              rel="noopener noreferrer"
              title={t('Twitter')}
            >
              <TwitterIcon />
            </Box>
          </Stack>
        )}
      </Box>

      <Box
        className={cn(themeClassName, s.footer)}
        bg="footerBg"
        color="footerColor"
        fontSize="small"
        py="7x"
        textAlign="center"
      >
        {t('copyright')}
      </Box>
    </>
  );
};
