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


export default function Map(props) {
  const {bounds, features, incidents_per_year} = props;
  const [state, setState] = React.useState({
    years: Object.keys(incidents_per_year).reduce((acc, year) => {
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
    const {incident_years} = feature.properties;
    if (incident_years.length > 0) {
      for (let i=0; i<incident_years.length; i++) {
        const incident_year = incident_years[i];
        if (filteredYears.indexOf(incident_year) !== -1) return true;
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
