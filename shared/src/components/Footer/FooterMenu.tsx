import { Box } from 'shared/src/components/Box';
import { FC } from 'react';
import cn from 'classnames';

import * as s from './FooterMenu.css';

interface Props {
  section: string;
  title: string;
  active: boolean;
  onTitleClick?: (section: string) => void;
}

export const FooterMenu: FC<Props> = ({ children, section, title, active, onTitleClick }) => {
  const handleClick = () => {
    onTitleClick?.(section);
  };

  return (
    <>
      <Box className={s.title} display={['none', 'block']}>
        {title}
      </Box>
      <Box
        as="button"
        className={cn(s.title, s.chevron, active && s.chevronOpened)}
        type="button"
        display={['block', 'none']}
        onClick={handleClick}
      >
        {title}
      </Box>
      <Box className={cn(s.links, active && s.linksOpened)}>{children}</Box>
    </>
  );
};
