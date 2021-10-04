import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useT } from 'src/hooks/useT';
import { selectCurrentLanguage } from 'src/modules';
import { FacebookIcon } from './FacebookIcon';

import s from './Footer.postcss';
import { InstagramIcon } from './InstagramIcon';
import { TelegramIcon } from './TelegramIcon';
import { TwitterIcon } from './TwitterIcon';
import { YoutubeIcon } from './YoutubeIcon';
import { getProductLink, getBitzlatoLink } from './links';

export const Footer: FC = () => {
  const t = useT();
  const languageCode = useSelector(selectCurrentLanguage);

  return (
    <>
      <div className={s.footer}>
        <div className={s.row}>
          <div className={s.col}>
            <div className={s.title}>{t('page.footer.products')}</div>
            <div className={s.links}>
              <a className={s.link} href={getProductLink(languageCode, 'p2p')}>
                {t('page.body.landing.footer.p2p')}
              </a>
              <a className={s.link} href={getProductLink(languageCode, 'exchange')}>
                {t('page.body.landing.footer.exchange')}
              </a>
              <a className={s.link} href={getProductLink(languageCode, 'paymentGateway')}>
                {t('page.body.landing.footer.paymentGateway')}
              </a>
              <a className={s.link} href={getProductLink(languageCode, 'cryptoloan')}>
                {t('page.body.landing.footer.cryptoloan')}
              </a>
            </div>
          </div>

          <div className={s.col}>
            <div className={s.title}>{t('page.footer.information')}</div>

            <div className={s.links}>
              <a className={s.link} href={getBitzlatoLink(languageCode, 'knowledgebase')}>
                {t('page.body.landing.footer.support')}
              </a>
              <a className={s.link} href={getBitzlatoLink(languageCode, 'faq')}>
                {t('page.body.landing.footer.faq')}
              </a>
              <a className={s.link} href={getBitzlatoLink(languageCode, 'blog')}>
                {t('page.body.landing.footer.blog')}
              </a>
            </div>
          </div>

          <div className={s.col}>
            <div className={s.title}>{t('page.footer.company')}</div>
            <div className={s.links}>
              <a className={s.link} href={getBitzlatoLink(languageCode, 'about')}>
                {t('page.body.landing.footer.about')}
              </a>
              <a className={s.link} href={getBitzlatoLink(languageCode, 'reviews')}>
                {t('page.body.landing.footer.reviews')}
              </a>
              <a className={s.link} href={getBitzlatoLink(languageCode, 'price')}>
                {t('page.body.landing.footer.fees')}
              </a>
            </div>
          </div>

          <div className={s.col}>
            <div className={s.title}>{t('page.footer.legalDocuments')}</div>
            <div className={s.links}>
              <a
                className={s.link}
                href={getBitzlatoLink(languageCode, 'official-replies-from-bitzlato')}
              >
                Official replies from Bitzlato
              </a>
              <a
                className={s.link}
                href={getBitzlatoLink(
                  languageCode,
                  'anti-money-laundering-policy-and-know-your-client-policy',
                )}
              >
                AML/KYC Policy
              </a>
              <a
                className={s.link}
                href={getBitzlatoLink(languageCode, 'terms-of-service-bitzlato')}
              >
                Terms of Service Bitzlato
              </a>
              <a
                className={s.link}
                href={getBitzlatoLink(languageCode, 'exchange-terms-and-conditions')}
              >
                Exchange terms and conditions
              </a>
              <a className={s.link} href={getBitzlatoLink(languageCode, 'policy')}>
                Security Policy
              </a>
            </div>
          </div>
        </div>

        <div className={s.socialNetworks}>
          {languageCode === 'en' ? (
            <>
              <a
                className={s.socialNetwork}
                href="https://t.me/bitzlato"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram Channel"
              >
                <TelegramIcon />
              </a>
              <a
                className={s.socialNetwork}
                href="https://www.facebook.com/bitzlato"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                className={s.socialNetwork}
                href="https://www.instagram.com/bitzlato.en"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                className={s.socialNetwork}
                href="https://www.youtube.com/channel/UCz11WIy4qSWRrRVpEl0Txqg"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
              >
                <YoutubeIcon />
              </a>
              <a
                className={s.socialNetwork}
                href="https://twitter.com/bitzlato"
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <TwitterIcon />
              </a>
            </>
          ) : (
            <>
              <a
                className={s.socialNetwork}
                href="https://t.me/bitzlato"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram Channel"
              >
                <TelegramIcon />
              </a>
              <a
                className={s.socialNetwork}
                href="https://www.facebook.com/bitzlato.ru"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                className={s.socialNetwork}
                href="https://www.instagram.com/bitzlato"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                className={s.socialNetwork}
                href="https://www.youtube.com/c/BZRussia"
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
              >
                <YoutubeIcon />
              </a>
            </>
          )}
        </div>
      </div>
      <div className={s.copyright}>{t('page.body.landing.footer.rights')}</div>
    </>
  );
};
