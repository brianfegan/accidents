import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { connect, Provider } from 'react-redux';
// TODO: remove import
import annotatedData from './data/annotatedData';
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
  const years = ['2010', '2011', '2012', '2013', '2014'];

  const data = {
    // add accident_years to each feature property
    features: annotatedData.features.map(feature => {
      const {properties} = feature;
      feature.properties.accident_years = [];
      years.forEach(year => {
        if (properties[year] !== null) feature.properties.accident_years.push(year);
      });
      return feature;
    }),

    // save a dataset of accidents per year
    accidents_per_year: annotatedData.features.reduce((acc, curr) => {
      const {properties} = curr;
      years.forEach(year => {
        if (properties[year] !== null) {
          acc[year] = !acc[year] ? properties[year] : acc[year] + properties[year];
        }
      });
      return acc;
    }, {}),
  };

  const store = createStore(
    reducers,
    initialState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  ReactDOM.render(
    <Provider store={store}>
      <App data={data} />
    </Provider>,
    document.querySelector('#app')
  );
  //ReactDOM.render(<App data={data} />, document.querySelector('#app'));
}

domReady(init);
