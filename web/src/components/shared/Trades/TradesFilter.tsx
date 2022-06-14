import { useMemo, useState, FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Button } from 'web/src/components/ui/Button';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import { TradeType } from 'web/src/modules/p2p/trade.types';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { useDebouncedCallback } from 'use-debounce';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { TradesParams } from 'web/src/hooks/data/useFetchP2PTrades';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { TextInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { parseNumeric } from 'web/src/helpers/parseNumeric';
import FilterIcon from 'web/src/assets/svg/FilterIcon.svg';

export const DEFAULT_FILTER: TradesParams = {
  onlyClosed: undefined,
  paymethod: undefined,
  type: undefined,
  partner: undefined,
  tradeId: undefined,
  limit: 15,
  skip: 0,
};

const INPUT_DEBOUNCE = 500;

const { type, onlyClosed, ...RESET_FILTER } = DEFAULT_FILTER;

interface Props {
  params: TradesParams;
  onChange: (v: Partial<TradesParams>) => void;
}

const FilterTradeType: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  const variants: Array<{ value: TradeType | undefined; label: string }> = useMemo(
    () => [
      { value: undefined, label: t('All') },
      { value: 'purchase', label: t('Purchase') },
      { value: 'selling', label: t('Selling') },
    ],
    [t],
  );

  return (
    <VariantSwitcher
      name="tradeType"
      target="form"
      variants={variants}
      value={params.type}
      onChange={(v) => onChange({ type: v, skip: 0 })}
    />
  );
};

const FilterControls: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  const [partner, setPartner] = useStateWithDeps(
    () => params.partner ?? DEFAULT_FILTER.partner ?? '',
    [params.partner],
  );
  const [paymethod, setPaymethod] = useStateWithDeps(
    () => params.paymethod ?? DEFAULT_FILTER.paymethod ?? '',
    [params.paymethod],
  );
  const [tradeId, setTradeId] = useStateWithDeps(
    () => params.tradeId ?? DEFAULT_FILTER.tradeId ?? '',
    [params.tradeId],
  );

  const handleFieldChangeDebounced = useDebouncedCallback(
    (value: string | number, key: keyof TradesParams) => {
      onChange({ [key]: value || DEFAULT_FILTER[key] });
    },
    INPUT_DEBOUNCE,
  );

  const handlePartnerChange = (value: string) => {
    setPartner(value);
    handleFieldChangeDebounced(value, 'partner');
  };

  const handlePaymethodChange = (value: string) => {
    setPaymethod(value);
    handleFieldChangeDebounced(value, 'paymethod');
  };

  const handleTradeIdChange = (value: string) => {
    const nvalue = parseNumeric(value);
    setTradeId(nvalue);
    handleFieldChangeDebounced(nvalue, 'tradeId');
  };

  return (
    <Box display="flex" flexDirection="column" gap="4x">
      <TextInput label={t('Partner')} value={partner} onChange={handlePartnerChange} />
      <TextInput label={t('Payment method')} value={paymethod} onChange={handlePaymethodChange} />
      <TextInput label={t('Trade number')} value={tradeId} onChange={handleTradeIdChange} />
    </Box>
  );
};

export const TradesFilter: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  return (
    <Box display="flex" flexDirection="column" gap="8x">
      <Box display="flex" flexDirection="column" gap="6x">
        <FilterTradeType params={params} onChange={onChange} />
        <FilterControls params={params} onChange={onChange} />
      </Box>
      <Button variant="outlined" color="secondary" onClick={() => onChange(RESET_FILTER)}>
        {t('Reset')}
      </Button>
    </Box>
  );
};

export const TradesFilterMobile: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  const [show, setShow] = useState(false);
  const [localParams, setLocalParams] = useState<TradesParams>(() => ({ ...params }));

  const updateParams = (v: Partial<TradesParams>) => {
    setLocalParams((prev) => ({ ...prev, ...v }));
  };

  const toggleModal = () => setShow(!show);

  const handleClickReset = () => {
    updateParams(RESET_FILTER);
    onChange(RESET_FILTER);
    toggleModal();
  };

  const handleClickApply = () => {
    onChange(localParams);
    toggleModal();
  };

  const handleClickCancel = () => {
    setLocalParams(params);
    toggleModal();
  };

  return (
    <>
      <Box display="flex" gap="4x">
        <Button onClick={toggleModal}>
          <FilterIcon />
        </Button>
      </Box>
      <Modal show={show} onClose={handleClickCancel}>
        <ModalHeader>{t('Filter')}</ModalHeader>
        <ModalBody>
          <Box display="flex" flexDirection="column" gap="6x">
            <FilterTradeType params={params} onChange={onChange} />
            <FilterControls params={localParams} onChange={updateParams} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box flexGrow={1} display="flex" flexDirection="column" gap="4x">
            <Button variant="text" color="secondary" onClick={handleClickReset}>
              {t('Reset')}
            </Button>
            <Button color="secondary" onClick={handleClickApply}>
              {t('Apply')}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClickCancel}>
              {t('Cancel')}
            </Button>
          </Box>
        </ModalFooter>
      </Modal>
    </>
  );
};
