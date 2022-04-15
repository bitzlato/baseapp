import { FC, ReactNode } from 'react';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useFetchP2PApiKeys } from 'web/src/hooks/data/useFetchP2PApiKeys';
import { useT } from 'web/src/hooks/useT';
import { Table } from 'web/src/components/Table';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import { useSelector } from 'react-redux';
import { P2PPublicApiKeyModal } from './P2PPublicApiKeyModal';
import { P2PApiKeyActiveSwither } from './P2PApiKeyActiveSwither';
import { P2PCreateApiKey } from './P2PCreateApiKey';
import { P2PRenameApiKey } from './P2PRenameApiKey';
import { P2PDeleteApiKey } from './P2PDeleteApiKey';

export const P2PApiKeys: FC = () => {
  const t = useT();
  const user = useSelector(selectUserInfo);
  const { data, error } = useFetchP2PApiKeys();

  if (error) {
    return null; // TODO: Add throw and error boundary screen
  }

  let body: ReactNode;
  if (data === undefined) {
    body = (
      <Box display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
  } else if (data.length === 0) {
    body = <Text textAlign="center">{t('page.body.profile.apiKeys.noKeys')}</Text>;
  } else {
    const tableHeader = [
      t('page.body.profile.apiKeys.table.header.kid'),
      t('Key name'),
      '',
      t('page.body.profile.apiKeys.table.header.state'),
      t('Authorities'),
      '',
    ];
    const tableData = data.map((item) => [
      item.kid,
      item.name,
      <P2PApiKeyActiveSwither apiKey={item} />,
      <Text color={item.active ? 'success' : 'danger'} variant="caption">
        {item.active ? t('Active') : t('Inactive')}
      </Text>,
      [
        item.authorities.canRead && t('Read'),
        item.authorities.canTrade && t('Trade'),
        item.authorities.canTransfer && t('Transfer'),
      ]
        .filter(Boolean)
        .join(', ') || '-',
      <Box display="inline-flex">
        <Box mr="2x">
          <P2PRenameApiKey apiKey={item} />
        </Box>
        <Box mr="2x">
          <P2PPublicApiKeyModal publicKey={JSON.stringify(item.key)} />
        </Box>
        <P2PDeleteApiKey apiKey={item} />
      </Box>,
    ]);

    body = <Table header={tableHeader} data={tableData} />;
  }

  return (
    <div className="pg-profile-page__api-keys">
      {body}

      <Box display="flex" alignItems="center" mt="4x">
        <Box mr="4x">
          <P2PCreateApiKey keysCount={data?.length ?? 0} />
        </Box>

        {user.bitzlato_user && (
          <Text>
            P2P User ID: <strong>{user.bitzlato_user.id}</strong>
          </Text>
        )}
      </Box>
    </div>
  );
};
