import { FC, useState, ReactNode, useMemo } from 'react';
import { TabsContext } from 'src/components/Tabs';

type Props = {
  children?: ReactNode | undefined;
} & (
  | {
      // uncontrolled
      defaultValue: string;
    }
  | {
      // controlled
      value: string;
      onSelectionChange: (value: string) => void;
    }
);

export const Tabs: FC<Props> = (props: Props) => {
  const defaultValue = 'defaultValue' in props ? props.defaultValue : undefined;
  const { children } = props;

  const [currentTab, setCurrentTab] = useState(defaultValue);
  const contextValue = useMemo(
    () =>
      'value' in props
        ? {
            currentTab: props.value,
            setCurrentTab: props.onSelectionChange,
          }
        : {
            currentTab,
            setCurrentTab,
          },
    'value' in props ? [props.value, props.onSelectionChange] : [currentTab],
  );

  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
};
