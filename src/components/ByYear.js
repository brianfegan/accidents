import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';
import Chart from "./Chart";
import {
  getAccidentsPerYear,
  getChartType,
  getYears
} from "../redux/selectors";
import { setChartType } from "../redux/actions";

export default function ByYear() {
  const accidents_per_year = useSelector(getAccidentsPerYear);
  const chart_type = useSelector(getChartType);
  const years = useSelector(getYears);
  const dispatch = useDispatch();
  const columns = ['Accidents'].concat(years.map(year => accidents_per_year[year]));
  const pie_columns = Object.keys(accidents_per_year).map(year => [year, accidents_per_year[year]]);
  const handleChange = event => dispatch(setChartType(event.target.value));
  return (
    <Grid
      component="div"
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
    >
      <Grid component="div" item xs={2}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Chart Type</FormLabel>
          <RadioGroup aria-label="chart type" name="chart_type" value={chart_type} onChange={handleChange}>
            <FormControlLabel value="line" control={<Radio />} label="Line" />
            <FormControlLabel value="bar" control={<Radio />} label="Bar" />
            <FormControlLabel value="pie" control={<Radio />} label="Pie" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid component="div" item xs={10}>
        <Chart years={years} columns={columns} pie_columns={pie_columns} type={chart_type} />
      </Grid>
    </Grid>
  )
}
