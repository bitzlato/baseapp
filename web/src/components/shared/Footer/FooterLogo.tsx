import { FC } from 'react';
import cn from 'classnames';
import Beta from 'web/src/assets/svg/Beta.svg';
import { Box } from 'web/src/components/ui/Box';
import * as s from './FooterLogo.css';

interface Props {
  toMainPage?: string | undefined;
  logoURL: string;
}

export const FooterLogo: FC<Props> = ({ toMainPage = '/', logoURL }: Props) => {
  return (
    <Box position="relative">
      <Box as="a" href={toMainPage} display="block">
        <img className={s.logo} alt="Logo" src={logoURL} />
        <Beta className={cn(s.beta, s.svg)} />
      </Box>
    </Box>
  );
};
