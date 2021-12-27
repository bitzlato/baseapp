import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { Box } from 'src/components/Box/Box';
import { capitalize } from 'src/helpers/capitalize';

import s from './Card.postcss';

interface Props {
  className?: string;
  header: React.ReactNode;
  size?: 'md';
}

export const Card: React.FC<Props> = ({ className, header, size, children }) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);

  if (isMobileDevice) {
    return (
      <Box col spacing="sm" className={s.cardMobile}>
        <Box padding="3x" textColor="primary" bgColor="body" row justifyCenter>
          {header}
        </Box>
        <Box padding="3x" col spacing="2x" bgColor="body">
          {children}
        </Box>
      </Box>
    );
  }

  const c = cn(s.card, size && s[`card${capitalize(size)}`], className);

  return (
    <Box padding="2x" row justifyCenter>
      <Box grow col className={c} bgColor="body">
        <Box padding="3x" textColor="primary" className={s.cardHeader}>
          {header}
        </Box>
        <Box padding="3x" col spacing="2x">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
