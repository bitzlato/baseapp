import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'web/src/components/ui/Button';

interface Props {
  to: string;
  active: boolean;
  disabled: boolean;
}

export const WalletNavigationItem: FC<Props> = ({ children, to, active, disabled }) => {
  if (disabled) {
    return (
      <Button color="clarified" disabled>
        {children}
      </Button>
    );
  }

  return (
    <Button as={Link} to={to} color="clarified" active={active} disabled={disabled}>
      {children}
    </Button>
  );
};
