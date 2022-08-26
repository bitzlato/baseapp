import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import FacebookIcon from 'web/src/assets/svg/FacebookIcon.svg';
import InstagramIcon from 'web/src/assets/svg/InstagramIcon.svg';
import TelegramIcon from 'web/src/assets/svg/TelegramIcon.svg';
import TwitterIcon from 'web/src/assets/svg/TwitterIcon.svg';
import YoutubeIcon from 'web/src/assets/svg/YoutubeIcon.svg';
import { SharedTranslateFn } from 'web/src/components/shared/sharedI18n';
import { Language } from 'web/src/types';
import * as s from './FooterSocials.css';

interface Props {
  t: SharedTranslateFn;
  language: Language;
}

export const FooterSocials: FC<Props> = ({ t, language }) => (
  <Box className={s.root}>
    <Box
      as="a"
      className={s.socialNetwork}
      href="https://t.me/bitzlato"
      target="_blank"
      rel="noopener noreferrer"
      title={t('Telegram Channel')}
    >
      <TelegramIcon width={18} height={18} />
    </Box>

    <Box
      as="a"
      className={s.socialNetwork}
      href={
        language === 'ru'
          ? 'https://www.facebook.com/bitzlato.ru'
          : 'https://www.facebook.com/bitzlato'
      }
      target="_blank"
      rel="noopener noreferrer"
      title={t('Facebook')}
    >
      <FacebookIcon width={18} height={18} />
    </Box>

    <Box
      as="a"
      className={s.socialNetwork}
      href={
        language === 'ru'
          ? 'https://www.instagram.com/bitzlato'
          : 'https://www.instagram.com/bitzlato.en'
      }
      target="_blank"
      rel="noopener noreferrer"
      title={t('Instagram')}
    >
      <InstagramIcon width={18} height={18} />
    </Box>

    <Box
      as="a"
      className={s.socialNetwork}
      href="https://twitter.com/bitzlato"
      target="_blank"
      rel="noopener noreferrer"
      title={t('Twitter')}
    >
      <TwitterIcon width={18} height={18} />
    </Box>

    <Box
      as="a"
      className={s.socialNetwork}
      href={
        language === 'ru'
          ? 'https://www.youtube.com/c/BZRussia'
          : 'https://www.youtube.com/channel/UCz11WIy4qSWRrRVpEl0Txqg'
      }
      target="_blank"
      rel="noopener noreferrer"
      title={t('YouTube')}
    >
      <YoutubeIcon width={18} height={18} />
    </Box>
  </Box>
);
