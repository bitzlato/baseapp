import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { StepErrors } from './StepErrors';
import * as s from './StepSubmitRow.css';

interface Props {
  title?: string | undefined;
  errors?: Record<string, string | null> | null | undefined;
  createAdvert?: boolean | undefined;
  onSubmit: () => void;
}

export const StepSubmitRow: FC<Props> = ({ title, errors, createAdvert = false, onSubmit }) => {
  const { t } = useAdapterContext();

  return (
    <Box className={s.container}>
      {errors ? <StepErrors errors={errors} /> : null}

      <Box className={s.submitContainer}>
        <Button
          fullWidth
          onClick={onSubmit}
          data-gtm-click={createAdvert ? 'create_advert' : undefined}
        >
          {title || t('Continue')}
        </Button>
      </Box>
    </Box>
  );
};
