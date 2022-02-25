import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'web/src/components/Card/Card';
import { Pagination, Table } from 'web/src/components';
import { localeDate } from 'web/src/helpers/localeDate';
import { Container } from 'web/src/components/Container/Container';

import {
  apiKeyCreateFetch,
  ApiKeyDataInterface,
  apiKeyDeleteFetch,
  apiKeys2FAModal,
  apiKeysFetch,
  apiKeyUpdateFetch,
  RootState,
  selectUserInfo,
} from '../../modules';
import {
  selectApiKeys,
  selectApiKeysDataLoaded,
  selectApiKeysFirstElemIndex,
  selectApiKeysLastElemIndex,
  selectApiKeysModal,
  selectApiKeysNextPageExists,
  selectApiKeysPageIndex,
} from '../../modules/user/apiKeys/selectors';
import { useT } from 'web/src/hooks/useT';
import { TwoFactorModal } from '../ProfileAuthDetails/TwoFactorModal';
import { Box } from 'web/src/components/Box/Box';
import { ApiKeyModal } from './ApiKeyModal';

export const ProfileApiKeys: React.FC = () => {
  const t = useT();
  const dispatch = useDispatch();

  const apiKeys = useSelector(selectApiKeys);
  const dataLoaded = useSelector(selectApiKeysDataLoaded);
  const modal = useSelector(selectApiKeysModal);
  const user = useSelector(selectUserInfo);
  const pageIndex = useSelector(selectApiKeysPageIndex);
  const firstElemIndex = useSelector((s: RootState) => selectApiKeysFirstElemIndex(s, 4));
  const lastElemIndex = useSelector((s: RootState) => selectApiKeysLastElemIndex(s, 4));
  const nextPageExists = useSelector(selectApiKeysNextPageExists);

  useEffect(() => {
    dispatch(apiKeysFetch({ pageIndex: 0, limit: 4 }));
  }, []);

  const getTableHeaders = () => {
    return [
      t('page.body.profile.apiKeys.table.header.kid'),
      t('page.body.profile.apiKeys.table.header.algorithm'),
      t('page.body.profile.apiKeys.table.header.state'),
      '',
      t('page.body.profile.apiKeys.table.header.created'),
      t('page.body.profile.apiKeys.table.header.updated'),
      '',
    ];
  };

  const getTableData = (apiKeysData: ApiKeyDataInterface[]) => {
    return apiKeysData.map((item) => [
      item.kid,
      item.algorithm,
      <div className="pg-profile-page__api-keys__state">
        <span
          className={
            item.state === 'active'
              ? 'pg-profile-page__api-keys__state__active'
              : 'pg-profile-page__api-keys__state__disabled'
          }
        >
          {item.state}
        </span>
      </div>,
      <div className="pg-profile-page__api-keys__status">
        <Form>
          <Form.Check
            type="switch"
            id={`apiKeyCheck-${item.kid}`}
            label=""
            onChange={handleToggleStateKeyClick(item)}
            checked={item.state === 'active'}
          />
        </Form>
      </div>,
      localeDate(item.created_at, 'fullDate'),
      localeDate(item.updated_at, 'fullDate'),
      <span
        className="pg-profile-page__close"
        key={item.kid}
        onClick={() => handleDeleteKeyClick(item)}
      />,
    ]);
  };

  const handlCloseModal = () => {
    dispatch(apiKeys2FAModal({ active: false }));
  };

  const handleCreateKeyClick = () => {
    dispatch(apiKeys2FAModal({ active: true, action: 'createKey' }));
  };

  const handleCreateKey = (totp_code: string) => {
    dispatch(apiKeyCreateFetch({ totp_code }));
  };

  const handleToggleStateKeyClick = (apiKey: ApiKeyDataInterface) => () => {
    dispatch(apiKeys2FAModal({ active: true, action: 'updateKey', apiKey }));
  };

  const handleUpdateKey = (totp_code: string) => {
    dispatch(
      apiKeyUpdateFetch({
        totp_code,
        apiKey: { ...modal.apiKey!, state: isApiKeyActive ? 'disabled' : 'active' },
      }),
    );
  };

  const handleDeleteKeyClick = (apiKey: ApiKeyDataInterface) => {
    dispatch(apiKeys2FAModal({ active: true, action: 'deleteKey', apiKey }));
  };

  const handleDeleteKey = (totp_code: string) => {
    dispatch(apiKeyDeleteFetch({ kid: modal.apiKey?.kid ?? '', totp_code }));
  };

  const onClickPrevPage = () => {
    dispatch(apiKeysFetch({ pageIndex: Number(pageIndex) - 1, limit: 4 }));
  };

  const onClickNextPage = () => {
    dispatch(apiKeysFetch({ pageIndex: Number(pageIndex) + 1, limit: 4 }));
  };

  const isApiKeyActive = modal.apiKey?.state === 'active';
  const action = modal.action;

  return (
    <Container maxWidth="xl" my="4">
      <Card
        className="pg-profile-page__api-keys"
        header={
          <Box row justify="between">
            <h4>{t('page.body.profile.apiKeys.header')}</h4>
            {user.otp && dataLoaded && (
              <span className="pg-profile-page__pull-right" onClick={handleCreateKeyClick}>
                {t('page.body.profile.apiKeys.header.create')}
              </span>
            )}
          </Box>
        }
      >
        {!user.otp && (
          <p className="pg-profile-page__label pg-profile-page__text-center">
            {t('page.body.profile.apiKeys.noOtp')}
          </p>
        )}

        {user.otp &&
          dataLoaded &&
          (!apiKeys.length ? (
            <div className="pg-profile-page__label pg-profile-page__text-center">
              {t('page.body.profile.apiKeys.noKeys')}
            </div>
          ) : (
            <>
              <Table header={getTableHeaders()} data={getTableData(apiKeys)} />
              <Pagination
                firstElemIndex={firstElemIndex}
                lastElemIndex={lastElemIndex}
                page={pageIndex}
                nextPageExists={nextPageExists}
                onClickPrevPage={onClickPrevPage}
                onClickNextPage={onClickNextPage}
              />
            </>
          ))}

        {action === 'createKey' ? (
          <TwoFactorModal
            onClose={handlCloseModal}
            onSend={handleCreateKey}
            buttonText={t('page.body.profile.apiKeys.modal.btn.create')}
          />
        ) : action === 'createSuccess' ? (
          <ApiKeyModal
            onClose={handlCloseModal}
            kid={modal.apiKey?.kid ?? ''}
            secret={modal.apiKey?.secret ?? ''}
          />
        ) : action === 'updateKey' ? (
          <TwoFactorModal
            onClose={handlCloseModal}
            onSend={handleUpdateKey}
            buttonText={
              isApiKeyActive
                ? t('page.body.profile.apiKeys.modal.btn.disabled')
                : t('page.body.profile.apiKeys.modal.btn.activate')
            }
          />
        ) : action === 'deleteKey' ? (
          <TwoFactorModal
            onClose={handlCloseModal}
            onSend={handleDeleteKey}
            buttonText={t('page.body.profile.apiKeys.modal.btn.delete')}
          />
        ) : null}
      </Card>
    </Container>
  );
};
