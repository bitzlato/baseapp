import { FC, ReactNode } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { UserAdsAlert } from 'web/src/components/shared/UserAds/UserAdsAlert';
import * as s from './UserAdBlock.css';

interface Props {
  title: ReactNode;
  right?: ReactNode | undefined;
  error?: string | null | undefined;
  customError?: ReactNode | undefined;
}

export const UserAdBlock: FC<Props> = ({ title, children, right, error, customError }) => {
  return (
    <Box>
      <Box className={s.container[error ? 'error' : 'base']}>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Box
            as={Text}
            variant="title"
            fontWeight="strong"
            my={{ mobile: '2x', tablet: '0' }}
            mr="2x"
          >
            {title}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            flexGrow={1}
            my={{ mobile: '2x', tablet: '0' }}
          >
            {right}
          </Box>
        </Box>

        {children}
      </Box>

      {error
        ? customError || (
            <Box mt={{ mobile: '3x', tablet: '5x' }}>
              <UserAdsAlert theme="error">{error}</UserAdsAlert>
            </Box>
          )
        : null}
    </Box>
  );
};
