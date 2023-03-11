import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';
import { StoreProvider } from './Store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <GoogleOAuthProvider clientId="689995252276-1pskm24p7g9fdc00q88u041uh9fk58k6.apps.googleusercontent.com">
    <Provider store={store}>
      <StoreProvider><App/></StoreProvider>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);
