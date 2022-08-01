import {
  ChangeEventHandler,
  ComponentProps,
  ElementType,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { Sprinkles } from 'web/src/theme/sprinkles.css';
import * as s from './EditInput.css';

type SprinklesKeys = keyof Sprinkles;

type InputProps = {
  prefix?: string | undefined;
  isError?: boolean | undefined;
  value: string;
  onChange?: ((value: string) => void) | undefined;
};

type Props<C extends ElementType = 'input'> = InputProps &
  Omit<ComponentProps<C>, keyof InputProps>;

export const EditInput: FC<Props> = ({
  prefix,
  isError = false,
  value,
  onChange,
  ...inputProps
}) => {
  const prefixRef = useRef<HTMLDivElement>(null);
  const [prefixPadding, setPrefixPadding] = useState(0);

  useEffect(() => {
    if (prefixRef.current) {
      setPrefixPadding(prefixRef.current.clientWidth);
    }
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Box className={s.container}>
      <Box
        ref={prefixRef}
        className={s.prefix}
        as="span"
        px="1.5x"
        fontSize="caption"
        fontWeight="regular"
        color="textMuted"
      >
        {prefix}
      </Box>

      <input
        className={cn(s.input, isError ? s.inputError : null)}
        style={{ paddingLeft: prefixPadding }}
        {...inputProps}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
};

type TextAreaProps<C extends ElementType = 'textarea'> = InputProps &
  Omit<ComponentProps<C>, keyof InputProps | SprinklesKeys>;

export const EditTextArea: FC<TextAreaProps> = ({
  className,
  prefix,
  rows = 3,
  isError = false,
  value,
  onChange,
  ...inputProps
}) => {
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Box
      as="textarea"
      className={cn(s.input, s.textarea, isError ? s.inputError : null, className)}
      rows={rows}
      display="block"
      width="full"
      {...inputProps}
      value={value}
      onChange={handleChange}
    />
  );
};
