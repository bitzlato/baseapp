import React from 'react';
import { loginWithRedirect } from 'src/helpers/auth0';

export const SignInAuth0: React.FC = () => {
  React.useEffect(() => {
    loginWithRedirect();
  }, []);
  return null;
};
