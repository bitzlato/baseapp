import { useState, FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'web/src/components/ui/Modal';
import { AdvertType } from 'web/src/modules/p2p/types';
import { VariantSwitcher } from 'web/src/components/ui/VariantSwitcher';
import FilterIcon from 'web/src/assets/svg/FilterIcon.svg';
import { SelectCryptoCurrency } from './SelectCryptoCurrency';
import { SwitchField } from './SwitchField';

export interface UserAdsFilterParams {
  type: AdvertType;
  cryptocurrency: string;
  onlyActive: boolean;
}

export const DEFAULT_FILTER: UserAdsFilterParams = {
  type: 'purchase',
  cryptocurrency: 'BTC',
  onlyActive: false,
};

interface FilterBuyTypeProps {
  params: UserAdsFilterParams;
  onChange: (v: Partial<UserAdsFilterParams>) => void;
}

const FilterByType: FC<FilterBuyTypeProps> = ({ params, onChange }) => {
  const t = useSharedT();

  const variants = [
    { value: 'purchase', label: t('Purchase') },
    { value: 'selling', label: t('Selling') },
  ];

  return (
    <VariantSwitcher
      name="advertType"
      target="form"
      variants={variants}
      value={params.type}
      onChange={(v) => onChange({ type: v as AdvertType })}
    />
  );
};

interface Props {
  params: UserAdsFilterParams;
  onChange: (v: Partial<UserAdsFilterParams>) => void;
}

const FilterControls: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  return (
    <Box display="flex" flexDirection="column" gap="8x">
      <Box display={{ mobile: 'none', desktop: 'block' }}>
        <SelectCryptoCurrency
          value={params.cryptocurrency}
          onChange={(value) => onChange({ cryptocurrency: value })}
        />
      </Box>

      <SwitchField
        id="filter.only_active"
        label={
          <Text variant="label" fontWeight="strong">
            {t('Only active')}
          </Text>
        }
        helpText={t('userAds.onlyActive.info')}
        value={params.onlyActive}
        alignItems="flex-start"
        onChange={(v) => onChange({ onlyActive: v })}
      />
    </Box>
  );
};

export const UserAdsFilter: FC<Props> = ({ params, onChange }) => {
  return (
    <Box display="flex" flexDirection="column" gap="6x">
      <FilterByType params={params} onChange={onChange} />
      <FilterControls params={params} onChange={onChange} />
    </Box>
  );
};

export const UserAdsFilterMobile: FC<Props> = ({ params, onChange }) => {
  const t = useSharedT();

  const [show, setShow] = useState(false);
  const [localParams, setLocalParams] = useState<UserAdsFilterParams>(() => ({ ...params }));

  const updateParams = (v: Partial<UserAdsFilterParams>) => {
    setLocalParams((prev) => ({ ...prev, ...v }));
  };

  const toggleModal = () => setShow(!show);

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
            <FilterByType params={localParams} onChange={updateParams} />
            <FilterControls params={localParams} onChange={updateParams} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Box flexGrow={1} display="flex" flexDirection="column" gap="4x">
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
