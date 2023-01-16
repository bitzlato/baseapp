import * as React from 'react';
import { Alert } from 'react-bootstrap';
import FadeIn from 'react-fade-in';
import { useDispatch, useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { alertDeleteByIndex, selectAlertState } from '../../modules';

export const Alerts: React.FC = () => {
  const dispatch = useDispatch();
  const t = useT();
  const alerts = useSelector(selectAlertState);

  return (
    <div className="pg-alerts">
      {alerts.alerts.map((w) =>
        w.message.map((msg, i) => (
          <FadeIn key={i}>
            <div onClick={() => dispatch(alertDeleteByIndex(i))}>
              <Alert variant={w.type === 'error' ? 'danger' : w.type}>
                {msg ? t(msg, w.payload) : null}
                {w.code ? ` ${w.code.toString(10)}` : null}
              </Alert>
            </div>
          </FadeIn>
        )),
      )}
    </div>
  );
};
