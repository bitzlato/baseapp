import { FC, useContext } from 'react';
import cn from 'classnames';
import Beta from 'web/src/assets/svg/Beta.svg';
import { Box } from 'web/src/components/ui/Box';
import BitzlatoLogoIconLight from 'web/src/assets/svg/BitzlatoLogoIconLight.svg';
import BitzlatoLogoIconDark from 'web/src/assets/svg/BitzlatoLogoIconDark.svg';
import { HeaderContext } from './HeaderContext';
import * as s from './Logo.css';

export const Logo: FC = () => {
  const {
    toMainPage = '/',
    theme,
    beta = true,
    logoDarkURL,
    logoLightURL,
  } = useContext(HeaderContext);

  return (
    <>
      <Box className={s.tablet} position="relative">
        <a href={toMainPage}>
          <img className={s.logo} alt="Logo" src={theme === 'dark' ? logoDarkURL : logoLightURL} />
          {beta && <Beta className={cn(s.beta, s.svg)} />}
        </a>
      </Box>
      <Box className={s.mobile} position="relative">
        <a href={toMainPage}>
          {theme === 'dark' ? <BitzlatoLogoIconDark /> : <BitzlatoLogoIconLight />}
        </a>
      </Box>
    </>
  );
};
