import { FC, memo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import cn from 'classnames';

import * as s from './FooterMenuSection.css';

export enum FooterMenuSections {
  TRADING = 'trading',
  INFORMATION = 'information',
  PRODUCTS = 'products',
  DOCUMENTATION = 'documentation',
}

interface Props {
  section: FooterMenuSections;
  title: string;
  active: boolean;
  onTitleClick?: (section: FooterMenuSections) => void;
}

export const FooterMenuSection: FC<Props> = memo(
  ({ children, section, title, active, onTitleClick }) => {
    const handleClick = () => {
      onTitleClick?.(section);
    };

    return (
      <Box className={s.section}>
        <Box className={s.title} display={{ mobile: 'none', tablet: 'block' }}>
          {title}
        </Box>
        <Box as="button" type="button" className={s.titleButton} onClick={handleClick}>
          {title}
          <ChevronDownIcon className={s.chevron[active ? 'down' : 'right']} />
        </Box>
        <Box className={cn(s.links, active && s.linksOpened)}>{children}</Box>
      </Box>
    );
  },
);

FooterMenuSection.displayName = 'FooterMenuSection';
