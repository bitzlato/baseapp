import React, { FC, useContext, ReactNode } from 'react';
import { TabsContext } from 'src/components/Tabs';

interface Props {
  children: ReactNode;
  value: string;
}

export const TabPanel: FC<Props> = ({ children, value }: Props) => {
  const { currentTab } = useContext(TabsContext);

  return currentTab === value ? <>{children}</> : null;
};
