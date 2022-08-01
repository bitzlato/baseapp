import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Stack } from 'web/src/components/ui/Stack';
import { Button } from 'web/src/components/ui/Button';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useCreateAdFormContext } from './CreateAdFormContext';
import * as s from './StepType.css';

interface Props {
  onSubmit: () => void;
}

export const StepType: FC<Props> = ({ onSubmit }) => {
  const { t } = useAdapterContext();
  const { types, updateFormValues } = useCreateAdFormContext();

  return (
    <Box display="flex" flexDirection="column" gap="4x" pb="6x">
      <Text variant="label">{t('createAd.type.label')}</Text>

      <Stack
        display="flex"
        alignItems={{ mobile: 'stretch', tablet: 'center' }}
        direction={{ mobile: 'column', tablet: 'row' }}
        marginRight={{ mobile: '0', tablet: '4x' }}
        marginBottom={{ mobile: '4x', tablet: '0' }}
      >
        {types.map(({ title, value }) => {
          return (
            <Box key={value} className={s.submitContainer}>
              <Button
                fullWidth
                onClick={() => {
                  updateFormValues({ type: value });
                  onSubmit();
                }}
              >
                {title}
              </Button>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
