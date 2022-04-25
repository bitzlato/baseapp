import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { CopyIcon } from 'src/assets/icons/CopyIcon';
import QRIcon from 'src/assets/svg/QRIcon.svg';
import { useT } from 'src/hooks/useT';
import { copy } from 'web/src/helpers/copy';
import { alertPush } from 'web/src/modules/public/alert/actions';
import { IconButton } from 'web/src/components/IconButton/IconButton';
import { Box } from 'web/src/components/Box/Box';
import { TextInput } from 'web/src/components/Input/TextInput';
import { Tooltip } from 'web/src/components/ui/Tooltip';
import { QRCode } from 'web/src/components/QRCode';
import { walletAddressButtons, walletAddressInput } from './WalletAddress.css';

interface Props {
  value: string;
  className?: string | undefined;
  fieldId: string;
  disabled?: boolean | undefined;
  label?: string | undefined;
  onCopy?: (() => void) | undefined;
}

export const WalletAddress: FC<Props> = ({
  value,
  className,
  disabled,
  fieldId,
  label,
  onCopy,
}) => {
  const t = useT();
  const dispatch = useDispatch();

  const handleShowQR = () => {};

  const handleCopy = () => {
    copy(fieldId);
    if (onCopy) {
      onCopy();
    } else {
      dispatch(alertPush({ message: ['Successfully copied'], type: 'success' }));
    }
  };

  const handleChange = () => {};

  return (
    <Box position="relative" className={className}>
      <TextInput
        className={walletAddressInput}
        id={fieldId}
        readOnly
        value={value}
        onChange={handleChange}
        label={label}
      />
      <div className={walletAddressButtons}>
        <Tooltip label={<QRCode dimensions={118} data={value} />} placement="top">
          <div>
            <IconButton noFill onClick={handleShowQR} disabled={disabled} title={t('Show QR-code')}>
              <QRIcon />
            </IconButton>
          </div>
        </Tooltip>
        <IconButton
          onClick={handleCopy}
          disabled={disabled}
          title={t('page.body.profile.content.copyLink')}
        >
          <CopyIcon />
        </IconButton>
      </div>
    </Box>
  );
};
