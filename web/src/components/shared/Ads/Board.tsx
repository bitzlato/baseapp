import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Container } from '../../Container/Container';
import { Ads } from './Ads';
import { Filter } from './Filter';

interface Props {}

export const Board: FC<Props> = () => {
  return (
    <Container>
      <Box p="8x" display="flex" alignItems="flex-start">
        <Box backgroundColor="dropdown" p="6x" borderRadius="1.5x" marginRight="6x">
          <Filter />
        </Box>
        <Box backgroundColor="dropdown" p="6x" borderRadius="1.5x" flexGrow={1}>
          <Ads
            type="selling"
            currency="RUB"
            cryptocurrency="BTC"
            isOwnerVerificated
            isOwnerTrusted={false}
            isOwnerActive={false}
            paymethod={443}
          />
        </Box>
      </Box>
    </Container>
  );
};
