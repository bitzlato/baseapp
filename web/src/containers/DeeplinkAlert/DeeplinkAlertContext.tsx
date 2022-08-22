import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

interface DeeplinkAlertContextValue {
  alert: string | null;
  setAlert: Dispatch<SetStateAction<string | null>>;
}

const DeeplinkAlertContext = createContext(null as any as DeeplinkAlertContextValue);

export const useDeeplinkAlertContext = () =>
  useContext<DeeplinkAlertContextValue>(DeeplinkAlertContext);

interface Props {}

export const DeeplinkAlertProvider = ({ children }: PropsWithChildren<Props>) => {
  const [alert, setAlert] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      alert,
      setAlert,
    }),
    [alert, setAlert],
  );

  return <DeeplinkAlertContext.Provider value={value}>{children}</DeeplinkAlertContext.Provider>;
};
