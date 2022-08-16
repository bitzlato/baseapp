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

const MIN_PX = 8;

type SprinklesKeys = keyof Sprinkles;

type InputProps = {
  className?: string | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
  isError?: boolean | undefined;
  value: string;
  onChange?: ((value: string) => void) | undefined;
};

type Props<C extends ElementType = 'input'> = InputProps &
  Omit<ComponentProps<C>, keyof InputProps>;

export const EditInput: FC<Props> = ({
  className,
  prefix,
  suffix,
  isError = false,
  value,
  onChange,
  ...inputProps
}) => {
  const prefixRef = useRef<HTMLDivElement>(null);
  const suffixRef = useRef<HTMLDivElement>(null);
  const [prefixPadding, setPrefixPadding] = useState(MIN_PX);
  const [suffixPadding, setSuffixPadding] = useState(MIN_PX);

  useEffect(() => {
    if (prefixRef.current) {
      setPrefixPadding(prefixRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (suffixRef.current) {
      setSuffixPadding(suffixRef.current.clientWidth);
    }
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Box className={cn(s.container, className, isError ? s.inputErrorContainer : null)}>
      {prefix ? (
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
      ) : null}

      <input
        className={cn(s.input, isError ? s.inputError : null, prefix ? s.inputWithPrefix : null)}
        style={{ paddingLeft: prefixPadding, paddingRight: suffixPadding }}
        {...inputProps}
        value={value}
        onChange={handleChange}
      />

      {suffix ? (
        <Box
          ref={suffixRef}
          className={s.suffix}
          as="span"
          px="1.5x"
          fontSize="caption"
          fontWeight="regular"
          color="textMuted"
        >
          {suffix}
        </Box>
      ) : null}
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
