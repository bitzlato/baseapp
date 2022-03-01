import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

interface Props {
  checked: boolean;
  toggle2fa: () => void;
}

export const ProfileTwoFactorAuth: FC<Props> = ({ checked, toggle2fa }) => {
  const className = checked
    ? 'pg-profile-page__label-value__enabled'
    : 'pg-profile-page__label-value__disabled';

  return (
    <>
      <label className="pg-profile-page__label">
        <div>
          <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication" />
        </div>
        <span className={className}>
          {checked ? (
            <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.message.enable" />
          ) : (
            <FormattedMessage id="page.body.profile.header.account.content.twoFactorAuthentication.message.disable" />
          )}
        </span>
      </label>
      <Form>
        <Form.Check type="switch" id="2fa-switch" label="" onChange={toggle2fa} checked={checked} />
      </Form>
    </>
  );
};
