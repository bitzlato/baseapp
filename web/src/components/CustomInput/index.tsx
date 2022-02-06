import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import cn from 'classnames';

export interface CustomInputProps {
  type: string;
  label: React.ReactNode;
  defaultLabel?: string | undefined;
  handleChangeInput?: ((value: string) => void) | undefined;
  inputValue: string | number | undefined;
  handleFocusInput?: (() => void) | undefined;
  placeholder?: string | undefined;
  className?: string | undefined;
  classNameLabel?: string | undefined;
  classNameInput?: string | undefined;
  autoFocus?: boolean | undefined;
  onKeyPress?: ((event: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
  readOnly?: boolean | undefined;
  id?: string;
  handleClick?: ((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void) | undefined;
  isDisabled?: boolean | undefined;
  labelVisible?: boolean | undefined;
  autoComplete?: string | undefined;
  name?: string | undefined;
}

interface OnChangeEvent {
  target: {
    value: string;
  };
}
type Props = CustomInputProps;

class CustomInput extends React.Component<Props> {
  public render() {
    const {
      label,
      labelVisible,
      placeholder,
      defaultLabel,
      inputValue,
      classNameLabel,
      type,
      autoFocus,
      readOnly,
      id,
      handleClick,
      isDisabled,
      onKeyPress,
      autoComplete,
      name,
    } = this.props;

    return (
      <React.Fragment>
        <div className={cn('custom-input', this.props.className)}>
          <label className={classNameLabel}>
            {(labelVisible || inputValue) && (label || defaultLabel)}
          </label>
          <FormControl
            type={type}
            value={inputValue as string | number}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={this.props.handleFocusInput}
            onBlur={this.props.handleFocusInput}
            onChange={(e) => this.handleChangeValue(e)}
            readOnly={readOnly as boolean}
            id={id as string}
            onClick={handleClick}
            disabled={isDisabled as boolean}
            onKeyPress={onKeyPress}
            autoComplete={autoComplete}
            name={name}
          />
        </div>
      </React.Fragment>
    );
  }

  private handleChangeValue = (e: OnChangeEvent) => {
    this.props.handleChangeInput && this.props.handleChangeInput(e.target.value);
  };
}

export { CustomInput };
