import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { TwoFactorModal } from 'web/src/containers/ProfileAuthDetails/TwoFactorModal';
import { Pagination } from '../../../components';
import { useApiKeysFetch } from '../../../hooks';
import {
  apiKeyCreateFetch,
  ApiKeyDataInterface,
  apiKeyDeleteFetch,
  apiKeys2FAModal,
  ApiKeyStateModal,
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
import { ApiKeysItem } from '../../components';
import { ApiKeyModal } from 'web/src/containers/ProfileApiKeys/ApiKeyModal';

const ProfileApiKeysMobileScreenComponent: React.FC = () => {
  const [currentPageIndex, setPageIndex] = React.useState(0);
  const dispatch = useDispatch();
  const intl = useIntl();
  const apiKeys = useSelector(selectApiKeys);
  const apiKeysModal = useSelector(selectApiKeysModal);
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

  const handlCloseModal = () => {
    dispatch(apiKeys2FAModal({ action: undefined }));
  };

  const handleTriggerAction = (totp_code: string) => {
    switch (apiKeysModal.action) {
      case 'createKey':
        dispatch(apiKeyCreateFetch({ totp_code }));
        break;

      case 'updateKey':
        dispatch(
          apiKeyUpdateFetch({
            totp_code,
            apiKey: {
              ...apiKeysModal.apiKey!,
              state: apiKeysModal.apiKey?.state === 'active' ? 'disabled' : 'active',
            },
          }),
        );
        break;

      case 'deleteKey':
        dispatch(
          apiKeyDeleteFetch({
            totp_code,
            kid: apiKeysModal.apiKey?.kid ?? '',
          }),
        );
        break;
    }
  };

  const handleSetApiKeyProcess = (
    action: ApiKeyStateModal['action'],
    apiKey?: ApiKeyDataInterface,
  ) => {
    dispatch(apiKeys2FAModal({ action, apiKey }));
  };

  return (
    <>
      <div className="pg-mobile-profile-api-keys-screen">
        {user.otp ? (
          <div
            className="pg-mobile-profile-api-keys-screen__create"
            onClick={() => handleSetApiKeyProcess('createKey')}
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
                  handleUpdateKey={(item) => handleSetApiKeyProcess('updateKey', item)}
                  handleDeleteKey={(item) => handleSetApiKeyProcess('deleteKey', item)}
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
        {apiKeysModal.action === 'createSuccess' ? (
          <ApiKeyModal
            onClose={handlCloseModal}
            kid={apiKeysModal.apiKey?.kid ?? ''}
            secret={apiKeysModal.apiKey?.secret ?? ''}
          />
        ) : apiKeysModal.action ? (
          <TwoFactorModal onClose={handlCloseModal} onSend={handleTriggerAction} />
        ) : null}
      </div>
    </>
  );
};

export const ProfileApiKeysMobileScreen = React.memo(ProfileApiKeysMobileScreenComponent);
