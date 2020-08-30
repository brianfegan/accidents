import React from "react";
//import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid,
  Typography
} from '@material-ui/core';
import Leaflet from "./Leaflet";


export default function ByLocation(props) {
  const {bounds, features, accidents_per_year} = props;
  const [state, setState] = React.useState({
    years: Object.keys(accidents_per_year).reduce((acc, year) => {
      acc[year] = true;
      return acc;
    }, {})
  });
  const handleChange = (event) => {
    const {years} = state;
    years[event.target.name] = event.target.checked;
    setState({years});
  };

  const {years} = state;
  const filteredYears = Object.keys(years).filter(year => years[year]);
  const filtered = features.filter(feature => {
    const {accident_years} = feature.properties;
    if (accident_years.length > 0) {
      for (let i=0; i<accident_years.length; i++) {
        const accident_year = accident_years[i];
        if (filteredYears.indexOf(accident_year) !== -1) return true;
      }
    }
    return false;
  });

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
          <FormLabel component="legend">Filter By Year</FormLabel>
          <FormGroup>
            {Object.keys(years).map(year => <FormControlLabel
              control={<Checkbox checked={years[year]} onChange={handleChange} name={year} />}
              label={year} key={year} />)}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid component="div" item xs={10}>
        <Typography component="h2"><b>{filtered.length}</b> Geographic Features With Accidents</Typography>
        <Leaflet bounds={bounds} features={filtered} />
      </Grid>
    </Grid>
  )
}
