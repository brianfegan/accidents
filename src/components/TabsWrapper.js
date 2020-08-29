import {
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import React from "react";
import TabPanel from "./TabPanel";
import Map from "./Map";
import ByYear from "./ByYear";

export default (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {bounds, features, incidents_per_year} = props.data;

  return (
    <>
      <AppBar position="static">
        <Tabs component="div" value={value} onChange={handleChange} >
          <Tab label="Accidents by Year" />
          <Tab label="Accidents by Location" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ByYear incidents_per_year={incidents_per_year} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Map bounds={bounds} features={features} incidents_per_year={incidents_per_year} />
      </TabPanel>
    </>
  );
}
