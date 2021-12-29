import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { Box } from 'src/components/Box/Box';
import { capitalize } from 'src/helpers/capitalize';

import s from './Card.postcss';

interface Props {
  className?: string;
  header?: React.ReactNode;
  size?: 'md' | 'lg';
}

export const Card: React.FC<Props> = ({ className, header, size, children }) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);

  if (isMobileDevice) {
    return (
      <Box col spacing="sm" className={s.cardMobile}>
        {header && (
          <Box padding="3" textColor="primary" bgColor="body" row justify="center">
            {header}
          </Box>
        )}
        <Box padding="3" col spacing="2" bgColor="body">
          {children}
        </Box>
      </Box>
    );
  }

  const c = cn(s.card, size && s[`card${capitalize(size)}`], className);

  return (
    <Box padding="2" row justify="center">
      <Box grow col className={c} bgColor="body">
        {header ? (
          <>
            <Box padding="3" textColor="primary" className={s.cardHeader}>
              {header}
            </Box>
            <Box padding="3" col spacing="2">
              {children}
            </Box>
          </>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};
