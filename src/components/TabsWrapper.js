import {
  AppBar,
  Tabs,
  Tab,
  Typography
} from "@material-ui/core";
import React from "react";
import TabPanel from "./TabPanel";
import Map from "./Map";


export default (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {bounds, features, years} = props.data;

  return (
    <>
      <AppBar position="static">
        <Tabs component="div" value={value} onChange={handleChange} >
          <Tab label="Incidents by Year - Bar" />
          <Tab label="Incidents by Year - Line" />
          <Tab label="Incidents by Location" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography component="div">Incidents by Year - Bar</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography component="div">Incidents by Year - Line</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Map bounds={bounds} features={features} />
      </TabPanel>
    </>
  );
}
