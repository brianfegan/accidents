import CONST from '../constants';

export function setChartType(chart_type) {
  return {type:CONST.SET_CHART_TYPE, chart_type}
}

export function setLocationFilters(filters) {
  return {type:CONST.SET_LOCATION_FILTERS, filters}
}
