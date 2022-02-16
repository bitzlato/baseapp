import React, { ReactNode, useEffect, ComponentType, ReactElement } from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { useSelector } from 'react-redux';
import { selectUserInfo, RootState, selectUserLoggedIn } from 'src/modules';
import { ErrorWrapper } from 'src/containers/Errors';

let BugsnagErrorBoundary: ComponentType | undefined;
let bugsnagUser: { uid: string; email: string; username?: string | undefined } | undefined;
const bugsnagKey = process.env.REACT_APP_BUGSNAG_KEY;
if (typeof bugsnagKey === 'string' && bugsnagKey !== '') {
  Bugsnag.start({
    apiKey: bugsnagKey,
    appVersion: process.env.REACT_APP_BUGSNAG_VERSION!,
    releaseStage: process.env.REACT_APP_RELEASE_STAGE!,
    plugins: [new BugsnagPluginReact() as any],
    enabledReleaseStages: ['production', 'staging', 's2', 's3', 's4', 's5', 'sandbox'],
    onError: (event) => {
      if (bugsnagUser) {
        const { email, uid, username } = bugsnagUser;
        event.setUser(uid, email, username);
      }
    },
  });

  // @ts-expect-error
  global.bugsnag_notify_info = (message: string) => {
    Bugsnag.notify(message, (event) => {
      event.severity = 'info';
    });
  };

  BugsnagErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
}

interface Props {
  children: ReactNode;
}

const selectUser = (state: RootState) => {
  const isLoggedIn = selectUserLoggedIn(state);

  return isLoggedIn ? selectUserInfo(state) : undefined;
};

export const ErrorBoundary = BugsnagErrorBoundary
  ? ({ children }: Props): ReactElement => {
      const user = useSelector(selectUser);

      useEffect(() => {
        if (user) {
          const { email, uid, username } = user;
          bugsnagUser = { uid, email, username };
        } else {
          bugsnagUser = undefined;
        }

        return () => {
          bugsnagUser = undefined;
        };
      }, [user]);

      return BugsnagErrorBoundary ? (
        <BugsnagErrorBoundary>{children}</BugsnagErrorBoundary>
      ) : (
        <>{children}</>
      );
    }
  : ErrorWrapper;
