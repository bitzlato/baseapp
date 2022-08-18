import { FC, useState } from 'react';
import { Language } from 'web/src/types';
import { Box } from 'web/src/components/ui/Box';
import { RenderLinkComponent } from 'web/src/components/shared/sharedTypes';
import { SharedTranslateFn } from 'web/src/components/shared/sharedI18n';
import { FooterMenuSection, FooterMenuSections } from './FooterMenuSection';
import { FooterMenuLink } from './FooterMenuLink';

interface Props {
  t: SharedTranslateFn;
  language: Language;
  renderMarketLink: RenderLinkComponent;
}

export const FooterMenu: FC<Props> = ({ t, language, renderMarketLink }) => {
  const [active, setActive] = useState<FooterMenuSections | undefined>();

  const handleClick = (section: FooterMenuSections) =>
    setActive((prev) => (prev !== section ? section : undefined));

  return (
    <Box display="flex" flexDirection={{ mobile: 'column', tablet: 'row' }} justifyContent="center">
      <FooterMenuSection
        section={FooterMenuSections.TRADING}
        title={t('Trading')}
        active={active === FooterMenuSections.TRADING}
        onTitleClick={handleClick}
      >
        <FooterMenuLink to="/p2p">{t('P2P Trading')}</FooterMenuLink>
        <FooterMenuLink to="/trading" renderMarketLink={renderMarketLink}>
          {t('Exchange')}
        </FooterMenuLink>
        <FooterMenuLink to="/quick-exchange" renderMarketLink={renderMarketLink}>
          {t('Quick Exchange')}
        </FooterMenuLink>
        <FooterMenuLink to={`/${language}/price`}>{t('Fees')}</FooterMenuLink>
        <FooterMenuLink to="/wallets_stat">{t('Wallets Statistics')}</FooterMenuLink>
      </FooterMenuSection>

      <FooterMenuSection
        section={FooterMenuSections.PRODUCTS}
        title={t('Products and Services')}
        active={active === FooterMenuSections.PRODUCTS}
        onTitleClick={handleClick}
      >
        <FooterMenuLink
          to={
            language === 'ru'
              ? '/ru/knowledgebase/telegram-boty-bitzlato/'
              : '/knowledgebase/bitzlato-telegram-bots/'
          }
        >
          {t('Telegram Bots')}
        </FooterMenuLink>
        <FooterMenuLink to={`/${language}/affiliate-program`}>
          {t('Affiliate Program')}
        </FooterMenuLink>
        {language === 'ru' && (
          <FooterMenuLink to="/ru/blog/yuridicheskaya-podderzhka-ot-bitzlato/">
            {t('Legal Support')}
          </FooterMenuLink>
        )}
      </FooterMenuSection>

      <FooterMenuSection
        section={FooterMenuSections.INFORMATION}
        title={t('Information')}
        active={active === FooterMenuSections.INFORMATION}
        onTitleClick={handleClick}
      >
        <FooterMenuLink to={`/${language}/about/`}>{t('About Us')}</FooterMenuLink>
        <FooterMenuLink to={`/${language}/knowledgebase/`}>{t('Knowledge center')}</FooterMenuLink>
        <FooterMenuLink to={`/${language}/blog/`}>{t('Blog')}</FooterMenuLink>
        <FooterMenuLink to={`/${language}/reviews/`}>{t('Reviews')}</FooterMenuLink>
        <FooterMenuLink to={`/${language}/our-vacancies/`}>{t('Jobs')}</FooterMenuLink>
      </FooterMenuSection>

      <FooterMenuSection
        section={FooterMenuSections.DOCUMENTATION}
        title={t('Documentation')}
        active={active === FooterMenuSections.DOCUMENTATION}
        onTitleClick={handleClick}
      >
        <FooterMenuLink to={`/${language}/terms-of-service-bitzlato/`}>
          {t('Terms of Service Bitzlato')}
        </FooterMenuLink>
        <FooterMenuLink to={`/${language}/official-replies-from-bitzlato/`}>
          {t('Official replies from Bitzlato')}
        </FooterMenuLink>
        <FooterMenuLink
          to={`/${language}/anti-money-laundering-policy-and-know-your-client-policy/`}
        >
          {t('AML/KYC Policy')}
        </FooterMenuLink>
        <FooterMenuLink to={`/${language}/exchange-terms-and-conditions/`}>
          {t('Exchange terms and conditions')}
        </FooterMenuLink>
        <FooterMenuLink to={`/${language}/policy/`}>{t('Security Policy')}</FooterMenuLink>
        <FooterMenuLink to="/docs" renderMarketLink={renderMarketLink}>
          {t('API')}
        </FooterMenuLink>
      </FooterMenuSection>
    </Box>
  );
};
