import classNames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { Status } from './Status';

export const PendingStatus: React.FC = () => (
    <Status type="pending" className={classNames('cr-row', 'cr-justify-end')}>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
    </Status>
);
