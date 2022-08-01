import {
  FC,
  useMemo,
  useState,
  createContext,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useStateWithDeps } from 'web/src/hooks/useStateWithDeps';
import { UserAdvertDetails } from 'web/src/modules/p2p/types';
import { validateValues } from 'web/src/components/shared/CreateAd/validate';
import { useAdapterContext } from 'web/src/components/shared/Adapter';

export type EditableSteps = 'advert' | 'additional' | 'requisites' | 'terms';

export type EditAdFormValues = {
  rateValue: string | null;
  maxLimitForNewTrader: string | null;
  minAmount: string | null;
  maxAmount: string | null;
  verifiedOnly: boolean;
  liquidityLimit: boolean;
  individual: boolean;
  minPartnerTradesAmount: string | null;
  terms: string | null;
  details: string | null;
};

export type EditAdFormErrors = Partial<{
  [key in keyof EditAdFormValues]: string | null;
}>;

export type StepErrors = Partial<{
  [key in EditableSteps]: string | null;
}>;

interface UserAdEditContextValue {
  isSomeInEdit: () => boolean;
  isStepInEdit: (step: EditableSteps) => boolean;
  setStepInEdit: (step: EditableSteps) => void;
  removeStepInEdit: (step: EditableSteps) => void;
  formValues: EditAdFormValues;
  updateFormValues: (upd: Partial<EditAdFormValues>) => void;
  resetFormValues: (keys: Array<keyof EditAdFormValues>) => void;
  resetForm: () => void;
  formErrors: EditAdFormErrors | null;
  stepErrors: StepErrors | null;
  setStepErrors: Dispatch<SetStateAction<StepErrors | null>>;
}

export const UserAdEditContext = createContext(null as any as UserAdEditContextValue);

interface Props {
  ad: UserAdvertDetails;
}

export const UserAdEditContextProvider: FC<Props> = ({ ad, children }) => {
  const { t } = useAdapterContext();
  const initialValues: EditAdFormValues = useMemo(
    () => ({
      rateValue: ad.rateValue,
      minAmount: ad.minAmount,
      maxAmount: ad.maxAmount,
      verifiedOnly: !!ad.verifiedOnly,
      liquidityLimit: !!ad.liquidityLimit,
      individual: !ad.details,
      minPartnerTradesAmount: ad.minPartnerTradesAmount,
      maxLimitForNewTrader: ad.maxLimitForNewTrader,
      terms: ad.terms,
      details: ad.details,
    }),
    [ad],
  );
  const formKeys = Object.keys(initialValues) as Array<keyof EditAdFormValues>;
  const [formValues, setFormValues] = useStateWithDeps<EditAdFormValues>(
    () => initialValues,
    [initialValues],
  );
  const [stepsInEdit, setStepsInEdit] = useState<EditableSteps[]>([]);
  const [stepErrors, setStepErrors] = useState<StepErrors | null>(null);
  const [formErrors, setFormErrors] = useState<EditAdFormErrors | null>(null);

  const isSomeInEdit = useCallback(() => {
    return stepsInEdit.length > 0;
  }, [stepsInEdit]);

  const isStepInEdit = useCallback(
    (step: EditableSteps) => {
      return stepsInEdit.includes(step);
    },
    [stepsInEdit],
  );

  const setStepInEdit = useCallback((step: EditableSteps) => {
    setStepsInEdit((current) => [...new Set([...current, step])]);
  }, []);

  const removeStepInEdit = useCallback((step: EditableSteps) => {
    setStepsInEdit((current) => current.filter((s) => s !== step));
  }, []);

  const updateFormValues = useCallback(
    (upd: Partial<EditAdFormValues>) => {
      const next = { ...formValues, ...upd };
      setFormValues(next);
      const nextErrors = validateValues(next, formKeys, { t });
      setFormErrors(nextErrors);
    },
    [t, formKeys, formValues, setFormValues],
  );

  const resetFormValues = useCallback(
    (keys: Array<keyof EditAdFormValues>) => {
      const upd = keys.reduce((acc, curr) => ({ ...acc, [curr]: initialValues[curr] }), {});

      setFormValues({ ...formValues, ...upd });
    },
    [setFormValues, formValues, initialValues],
  );

  const resetForm = useCallback(() => {
    setFormValues(initialValues);
    setStepsInEdit([]);
  }, [setFormValues, initialValues]);

  const value = useMemo(
    () => ({
      isSomeInEdit,
      isStepInEdit,
      setStepInEdit,
      removeStepInEdit,
      formValues,
      updateFormValues,
      resetFormValues,
      resetForm,
      formErrors,
      stepErrors,
      setStepErrors,
    }),
    [
      isSomeInEdit,
      isStepInEdit,
      setStepInEdit,
      removeStepInEdit,
      formValues,
      updateFormValues,
      resetFormValues,
      resetForm,
      formErrors,
      stepErrors,
      setStepErrors,
    ],
  );

  return <UserAdEditContext.Provider value={value}>{children}</UserAdEditContext.Provider>;
};

export const useUserAdEditContext = () => useContext(UserAdEditContext);
