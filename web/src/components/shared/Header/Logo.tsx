import { FC, useContext } from 'react';
import cn from 'classnames';
import Beta from 'web/src/assets/svg/Beta.svg';
import { Box } from 'web/src/components/ui/Box';

import * as s from './Logo.css';
import { HeaderContext } from './HeaderContext';

export const Logo: FC = () => {
  const {
    toMainPage = '/',
    theme,
    beta = true,
    logoDarkURL,
    logoLightURL,
  } = useContext(HeaderContext);

  return (
    <Box position="relative">
      <a href={toMainPage}>
        <img className={s.logo} alt="Logo" src={theme === 'dark' ? logoDarkURL : logoLightURL} />
        {beta && <Beta className={cn(s.beta, s.svg)} />}
      </a>
    </Box>
  );
};
