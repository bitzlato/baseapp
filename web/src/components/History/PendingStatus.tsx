import classNames from 'classnames';
import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { Box } from '../Box';
import { Label } from '../Label';

export const PendingStatus: React.FC = () => (
  <Box row justifyEnd as={Label} warningColor>
    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
  </Box>
);
