// src/Auth0ProviderWithHistory.js
import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  return (
    <Auth0Provider
    domain="dev-nudi2ylmq34c2gze.us.auth0.com"
    clientId="3IfUVX4fiT2WMneNLKaH04mFDF9qZKjr"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
