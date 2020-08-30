import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import 'normalize.css';
import './scss/global.scss';
import initialState from './redux/initialState';
import reducers from './redux/reducers';
import App from './components/App';

function domReady(callback) {
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? callback()
    : document.addEventListener('DOMContentLoaded', callback);
}

function init() {
  const store = createStore(
    reducers,
    initialState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#app')
  );
}

domReady(init);
