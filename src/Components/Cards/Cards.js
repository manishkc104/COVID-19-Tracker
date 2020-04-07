import React from "react";
import CountUp from "react-countup";
import { styled } from "styletron-react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";

const Container = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  margin: "30px 0",
  justifyContent: "center"
}));

const priorityColorMap = {
  INFECTED: {
    borderColor: "rgba(0,0,255,0.5)"
  },
  RECOVERED: {
    borderColor: "rgba(0,255,0,0.5)"
  },
  DEATHS: {
    borderColor: "rgba(255,0,0,0.5)"
  }
};

const GridCard = styled(Grid, ({ status }) => ({
  margin: "0 2% !important",
  borderBottom: `10px solid ${priorityColorMap[status].borderColor}`
}));

const Cards = ({ data }) => {
  if (!data.confirmed.value) {
    return "Loading....";
  }

  const { confirmed, recovered, deaths, lastUpdate } = data;

  return (
    <Container>
      <Grid container spacing={3} justify="center">
        <GridCard item component={Card} xs={12} md={3} status={"INFECTED"}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator={","}
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Active cases of Covid-19
            </Typography>
          </CardContent>
        </GridCard>
        <GridCard item component={Card} xs={12} md={3} status={"RECOVERED"}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator={","}
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Recovered cases of Covid-19
            </Typography>
          </CardContent>
        </GridCard>
        <GridCard item component={Card} xs={12} md={3} status={"DEATHS"}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator={","}
              />
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Deaths cases of Covid-19
            </Typography>
          </CardContent>
        </GridCard>
      </Grid>
    </Container>
  );
};

export default Cards;
