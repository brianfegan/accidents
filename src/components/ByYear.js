import React from "react";
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

export default function ByYear(props) {
  const [value, setValue] = React.useState('line');

  const {incidents_per_year} = props;
  const years = Object.keys(incidents_per_year);
  const columns = ['Incidents'].concat(years.map(year => incidents_per_year[year]));
  const pie_columns = Object.keys(incidents_per_year).map(year => [year, incidents_per_year[year]]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

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
          <RadioGroup aria-label="chart type" name="chart_type" value={value} onChange={handleChange}>
            <FormControlLabel value="line" control={<Radio />} label="Line" />
            <FormControlLabel value="bar" control={<Radio />} label="Bar" />
            <FormControlLabel value="pie" control={<Radio />} label="Pie" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid component="div" item xs={10}>
        <Typography component="h2">Accidents by Year</Typography>
        <Chart years={years} columns={columns} pie_columns={pie_columns} type={value} />
      </Grid>
    </Grid>
  )
}
