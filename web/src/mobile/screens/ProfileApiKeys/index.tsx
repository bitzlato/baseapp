import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { Pagination } from '../../../components';
import { useApiKeysFetch } from '../../../hooks';
import {
  apiKeyCreateFetch,
  ApiKeyDataInterface,
  apiKeyDeleteFetch,
  apiKeys2FAModal,
  apiKeyUpdateFetch,
  RootState,
  selectUserInfo,
} from '../../../modules';
import {
  selectApiKeys,
  selectApiKeysFirstElemIndex,
  selectApiKeysLastElemIndex,
  selectApiKeysModal,
  selectApiKeysNextPageExists,
} from '../../../modules/user/apiKeys/selectors';
import { AddIcon } from '../../assets/images/AddIcon';
import { ApiKeysItem, Subheader } from '../../components';
import { ApiKeyModal } from 'web/src/containers/ProfileApiKeys/ApiKeyModal';

const ProfileApiKeysMobileScreenComponent: React.FC = () => {
  const [itemToUpdate, setItemToUpdate] = React.useState<ApiKeyDataInterface | undefined>();
  const [currentPageIndex, setPageIndex] = React.useState(0);
  const [currentAction, setCurrentAction] = React.useState('');
  const [show2FAModal, setShow2FAModal] = React.useState(false);
  const [showCreatedApiKeyModal, setShowCreatedApiKeyModal] = React.useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();
  const history = useHistory();
  const apiKeys = useSelector(selectApiKeys);
  const apiKeysModal = useSelector(selectApiKeysModal) || { action: '' };
  const user = useSelector(selectUserInfo);
  const firstElemIndex = useSelector((state: RootState) => selectApiKeysFirstElemIndex(state, 4));
  const lastElemIndex = useSelector((state: RootState) => selectApiKeysLastElemIndex(state, 4));
  const nextPageExists = useSelector(selectApiKeysNextPageExists);
  useApiKeysFetch(currentPageIndex, 4);

  const onClickPrevPage = () => {
    setPageIndex(currentPageIndex - 1);
  };

  const onClickNextPage = () => {
    setPageIndex(currentPageIndex + 1);
  };

  const handleCreateApiKey = (code2FA: string, shouldFetch: boolean) => {
    if (shouldFetch) {
      const payload = {
        totp_code: code2FA,
      };
      dispatch(apiKeyCreateFetch(payload));
    }
  };

  const handleUpdateApiKey = (code2FA: string, shouldFetch: boolean) => {
    if (shouldFetch && itemToUpdate) {
      const payload = {
        totp_code: code2FA,
        apiKey: {
          ...itemToUpdate,
          state: itemToUpdate.state === 'active' ? 'disabled' : 'active',
        },
      };
      dispatch(apiKeyUpdateFetch(payload));
    }
  };

  const handleDeleteApiKey = (code2FA: string, shouldFetch: boolean) => {
    if (shouldFetch && itemToUpdate) {
      const payload = {
        totp_code: code2FA,
        kid: itemToUpdate.kid,
      };
      dispatch(apiKeyDeleteFetch(payload));
    }
  };

  const handleTriggerAction = (code2FA: string, shouldFetch: boolean = true) => {
    switch (currentAction) {
      case 'create':
        handleCreateApiKey(code2FA, shouldFetch);
        break;
      case 'update':
        handleUpdateApiKey(code2FA, shouldFetch);
        break;
      case 'delete':
        handleDeleteApiKey(code2FA, shouldFetch);
        break;
      default:
        break;
    }

    setShow2FAModal(false);
    setItemToUpdate(undefined);
    setCurrentAction('');
  };

  const handleSetApiKeyProcess = (actionToSet: string, item?: ApiKeyDataInterface) => {
    setShow2FAModal((state) => !state);

    switch (actionToSet) {
      case 'create':
        setCurrentAction('create');
        break;
      case 'update':
        setItemToUpdate(item);
        setCurrentAction('update');
        break;
      case 'delete':
        setItemToUpdate(item);
        setCurrentAction('delete');
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    if (apiKeysModal.action === 'createSuccess' && !showCreatedApiKeyModal) {
      setShowCreatedApiKeyModal(true);
      dispatch(apiKeys2FAModal({ active: false }));
    }
  }, [dispatch, showCreatedApiKeyModal, apiKeysModal.action]);

  return (
    <>
      <Subheader
        title={intl.formatMessage({ id: 'page.mobile.profile.apiKeys.title' })}
        backTitle={intl.formatMessage({ id: 'page.body.profile.header.account' })}
        onGoBack={() => history.push('/profile')}
      />
      <div className="pg-mobile-profile-api-keys-screen">
        {user.otp ? (
          <div
            className="pg-mobile-profile-api-keys-screen__create"
            onClick={() => handleSetApiKeyProcess('create')}
          >
            <AddIcon />
          </div>
        ) : null}
        <div className="pg-mobile-profile-api-keys-screen__list">
          {user.otp && apiKeys.length ? (
            <>
              {apiKeys.map((apiKey, index) => (
                <ApiKeysItem
                  key={index}
                  index={index}
                  item={apiKey}
                  handleUpdateKey={(item) => handleSetApiKeyProcess('update', item)}
                  handleDeleteKey={(item) => handleSetApiKeyProcess('delete', item)}
                />
              ))}
              <Pagination
                firstElemIndex={firstElemIndex}
                lastElemIndex={lastElemIndex}
                page={currentPageIndex}
                nextPageExists={nextPageExists}
                onClickPrevPage={onClickPrevPage}
                onClickNextPage={onClickNextPage}
              />
            </>
          ) : (
            <span className="no-data">{intl.formatMessage({ id: 'page.noDataToShow' })}</span>
          )}
        </div>
        {showCreatedApiKeyModal ? (
          <ApiKeyModal
            onClose={() => setShowCreatedApiKeyModal(false)}
            kid={apiKeysModal.apiKey?.kid ?? ''}
            secret={apiKeysModal.apiKey?.secret ?? ''}
          />
        ) : null}
        {show2FAModal ? (
          <TwoFactorModal onClose={() => setShow2FAModal(false)} onSend={handleTriggerAction} />
        ) : null}
      </div>
    </>
  );
};

export const ProfileApiKeysMobileScreen = React.memo(ProfileApiKeysMobileScreenComponent);
