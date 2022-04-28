import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectMobileDeviceState } from 'web/src/modules';
import { Text } from 'web/src/components/ui/Text';
import { Box } from 'web/src/components/ui/Box';
import { Switch } from 'web/src/components/form/Switch';
import { useT } from 'web/src/hooks/useT';
import VoucherIcon from 'web/src/assets/svg/VoucherIcon.svg';

const SWITCH_ID = 'withdraw-voucher';

interface Props {
  count: number;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const WithdrawVoucher: FC<Props> = ({ count = 0, value, onChange }: Props) => {
  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);

  const handleChange = () => {
    return onChange(!value);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ mobile: 'column', desktop: 'row' }}
      backgroundColor="infoBg"
      borderRadius="2x"
    >
      <Box
        display="flex"
        alignItems={{ mobile: 'flex-start', desktop: 'center' }}
        width={{ mobile: 'full', desktop: 'auto' }}
        pl={{ mobile: '5x' }}
        pr={{ mobile: '5x', desktop: '0' }}
        py={{ mobile: '4x', desktop: '5x' }}
      >
        <VoucherIcon />
        <Box
          as="label"
          htmlFor={SWITCH_ID}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          ml="6x"
          mr={{ desktop: '6x' }}
        >
          <Box as="span" fontSize="large" fontWeight="strong" color="text">
            {t('withdraw.use_voucher')}
          </Box>
          <Box as="span" fontSize="caption" mt="1x" color="text">
            {t('withdraw.use_voucher_notice')}
          </Box>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        width={{ mobile: 'full', desktop: 'auto' }}
        justifyContent={{ mobile: 'space-between', desktop: 'flex-start' }}
        px={{ mobile: '5x' }}
        py={{ mobile: '4x', desktop: '5x' }}
        borderTopWidth={isMobileDevice ? '1x' : '0'}
        borderColor="modalHeaderBorderBottom"
        borderTopStyle="solid"
      >
        <Box mr="3x">
          <Text variant="label" fontWeight="strong">
            {t('withdraw.active_vouchers')}:&nbsp;{count}
          </Text>
        </Box>
        <Box mt="1.5x">
          <Switch id={SWITCH_ID} checked={value} onChange={handleChange} />
        </Box>
      </Box>
    </Box>
  );
};
