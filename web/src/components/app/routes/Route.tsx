import { ComponentType, FC, ReactNode, useMemo } from 'react';
import { RouteProps, Route as RouteBase } from 'react-router-dom';
import { CheckIsLoggedIn } from './CheckIsLoggedIn';
import { CheckIsAnonymous } from './CheckIsAnonymous';
import { Loading } from './Loading';

interface Props extends Omit<RouteProps, 'component' | 'children' | 'render'> {
  component: ComponentType;
  loading?: boolean;
  type?: 'base' | 'protected' | 'onlyAnonymous';
}

export const Route: FC<Props> = ({
  component: Component,
  loading = false,
  type = 'base',
  ...rest
}) => {
  const render = useMemo(() => {
    if (type === 'base') {
      return <Component />;
    }

    return (): ReactNode => {
      const Checker = type === 'protected' ? CheckIsLoggedIn : CheckIsAnonymous;

      return (
        <Checker>
          <Component />
        </Checker>
      );
    };
  }, [Component, type]);

  if (loading) {
    return <Loading />;
  }

  return <RouteBase {...rest}>{render}</RouteBase>;
};
