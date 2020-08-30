import {
  Container,
  Typography
} from "@material-ui/core";
import React from "react";
import TabsWrapper from "./TabsWrapper";

export default () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" component="h1" gutterBottom>Accidents</Typography>
      <TabsWrapper />
    </Container>
  );
}
