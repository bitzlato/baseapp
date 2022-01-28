import * as React from 'react';
import { useHistory } from 'react-router';
import { Box } from 'src/components/Box/Box';
import { Button } from 'src/components/Button/Button';
import { useT } from 'src/hooks/useT';
import type { SelectOption } from 'src/components/Select/Select';

interface Props {
  currency: string;
  options: SelectOption[];
}

const WalletsButtonsComponent: React.FC<Props> = ({ currency, options }) => {
  const t = useT();
  const history = useHistory();
  return (
    <Box row spacing justify="around" className="cr-mobile-wallets-buttons">
      {options.map((d) => (
        <Button
          key={d.value}
          variant="primary-outline"
          onClick={() => history.push(`/wallets/${currency.toLowerCase()}/${d.value}`)}
        >
          {t(d.label)}
        </Button>
      ))}
    </Box>
  );
};

export const WalletsButtons = React.memo(WalletsButtonsComponent);
