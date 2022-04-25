import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'web/src/components/ui/Box';
import { useAds } from 'web/src/hooks/data/useFetchAds';
import { Container } from 'web/src/components/Container/Container';
import { Pagination } from 'web/src/components/ui/Pagination';
import { Adapter } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useFiatCurrencies } from 'web/src/hooks/data/useFetchP2PCurrencies';
import { Stack } from 'web/src/components/ui/Stack';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import { HelpIcon } from 'web/src/components/ui/HelpIcon';
import { Switch } from 'web/src/components/form/Switch';
import { Ads } from './Ads';
import { Filter } from './Filter';

interface Props {}
interface FilterValues {}

const ADS_PER_PAGE = 15;
const initialValues = {}; // TODO: get from sorage or use default values

export const Board: FC<Props> = () => {
  const t = useT();
  const { getFiatCurrency } = useFiatCurrencies();
  const { lang } = useAppContext();
  const [page, setPage] = useState(0);
  const [isOwnerActive, setIsOwnerActive] = useState(false);
  const fiatCode = 'RUB';
  const cryptoCode = 'BTC';
  const { data, error, isValidating, mutate } = useAds({
    limit: ADS_PER_PAGE,
    skip: page * ADS_PER_PAGE,
    lang,
    type: 'selling',
    currency: 'RUB',
    cryptocurrency: 'BTC',
    isOwnerVerificated: false,
    isOwnerTrusted: false,
    isOwnerActive,
  });

  if (error) {
    return null;
  }

  const handleChangePage = (value: number) => {
    setPage(value);
  };
  const handleChangeIsOwnerActive = () => setIsOwnerActive((prev) => !prev);
  const handleRefresh = () => mutate();

  return (
    <Adapter>
      <Container maxWidth="fullhd">
        <Box display="flex" justifyContent="space-between" mt="8x" px="8x">
          <Stack marginRight="4x">
            <Button as={Link} to="/" color="clarified" active>
              {t('AD Board')}
            </Button>
            <Button as={Link} to="/" color="clarified">
              {t('My adverts')}
            </Button>
            <Button as={Link} to="/" color="clarified">
              {t('My trades')}
            </Button>
          </Stack>

          <Stack marginRight="4x" alignItems="center">
            <Text>
              <Box as="label" htmlFor="only_active_users" mr="2x">
                {t('Active users')}
              </Box>
              <HelpIcon>{t('Active users')}</HelpIcon>
            </Text>
            <Switch
              id="only_active_users"
              checked={isOwnerActive}
              onChange={handleChangeIsOwnerActive}
            />
          </Stack>
        </Box>
        <Box display="flex" p="8x">
          <Box
            backgroundColor="dropdown"
            p="6x"
            borderRadius="1.5x"
            marginRight="6x"
            style={{ width: '20%', minWidth: '380px' }}
          >
            <Filter
              initialValues={initialValues}
              onChange={(filterValues: FilterValues) => console.log(filterValues)}
            />
          </Box>
          <Box backgroundColor="dropdown" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
            <Ads
              data={data?.data}
              fiatSign={getFiatCurrency(fiatCode).sign}
              cryptoSign={cryptoCode}
              isLoading={isValidating}
              onRefresh={handleRefresh}
            />
            {data && !isValidating && (
              <Pagination total={data.total} limit={ADS_PER_PAGE} onChange={handleChangePage} />
            )}
          </Box>
        </Box>
      </Container>
    </Adapter>
  );
};
