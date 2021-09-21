import React, { ReactNode, useEffect, ComponentType, ReactElement } from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from 'src/modules';
import { ErrorWrapper } from 'src/containers/Errors';

let BugsnagErrorBoundary: ComponentType | undefined;
const bugsnagKey = process.env.REACT_APP_BUGSNAG_KEY;
if (typeof bugsnagKey === 'string' && bugsnagKey !== '') {
    Bugsnag.start({
        apiKey: bugsnagKey,
        appVersion: process.env.REACT_APP_BUGSNAG_VERSION,
        releaseStage: process.env.REACT_APP_RELEASE_STAGE,
        plugins: [new BugsnagPluginReact()],
        enabledReleaseStages: ['production', 'staging', 's2', 's3', 's4', 's5', 'sandbox'],
    });

    // @ts-expect-error
    global.bugsnag_notify_info = (message: string) => {
        Bugsnag.notify(message, event => {
            event.severity = 'info';
        });
    };

    BugsnagErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
}

interface Props {
    children: ReactNode;
}

export const ErrorBoundary = BugsnagErrorBoundary
    ? ({ children }: Props): ReactElement => {
          const user = useSelector(selectUserInfo);

          useEffect(() => {
              if (user) {
                  const { email, uid, username } = user;
                  Bugsnag.setUser(uid, email, username);
              } else {
                  Bugsnag.setUser(); // clear
              }
          }, [user]);

          return <BugsnagErrorBoundary>{children}</BugsnagErrorBoundary>;
      }
    : ErrorWrapper;
