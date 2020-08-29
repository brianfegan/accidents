import React from 'react';
import ReactDOM from 'react-dom';
import annotatedData from './data/annotatedData';
import 'normalize.css';
import './scss/global.scss';
import App from './components/App';

function domReady(callback) {
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? callback()
    : document.addEventListener('DOMContentLoaded', callback);
}

function init() {
  // reverse all the coords cause yeah
  // annotatedData.features.forEach(feature => {
  //   const coords = feature.geometry.coordinates[0];
  //   coords.forEach(coord => coord.reverse());
  // });

  const years = ['2010', '2011', '2012', '2013', '2014'];

  const data = {
    // add incident_years to each feature property
    features: annotatedData.features.map(feature => {
      const {properties} = feature;
      feature.properties.incident_years = [];
      years.forEach(year => {
        if (properties[year] !== null) feature.properties.incident_years.push(year);
      });
      return feature;
    }),

    // save a dataset of incidents per year
    years: annotatedData.features.reduce((acc, curr) => {
      const {properties} = curr;
      years.forEach(year => {
        if (properties[year] !== null) {
          acc[year] = !acc[year] ? properties[year] : acc[year] + properties[year];
        }
      });
      return acc;
    }, {}),

    // save an array of the bounds of every geojson feature
    bounds: annotatedData.features.reduce((acc, curr) => {
      const coords = curr.geometry.coordinates[0].map(coord => coord.slice().reverse());
      return acc.concat(coords);
    }, [])
  };
  console.log(data.features);
  console.log(data.years);
  console.log(data.bounds);

  ReactDOM.render(<App data={data} />, document.querySelector('#app'));
}

domReady(init);
