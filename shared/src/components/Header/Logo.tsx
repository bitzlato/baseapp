import { FC, useContext } from 'react';
import Beta from 'shared/src/assets/svg/Beta.svg';
import { Box } from 'shared/src/components/Box';

import * as s from './Logo.css';
import { HeaderContext } from './HeaderContext';

export const Logo: FC = () => {
  const {
    toMainPage = '/',
    theme,
    beta = true,
    logoDarkURL,
    logoLightURL,
    renderLinkComponent,
  } = useContext(HeaderContext);

  return (
    <Box position="relative" mr="3x">
      {renderLinkComponent({
        to: toMainPage,
        children: (
          <img className={s.logo} alt="Logo" src={theme === 'dark' ? logoDarkURL : logoLightURL} />
        ),
      })}
      {beta && (
        <Box className={s.beta}>
          <Beta className={s.svg} />
        </Box>
      )}
    </Box>
  );
};
