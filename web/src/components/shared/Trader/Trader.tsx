import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Pagination } from 'web/src/components/ui/Pagination';
import { useUserAds } from 'web/src/hooks/data/useUserAds';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { TraderAds } from 'web/src/components/shared/TraderAds/TraderAds';

interface UrlParams {
  name: string;
}

export const Trader: FC = () => {
  const { lang } = useAppContext();
  const params = useParams<UrlParams>();
  const t = useSharedT();

  const { data = [], error, isValidating } = useUserAds({ publicName: params.name, lang });

  if (error) {
    return null;
  }

  return (
    <Container maxWidth="fullhd">
      <Box display="flex" p="8x">
        <Box
          backgroundColor="dropdown"
          p="6x"
          borderRadius="1.5x"
          marginRight="6x"
          style={{ width: '20%', minWidth: '380px' }}
        >
          {t('Trader profile')}
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
