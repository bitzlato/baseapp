import { FC, useState } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'web/src/components/ui/Modal';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { useSetUserAdRate } from 'web/src/hooks/mutations/useSetUserAdRate';
import { AdvertType } from 'web/src/modules/p2p/types';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import { FetchError } from 'web/src/helpers/fetch';
import { Spinner } from 'web/src/components/ui/Spinner';
import { ChooseRate, RateType } from './ChooseRate';

interface Props {
  type: AdvertType;
  cryptoCurrency: string;
  currencyList: string[];
}

const getOptionValue = (option: string | undefined) => option || '';

export const SetRate: FC<Props> = ({ type, cryptoCurrency, currencyList }) => {
  const { t } = useAdapterContext();
  const { lang } = useAppContext();
  const [setUserAdRate, { status }] = useSetUserAdRate(lang);
  const [open, setOpen] = useState(false);
  const [selectedRateType, setSelectedRateType] = useState<RateType>('fixed');
  const [fixedValue, setFixedValue] = useState<string>('');
  const [percentValue, setPercentValue] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useStateWithDeps<string | undefined>(
    () => currencyList[0],
    [currencyList],
  );
  const [rateError, setRateError] = useState<string | null>(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFixedValueChange = (value: string) => {
    const nvalue = parseNumeric(value);
    setFixedValue(nvalue);

    setSelectedRateType('fixed');
  };

  const handlePercentValueChange = (value: string) => {
    const nvalue = parseNumeric(value, { allowNegativeNumeric: true });
    setPercentValue(nvalue);

    setSelectedRateType('floating');
  };

  const handleSubmit = async () => {
    try {
      if (!selectedCurrency) {
        return;
      }

      if (!fixedValue && !percentValue) {
        handleClose();
        return;
      }

      await setUserAdRate({
        type,
        cryptocurrency: cryptoCurrency,
        currency: selectedCurrency,
        rateValue: selectedRateType === 'fixed' ? fixedValue : null,
        ratePercent: selectedRateType === 'floating' ? percentValue : null,
      });

      setSelectedRateType('fixed');
      setPercentValue('');
      setFixedValue('');

      handleClose();
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.code === 481 && error.payload.code === 'AdsUpdatedToOften') {
          setRateError(t(error.payload.code));
        }
      }
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClick}>
        {t('Choose rate')}
      </Button>
      <Modal size="lg" show={open} onClose={handleClose}>
        <ModalHeader>{t('userAds.setRate.title')}</ModalHeader>
        <ModalBody>
          <SelectCustom
            value={selectedCurrency}
            options={currencyList}
            placeholder={t('Choose currency')}
            getOptionLabel={getOptionValue}
            getOptionValue={getOptionValue}
            onChange={(v) => setSelectedCurrency(v)}
          />

          <Box display="flex" flexDirection="column" my="4x" gap="4x">
            <ChooseRate
              currency={selectedCurrency}
              cryptoCurrency={cryptoCurrency}
              type={selectedRateType}
              fixed={fixedValue}
              percent={percentValue}
              onChangeType={setSelectedRateType}
              onChangeFixed={handleFixedValueChange}
              onChangePercent={handlePercentValueChange}
            />
          </Box>

          <Box display="flex" alignItems="center" py="4x" gap="4x">
            <Button color="secondary" variant="outlined" fullWidth onClick={handleClose}>
              {t('Cancel')}
            </Button>
            <Button color="secondary" fullWidth onClick={handleSubmit}>
              {status === 'running' ? <Spinner size="5x" /> : t('Set')}
            </Button>
          </Box>
        </ModalBody>
      </Modal>

      <Modal show={rateError !== null} onClose={() => setRateError(null)}>
        <Box px="6x" py="5x">
          <Text variant="title" textAlign="center">
            {t('Error')}
          </Text>
        </Box>
        <ModalBody>
          <Box mb="6x">
            <Text textAlign="center">{rateError}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="outlined" color="secondary" fullWidth onClick={() => setRateError(null)}>
            {t('OK')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
