import { FC, useContext, ReactNode } from 'react';
import cn from 'classnames';
import { TabsContext } from 'src/components/Tabs';

import s from './Tab.postcss';

interface Props {
  activeClassName?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
  size?: 'small' | 'medium' | 'large' | undefined;
  disabled?: boolean | undefined;
  value: string;
}

export const Tab: FC<Props> = ({
  activeClassName,
  children,
  className,
  size = 'medium',
  disabled = false,
  value,
}: Props) => {
  const { currentTab, setCurrentTab } = useContext(TabsContext);
  const isActive = currentTab === value;

  const handleClick = () => setCurrentTab(value);

  return (
    <button
      className={cn(
        {
          [s.tab]: true,
          [s.tabActive]: isActive,
          [s.tabSmall]: size === 'small',
          [s.tabMedium]: size === 'medium',
          [s.tabLarge]: size === 'large',
        },
        className,
        isActive && activeClassName,
      )}
      type="button"
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
