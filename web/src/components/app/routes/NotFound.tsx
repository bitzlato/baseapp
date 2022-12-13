import { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';

export const NotFound: FC = () => (
  <Route path="**">
    <Redirect to="/trading/" />
  </Route>
);
