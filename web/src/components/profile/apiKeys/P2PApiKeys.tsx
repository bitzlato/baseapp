import { FC, ReactNode, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Spinner } from 'web/src/components/ui/Spinner';
import { useFetchP2PApiKeys } from 'web/src/hooks/data/useFetchP2PApiKeys';
import { useT } from 'web/src/hooks/useT';
import { Container } from 'web/src/components/Container/Container';
import { Card } from 'web/src/components/Card/Card';
import { Table } from 'web/src/components/Table';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import CrossSmallIcon from 'web/src/assets/svg/CrossIcon.svg';
import { useP2PDeleteApiKey } from 'web/src/hooks/mutations/useP2PDeleteApiKey';
import { P2PCreateApiKeyModal } from './P2PCreateApiKeyModal';
import { P2PPublicApiKeyModal } from './P2PPublicApiKeyModal';
import { P2PApiKeyActiveSwither } from './P2PApiKeyActiveSwither';

export const P2PApiKeys: FC = () => {
  const t = useT();
  const { data, error } = useFetchP2PApiKeys();
  const [deleteApiKey] = useP2PDeleteApiKey();
  const [open, setOpen] = useState(false);

  if (error) {
    return null; // TODO: Add throw and error boundary screen
  }

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let body: ReactNode;
  if (data === undefined) {
    body = (
      <Box display="flex" justifyContent="center">
        <Spinner />
      </Box>
    );
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
      <Text color={item.active ? 'success' : 'danger'}>
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
          <P2PPublicApiKeyModal publicKey={JSON.stringify(item.key)} />
        </Box>
        <Box
          as={IconButton}
          display="flex"
          alignItems="center"
          onClick={() => deleteApiKey(item.kid)}
        >
          <Box as="span" mr="2x">
            <CrossSmallIcon width="16" height="16" />
          </Box>
          {t('page.body.profile.apiKeys.modal.btn.delete')}
        </Box>
      </Box>,
    ]);

    body = <Table header={tableHeader} data={tableData} />;
  }

  return (
    <Container maxWidth="xl" my="4">
      {/* TODO: remove use className="pg-profile-page__api-keys" */}
      <Card className="pg-profile-page__api-keys" header={<h4>{t('P2P API Keys')}</h4>}>
        {body}

        <Box mt="4x">
          <Button color="secondary" onClick={handleClick}>
            {t('Create API key')}
          </Button>
          {open && <P2PCreateApiKeyModal onClose={handleClose} />}
        </Box>
      </Card>
    </Container>
  );
};
