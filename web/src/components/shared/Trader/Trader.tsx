import { FC, useState } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { Container } from 'web/src/components/Container/Container';
import { Box } from 'web/src/components/ui/Box';
import { Pagination } from 'web/src/components/ui/Pagination';
import { useUserAds } from 'web/src/hooks/data/useUserAds';
import { TraderAds } from 'web/src/components/shared/TraderAds/TraderAds';
import { TraderInfo } from 'web/src/components/traderInfo/TraderInfo';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { UserChat } from 'web/src/components/traderInfo/UserChat';
import { Notes } from 'web/src/components/traderInfo/Notes';
import { TraderStats } from 'web/src/components/traderStats/TraderStats';
import { MobileTraderHeader } from 'web/src/components/traderInfo/MobileHeader';
import { useT } from 'web/src/hooks/useT';
import * as s from './Trader.css';

interface UrlParams {
  name: string;
}

export const Trader: FC = () => {
  const t = useT();
  const { lang } = useAppContext();
  const { params } = useAdapterContext<UrlParams>();
  const { data = [], error, isValidating } = useUserAds({ publicName: params.name, lang });
  const [singleMode, setSingleMode] = useState('');

  if (error) {
    return null;
  }

  const onSingleMode = (name: string) => {
    setSingleMode(name);
  };

  if (singleMode === 'chat' || singleMode === 'notes') {
    const title = `${singleMode === 'chat' ? t('chatwith') : t('noteswith')} ${params.name}`;

    return (
      <Box
        display="flex"
        position="relative"
        flexDirection="column"
        flexGrow={1}
        height="full"
        mx="3x"
        pb="3x"
        className={s.singleContainer}
      >
        <MobileTraderHeader
          title={title}
          publicName={params.name}
          onGoBack={() => setSingleMode('')}
        />
        {singleMode === 'chat' && <UserChat publicName={params.name} />}
        {singleMode === 'notes' && <Notes publicName={params.name} />}
      </Box>
    );
  }

  return (
    <Container maxWidth="fullhd">
      <Box display="flex" p="8x" height="full" flexDirection={{ desktop: 'row', mobile: 'column' }}>
        <Box
          display="flex"
          backgroundColor="block"
          borderRadius="1.5x"
          marginRight={{ desktop: '6x' }}
          px={{ desktop: '6x' }}
          py={{ desktop: '5x' }}
          className={s.leftBlock}
        >
          <TraderInfo publicName={params.name} onSingleMode={onSingleMode} />
        </Box>
        <Box backgroundColor="block" py="5x" px="6x" borderRadius="1.5x" flexGrow={1}>
          <TraderStats publicName={params.name} desktopOnly />
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
