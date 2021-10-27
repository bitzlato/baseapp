import * as React from 'react';
import { Currency } from '@trzmaxim/money';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';

interface Props {
  currency: Currency;
}

const WalletsButtonsComponent: React.FC<Props> = (props) => {
  const intl = useIntl();
  const history = useHistory();

  return (
    <div className="cr-mobile-wallets-buttons">
      <Button
        onClick={() => history.push(`/wallets/${props.currency.code.toLowerCase()}/deposit`)}
        size="lg"
        variant="success"
      >
        {intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' })}
      </Button>
      <Button
        onClick={() => history.push(`/wallets/${props.currency.code.toLowerCase()}/withdraw`)}
        size="lg"
        variant="danger"
      >
        {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw' })}
      </Button>
    </div>
  );
};

export const WalletsButtons = React.memo(WalletsButtonsComponent);
