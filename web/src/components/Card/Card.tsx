import React from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'src/modules/public/globalSettings/selectors';
import { Box } from 'src/components/Box/Box';
import { capitalize } from 'src/helpers/capitalize';

import s from './Card.postcss';

interface Props {
  className?: string;
  outer?: React.ReactNode;
  header?: React.ReactNode;
  size?: 'md' | 'lg';
}

export const Card: React.FC<Props> = ({ className, outer, header, size, children }) => {
  const isMobileDevice = useSelector(selectMobileDeviceState);

  if (isMobileDevice) {
    return (
      <Box col spacing="sm" className={s.cardMobile}>
        {header && (
          <Box
            padding="3"
            row
            justify="center"
            textColor="primary"
            bgColor="body"
            className={s.cardHeader}
          >
            {header}
          </Box>
        )}
        <Box padding="3" col spacing="2" bgColor="body">
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box padding="4" row justify="center">
      <Box grow col spacing="4" className={cn(size && s[`card${capitalize(size)}`])}>
        {outer}
        <Box col className={cn(s.cardDesktop, className)} bgColor="body">
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
    </Box>
  );
};
