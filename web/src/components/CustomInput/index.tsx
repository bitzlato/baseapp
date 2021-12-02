import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import cn from 'classnames';
import { cleanPositiveFloatInput } from 'src/helpers/cleanPositiveFloatInput';

export interface CustomInputProps {
  type: string;
  label: string;
  defaultLabel: string;
  handleChangeInput?: (value: string) => void;
  inputValue: string | number;
  handleFocusInput?: () => void;
  placeholder: string;
  className?: string;
  classNameLabel?: string;
  classNameInput?: string;
  autoFocus?: boolean;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  id?: string;
  handleClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  isDisabled?: boolean;
  labelVisible?: boolean;
  autoComplete?: string;
  name?: string;
  prepareNumber?: boolean;
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
      prepareNumber,
    } = this.props;

    const value = prepareNumber ? cleanPositiveFloatInput(`${inputValue}`) : inputValue;

    return (
      <React.Fragment>
        <div className={cn('custom-input', this.props.className)}>
          <label className={classNameLabel}>
            {(labelVisible || inputValue) && (label || defaultLabel)}
          </label>
          <FormControl
            type={type}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onFocus={this.props.handleFocusInput}
            onBlur={this.props.handleFocusInput}
            onChange={(e) => this.handleChangeValue(e)}
            readOnly={readOnly}
            id={id}
            onClick={handleClick}
            disabled={isDisabled}
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
