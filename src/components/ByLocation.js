import React from "react";
import { useDispatch, useSelector } from 'react-redux';
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
import {
  getAccidentsPerYear,
  getBounds,
  //getFiltersFeatures,
  getFiltersYears
} from "../redux/selectors";
import { setLocationFilters } from "../redux/actions";


export default function ByLocation(props) {
  const years = useSelector(getFiltersYears);
  const dispatch = useDispatch();
  const {features} = props;

  const handleChange = event =>
    dispatch(setLocationFilters({[event.target.name]: event.target.checked}));

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
        <Leaflet bounds={useSelector(getBounds)} features={filtered} />
      </Grid>
    </Grid>
  )
}
