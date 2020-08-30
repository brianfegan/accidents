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
  getBounds,
  getFilteredFeatures,
  getFilters
} from "../redux/selectors";
import { setLocationFilters } from "../redux/actions";


export default function ByLocation() {
  const years = useSelector(getFilters);
  const filtered_features = useSelector(getFilteredFeatures);
  const dispatch = useDispatch();
  const handleChange = event => dispatch(setLocationFilters({[event.target.name]: event.target.checked}));
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
        <Typography component="div"><b>{filtered_features.length}</b> Geographic Features With Accidents</Typography>
        <Typography component="div"><span style={{fontSize:'.9rem'}}>(Click on polygon for feature name)</span></Typography>
        <Leaflet bounds={useSelector(getBounds)} features={filtered_features} />
      </Grid>
    </Grid>
  )
}
