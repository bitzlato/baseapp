import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { UserAdvertSource } from 'web/src/modules/p2p/types';
import TelegramIcon from 'web/src/assets/svg/TelegramPlainIcon.svg';
import BitzlatoIcon from 'web/src/assets/svg/BitzlatoIcon.svg';
import { LinkButton } from './LinkButton';

interface Props {
  links: UserAdvertSource['links'];
}

export const UserAdLinks: FC<Props> = ({ links }) => {
  const handleCopy = (url: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    } else {
      const temp = document.createElement('textarea');
      temp.value = url;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      gap="2x"
      width={{ mobile: 'full', tablet: 'auto' }}
    >
      {links.map((link) => {
        switch (link.type) {
          case 'telegram':
            return (
              <LinkButton
                key={link.type}
                icon={
                  <Box as="span" color="userAdButtonLinkTelegramLogoIcon">
                    <TelegramIcon width="15" height="15" viewBox="0 0 24 24" />
                  </Box>
                }
                onClick={() => handleCopy(link.url)}
              >
                Telegram
              </LinkButton>
            );

          case 'web':
            return (
              <LinkButton
                key={link.type}
                icon={
                  <Box as="span" color="userAdButtonLinkBzLogoIcon">
                    <BitzlatoIcon />
                  </Box>
                }
                onClick={() => handleCopy(link.url)}
              >
                Bitzlato
              </LinkButton>
            );

          default:
            return null;
        }
      })}
    </Box>
  );
};
