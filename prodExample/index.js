require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './helpers';
import { App } from './app';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);