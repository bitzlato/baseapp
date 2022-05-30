import { FC } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Pagination } from 'web/src/components/ui/Pagination';
import { useUserAds } from 'web/src/hooks/data/useUserAds';
import { TraderAds } from 'web/src/components/shared/TraderAds/TraderAds';
import { TraderInfo } from 'web/src/components/traderInfo/TraderInfo';
import { useAdapterContext } from 'web/src/components/shared/Adapter';

interface UrlParams {
  name: string;
}

export const Trader: FC = () => {
  const { lang } = useAppContext();
  const { params } = useAdapterContext<UrlParams>();
  const { data = [], error, isValidating } = useUserAds({ publicName: params.name, lang });

  if (error) {
    return null;
  }

  return (
    <Container maxWidth="fullhd">
      <Box display="flex" p="8x" height="full">
        <Box
          display="flex"
          backgroundColor="dropdown"
          borderRadius="1.5x"
          marginRight="6x"
          style={{ width: '20%', minWidth: '380px' }}
        >
          <TraderInfo publicName={params.name} />
        </Box>
        <Box backgroundColor="dropdown" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
          <TraderAds data={data} isLoading={isValidating} />
          {data && !isValidating && (
            <Pagination
              page={1}
              total={0}
              perPage={15}
              onChange={() => {}}
              onChangePerPage={() => {}}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};
