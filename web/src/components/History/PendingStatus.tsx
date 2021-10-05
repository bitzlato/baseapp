import classNames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { Box } from '../Box';
import { Status } from './Status';

export const PendingStatus: React.FC = () => (
  <Box row justifyEnd as={Status} type="pending">
    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
  </Box>
);
