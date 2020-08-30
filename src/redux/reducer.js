import CONST from '../constants';

export default function (state, action = null) {
  switch (action.type) {
    case CONST.SET_CHART_TYPE: {
      return {...state, chart_type:action.chart_type};
    }

    case CONST.SET_LOCATION_FILTERS: {
      // some hacky object cloning due to lack of immutablejs
      const next_filters = JSON.parse(JSON.stringify(state.filters));
      const features = JSON.parse(JSON.stringify(state.features));
      // update with changed filter
      Object.assign(next_filters, action.filters);
      // get filtered_features
      const filteredYears = Object.keys(next_filters).filter(year => next_filters[year]);
      const filtered_features = features.filter(feature => {
        const {accident_years} = feature.properties;
        if (accident_years.length > 0) {
          for (let i=0; i<accident_years.length; i++) {
            const accident_year = accident_years[i];
            if (filteredYears.indexOf(accident_year) !== -1) return true;
          }
        }
        return false;
      });
      return {...state, filters:next_filters, filtered_features};
    }

    default:
      return state;
  }
}
