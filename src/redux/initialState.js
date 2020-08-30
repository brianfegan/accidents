import annotatedData from '../data/annotatedData';
import CONST from '../constants';

export default function() {
  const years = ['2010', '2011', '2012', '2013', '2014'];

  // save an array of the bounds of every geojson feature
  const bounds = annotatedData.features.reduce((acc, curr) => {
    const coords = curr.geometry.coordinates[0].map(coord => coord.slice().reverse());
    return acc.concat(coords);
  }, []);

  // add accident_years to each feature property
  const features = annotatedData.features.map(feature => {
    const {properties} = feature;
    feature.properties.accident_years = [];
    years.forEach(year => {
      if (properties[year] !== null) feature.properties.accident_years.push(year);
    });
    return feature;
  });

  // save a dataset of accidents per year
  const accidents_per_year = annotatedData.features.reduce((acc, curr) => {
    const {properties} = curr;
    years.forEach(year => {
      if (properties[year] !== null) {
        acc[year] = !acc[year] ? properties[year] : acc[year] + properties[year];
      }
    });
    return acc;
  }, {});

  // compose initial filters data
  const filters = Object.keys(accidents_per_year).reduce((acc, year) => {
      acc[year] = true;
      return acc;
    }, {});

  return {
    accidents_per_year,
    bounds,
    chart_type: CONST.LINE,
    features,
    filters,
    years
  };
}
