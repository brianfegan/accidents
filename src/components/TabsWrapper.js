import {
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import React from "react";
import TabPanel from "./TabPanel";
import ByLocation from "./ByLocation";
import ByYear from "./ByYear";

export default (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {bounds, features, accidents_per_year} = props.data;

  return (
    <>
      <AppBar position="static">
        <Tabs component="div" value={value} onChange={handleChange} >
          <Tab label="Accidents by Year" />
          <Tab label="Accidents by Location" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ByYear accidents_per_year={accidents_per_year} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ByLocation bounds={bounds} features={features} accidents_per_year={accidents_per_year} />
      </TabPanel>
    </>
  );
}
