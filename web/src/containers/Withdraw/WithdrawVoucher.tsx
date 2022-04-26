import { FC } from 'react';
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

  const handleChange = () => {
    return onChange(!value);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="infoBg"
      p="5x"
      borderRadius="2x"
    >
      <Box display="flex" alignItems="center">
        <VoucherIcon />
        <Box
          as="label"
          htmlFor={SWITCH_ID}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          mx="6x"
        >
          <Box as="span" fontSize="large" fontWeight="strong">
            {t('withdraw.use_voucher')}
          </Box>
          <Box as="span" fontSize="caption" mt="1x">
            {t('withdraw.use_voucher_notice')}
          </Box>
        </Box>
      </Box>

      <Box display="flex" alignItems="center">
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
