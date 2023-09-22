import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
import store from './redux/store';
import Auth0ProviderWithHistory from './Auth0ProviderWithHistory';
import { AppProvider } from './visual/lettertemplate/Context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Auth0ProviderWithHistory>
      <Provider store={store}>
      <AppProvider>
        <BrowserRouter>

          <App />

        </BrowserRouter>
        </AppProvider>
      </Provider>
</Auth0ProviderWithHistory>
  </React.StrictMode>
);

