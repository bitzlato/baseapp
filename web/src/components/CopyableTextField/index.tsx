import '@openware/cryptofont';
import cn from 'classnames';
import * as React from 'react';
import { InputGroup } from 'react-bootstrap';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import { useT } from 'src/hooks/useT';
import { CustomInput } from '../';
import { copy } from '../../helpers';
import { IconButton } from '../IconButton/IconButton';

export interface CopyableTextFieldProps {
    /**
     * Text value that will be copied to the clipboard
     */
    value: string;
    /**
     * Additional class name for styling. By default element receives `cr-button` class
     * @default empty
     */
    className?: string;
    /**
     * String value that makes copy field be unique
     */
    fieldId: string;
    /**
     * @default 'false'
     * If true, Button will be disabled.
     */
    disabled?: boolean;
    label?: string;
}

/**
 * Text field component with ability to copy inner text.
 */
export const CopyableTextField: React.FC<CopyableTextFieldProps> = ({ value, className, disabled, fieldId, label }) => {
    const t = useT();
    const handleCopy = () => copy(fieldId);

    return (
        <div className={cn('cr-copyable-text-field', className)}>
            <InputGroup>
                <CustomInput
                    id={fieldId}
                    readOnly
                    inputValue={value}
                    handleClick={handleCopy}
                    type="text"
                    isDisabled={disabled}
                    label={label || ''}
                    defaultLabel={label || ''}
                    placeholder={label || ''}
                />
                <InputGroup.Append>
                    <IconButton onClick={handleCopy} disabled={disabled} title={t('page.body.profile.content.copyLink')}>
                        <CopyIcon />
                    </IconButton>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
};
