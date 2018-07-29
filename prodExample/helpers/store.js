import {
  createStore,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  createLogger
} from 'redux-logger';
import rootReducer from '../reducers';
const dev = process.env.NODE_ENV !== 'production';

const loggerMiddleware = createLogger();

const middleware = [
  thunkMiddleware,
  dev && loggerMiddleware
].filter(Boolean);

export const store = createStore(rootReducer,
  applyMiddleware(...middleware)
);