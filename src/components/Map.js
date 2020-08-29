import React from "react";
//import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid
} from '@material-ui/core';
import Leaflet from "./Leaflet";


export default function Map(props) {
  const [state, setState] = React.useState({
    years: {
      2010: true,
      2011: true,
      2012: true,
      2013: true,
      2014: true
    }
  });
  const {bounds, features} = props;
  const handleChange = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.checked);
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
  console.log(filtered);
  console.log(filteredYears);

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
          {/*<FormLabel component="legend">{filtered.length} Locations</FormLabel>*/}
          <FormLabel component="legend">Filter By Year</FormLabel>
          <FormGroup>
            {Object.keys(years).map(year => <FormControlLabel
              control={<Checkbox checked={years[year]} onChange={handleChange} name={year} />}
              label={year} key={year} />)}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid component="div" item xs={10}>
        <Leaflet bounds={bounds} features={filtered} />
      </Grid>
    </Grid>
  )
}
