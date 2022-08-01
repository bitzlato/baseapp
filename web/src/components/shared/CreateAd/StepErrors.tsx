import { FC } from 'react';
import { Text } from 'web/src/components/ui/Text';

interface Props {
  errors: Record<string, string | null>;
}

export const StepErrors: FC<Props> = ({ errors }) => {
  const uniqueJoinedErrors = [...new Set(Object.values(errors))]
    .filter((error) => error)
    .join(', ');

  return (
    <Text variant="label" color="danger" fontWeight="strong">
      {uniqueJoinedErrors}
    </Text>
  );
};
