import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Language } from 'web/src/types';
import AppStore from 'web/src/assets/svg/AppStore.svg';
import GooglePlay from 'web/src/assets/svg/GooglePlay.svg';
import * as s from './FooterApps.css';

interface Props {
  language: Language;
}

export const FooterApps: FC<Props> = ({ language }) => {
  return (
    <Box className={s.root}>
      <Box
        as="a"
        href={`https://apps.apple.com/app/bitzlato/id1593165895?l=${language}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Bitzlato on the App Store"
      >
        <AppStore className={s.icon} />
      </Box>
      <Box
        as="a"
        href="https://play.google.com/store/apps/details?id=com.bitzlato.mobile"
        target="_blank"
        rel="noopener noreferrer"
        title="Bitzlato - Apps on Google Play"
      >
        <GooglePlay className={s.icon} />
      </Box>
    </Box>
  );
};
