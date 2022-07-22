import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Skeleton } from 'web/src/components/ui/Skeleton';
import * as s from './WithdrawSkeleton.css';

export const WithdrawSkeleton: FC = () => {
  return (
    <>
      <Box fontSize="large" mb="4x">
        <Skeleton className={s.title} />
      </Box>

      <Box display="flex" gap="8x" mb="2x">
        <Box flex={1} bg="walletRadioItemBackground" borderRadius="1.5x" p="5x">
          <Box fontSize="medium" mb="2x">
            <Skeleton w="16x" />
          </Box>

          <Box fontSize="lead24">
            <Skeleton w="20x" />
          </Box>
        </Box>

        <Box flex={1} bg="walletRadioItemBackground" borderRadius="1.5x" p="5x">
          <Box fontSize="medium" mb="2x">
            <Skeleton w="16x" />
          </Box>

          <Box fontSize="lead24">
            <Skeleton w="20x" />
          </Box>
        </Box>

        <Box flex={1} />
      </Box>

      <Box fontSize="large" mb="12x">
        <Skeleton w="25x" />
      </Box>

      <Box fontSize="large" mb="4x">
        <Skeleton className={s.title} />
      </Box>

      <Box display="flex" gap="6x" mb="12x">
        <Box className={s.half}>
          <Skeleton w="full" h="12x" />
        </Box>
        <Box className={s.half}>
          <Skeleton w="full" h="12x" />
        </Box>
      </Box>

      <Box fontSize="large" mb="4x">
        <Skeleton className={s.title} />
      </Box>

      <Box display="flex" gap="8x" mb="12x">
        <Box flex={1} bg="walletRadioItemBackground" borderRadius="1.5x" px="4x" py="5x">
          <Box fontSize="medium" mb="2x">
            <Skeleton className={s.size06} />
          </Box>

          <Box fontSize="large">
            <Skeleton w="full" />
          </Box>
        </Box>

        <Box flex={1} bg="walletRadioItemBackground" borderRadius="1.5x" px="4x" py="5x">
          <Box fontSize="medium" mb="2x">
            <Skeleton className={s.size06} />
          </Box>

          <Box fontSize="large">
            <Skeleton w="full" />
          </Box>
        </Box>

        <Box flex={1} bg="walletRadioItemBackground" borderRadius="1.5x" px="4x" py="5x">
          <Box fontSize="medium" mb="2x">
            <Skeleton className={s.size06} />
          </Box>

          <Box fontSize="large">
            <Skeleton w="full" />
          </Box>
        </Box>
      </Box>

      <Box fontSize="large" mb="3x">
        <Skeleton className={s.title} />
      </Box>

      <Box display="flex" justifyContent="space-between" fontSize="medium">
        <Box className={s.half}>
          <Skeleton w="full" count={4} />
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Skeleton w="25x" h="11x" />
        </Box>
      </Box>
    </>
  );
};
