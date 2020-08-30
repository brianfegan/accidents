import CONST from '../constants';

export default function (state, action = null) {
  switch (action.type) {
    case CONST.SET_CHART_TYPE: {
      return {...state, chart_type:action.chart_type};
    }

    case CONST.SET_LOCATION_FILTERS: {
      const next_filters = JSON.parse(JSON.stringify(state.filters));
      Object.assign(next_filters.years, action.filters);
      return {...state, filters:next_filters};
    }

    default:
      return state;
  }
}