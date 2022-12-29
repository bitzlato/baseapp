import { createContext, FC, useMemo } from 'react';
import { Box, BoxProps } from 'web/src/components/ui/Box';

interface FieldContextValue {
  isInvalid: boolean;
}

export const FieldContext = createContext<FieldContextValue>({
  isInvalid: false,
});

interface FieldProps extends BoxProps<'div'> {
  isInvalid?: boolean | undefined;
}

export const Field: FC<FieldProps> = ({ isInvalid = false, ...props }) => {
  const value = useMemo(() => ({ isInvalid }), [isInvalid]);

  return (
    <FieldContext.Provider value={value}>
      <Box as="div" display="flex" flexDirection="column" gap="2x" {...props} />
    </FieldContext.Provider>
  );
};
