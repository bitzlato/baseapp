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

export const Footer: FC = () => {
    const t = useT();
    const languageCode = useSelector(selectCurrentLanguage);

    return (
        <>
            <div className={s.footer}>
                <div className={s.links}>
                    <Link className={s.link} to="/trading">
                        {t('page.body.landing.footer.exchange')}
                    </Link>
                    <Link className={s.link} to="/wallets">
                        {t('page.body.landing.footer.wallets')}
                    </Link>
                    <Link className={s.link} to="/fees">
                        {t('page.body.landing.footer.fees')}
                    </Link>
                </div>
                <div className={s.links}>
                    <Link className={s.link} to="/">
                        {t('page.body.landing.footer.faq')}
                    </Link>
                    <Link className={s.link} to="/">
                        {t('page.body.landing.footer.support')}
                    </Link>
                    <Link className={s.link} to="/">
                        {t('page.body.landing.footer.privacy')}
                    </Link>
                </div>
                <div className={s.links}>
                    <Link className={s.link} to="/">
                        {t('page.body.landing.footer.about')}
                    </Link>
                    <Link className={s.link} to="/">
                        {t('page.body.landing.footer.community')}
                    </Link>
                    <Link className={s.link} to="/">
                        {t('page.body.landing.footer.info')}
                    </Link>
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
