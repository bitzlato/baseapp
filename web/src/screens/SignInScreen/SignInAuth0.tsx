import React from 'react';
import { loginAuth0 } from 'src/helpers/auth0';

export const SignInAuth0: React.FC = () => {
  loginAuth0();
  return null;
};
