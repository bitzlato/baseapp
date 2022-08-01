import { FC, ReactNode } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { EditCheckbox } from './EditCheckbox';
import { EditInput, EditTextArea } from './EditInput';
import * as s from './UserAdField.css';
import { UserAdFormError } from './UserAdFormError';

type CommonProps = {
  isEdit?: boolean | undefined;
  label?: ReactNode | undefined;
  error?: string | null | undefined;
  readOnlyValue?: ReactNode | undefined;
};

type ConditionalProps =
  | {
      variant: 'text';
      readOnlyValue: string;
    }
  | {
      variant: 'input';
      value: string;
      onChange: (value: string) => void;
    }
  | {
      variant: 'textarea';
      rows?: number | undefined;
      placeholder?: string | undefined;
      value: string;
      onChange: (value: string) => void;
    }
  | {
      variant: 'rangeInput';
      prefixFrom?: string | undefined;
      errorFrom?: string | null | undefined;
      valueFrom: string;
      onChangeFrom: (value: string) => void;
      prefixTo?: string | undefined;
      errorTo?: string | null | undefined;
      valueTo: string;
      onChangeTo: (value: string) => void;
    }
  | {
      variant: 'checkbox';
      inputLabel: string;
      name: string;
      value: boolean;
      onChange: (value: boolean) => void;
    }
  | {
      variant: 'custom';
      value: ReactNode;
    };

type Props = CommonProps & ConditionalProps;

export const UserAdField: FC<Props> = ({
  isEdit = false,
  label,
  readOnlyValue,
  error,
  ...inputProps
}) => {
  const inputElement = (() => {
    switch (inputProps.variant) {
      case 'input':
        return (
          <EditInput
            isError={Boolean(error)}
            value={inputProps.value}
            onChange={inputProps.onChange}
          />
        );

      case 'textarea':
        return (
          <EditTextArea
            rows={inputProps.rows}
            placeholder={inputProps.placeholder}
            isError={Boolean(error)}
            value={inputProps.value}
            onChange={inputProps.onChange}
          />
        );

      case 'rangeInput':
        return (
          <Box display="flex" alignItems="center" justifyContent="flex-end" gap="1x">
            <EditInput
              prefix={inputProps.prefixFrom}
              isError={Boolean(inputProps.errorFrom)}
              value={inputProps.valueFrom}
              onChange={inputProps.onChangeFrom}
            />
            <EditInput
              prefix={inputProps.prefixTo}
              isError={Boolean(inputProps.errorTo)}
              value={inputProps.valueTo}
              onChange={inputProps.onChangeTo}
            />
          </Box>
        );

      case 'checkbox':
        return (
          <EditCheckbox
            name={inputProps.name}
            checked={inputProps.value}
            onChange={() => inputProps.onChange(!inputProps.value)}
          >
            {inputProps.inputLabel}
          </EditCheckbox>
        );

      case 'custom':
        return inputProps.value;

      default:
        return readOnlyValue;
    }
  })();

  if (!label) {
    return (
      <>
        {isEdit ? inputElement : readOnlyValue}
        {isEdit && error ? <UserAdFormError>{error}</UserAdFormError> : null}
      </>
    );
  }

  return (
    <Box className={s.container} mb={{ mobile: '2x', tablet: '0' }}>
      <Box
        as={Text}
        flexShrink={1}
        my={{ mobile: '1x', tablet: '1.5x' }}
        pr={{ mobile: '3x', tablet: '6x' }}
        color="textMuted"
      >
        {label}
      </Box>
      <Box
        className={s.value}
        flexShrink={0}
        my={{ mobile: '1x', tablet: '1.5x' }}
        ml="auto"
        fontSize="small"
        fontWeight="medium"
        color="text"
        textAlign="right"
      >
        <Box display="flex" justifyContent="flex-end">
          {isEdit ? inputElement : readOnlyValue}
        </Box>
        {isEdit && error ? <UserAdFormError>{error}</UserAdFormError> : null}
      </Box>
    </Box>
  );
};
