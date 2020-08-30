import {
  AppBar,
  Tabs,
  Tab
} from "@material-ui/core";
import React from "react";
import TabPanel from "./TabPanel";
import ByLocation from "./ByLocation";
import ByYear from "./ByYear";

export default () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs component="div" value={value} onChange={handleChange} >
          <Tab label="Accidents by Year" />
          <Tab label="Accidents by Location" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ByYear />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ByLocation />
      </TabPanel>
    </>
  );
}
