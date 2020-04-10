import React from "react";
import CountUp from "react-countup";
import { styled, withStyle } from "styletron-react";
import { INFECTED, RECOVERED, DEATHS } from "../../consts";
import Card from "../SecondaryComponents/Card";

const priorityColorMap = {
  INFECTED: {
    borderColor: "#E7E7F1"
  },
  RECOVERED: {
    borderColor: "#96DD7E"
  },
  DEATHS: {
    borderColor: "rgba(255,0,0,0.5)"
  }
};

const ContainerCard = withStyle(Card, ({ status }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "3rem",
  marginRight: "2rem",
  borderBottom: `10px solid ${priorityColorMap[status].borderColor}`,
  ":last-child": {
    marginRight: 0
  }
}));

const Heading = styled("h4", () => ({
  fontSize: "1.2rem",
  margin: 0,
  color: "#0000008a"
}));

const TotalNumber = styled("span", () => ({
  fontSize: "2rem",
  color: "#212121",
  marginTop: "0.5rem",
  marginBottom: "0.6rem"
}));

const DateValue = styled("span", () => ({
  fontSize: "1.2rem",
  color: "#0000008a",
  marginBottom: "0.6rem"
}));

const Description = styled("span", () => ({
  fontSize: "1rem",
  color: "#212121"
}));

const Container = styled("div", () => ({
  display: "flex",
  margin: "30px 0"
}));

const Cards = ({ data }) => {
  const capitalize = str =>
    str
      .toLowerCase()
      .split(" ")
      .map(strWord => strWord.charAt().toUpperCase() + strWord.slice(1))
      .join(" ");

  const { confirmed, recovered, deaths, lastUpdate } = data;

  const STATUS_UPDATE = [
    {
      title: INFECTED,
      value: confirmed.value,
      lastUpdate: lastUpdate
    },
    {
      title: RECOVERED,
      value: recovered.value,
      lastUpdate: lastUpdate
    },
    {
      title: DEATHS,
      value: deaths.value,
      lastUpdate: lastUpdate
    }
  ];
  return (
    <React.Fragment>
      <Container>
        {STATUS_UPDATE.map(({ title, value, lastUpdate }) => (
          <ContainerCard status={title} key={value}>
            <Heading>{capitalize(title)}</Heading>
            <TotalNumber>
              <CountUp start={0} end={value} duration={2.5} separator={","} />
            </TotalNumber>
            <DateValue>{new Date(lastUpdate).toDateString()}</DateValue>
            <Description>{`Number of ${capitalize(
              title
            )} cases of Covid 19`}</Description>
          </ContainerCard>
        ))}
      </Container>
    </React.Fragment>
  );
};

export default Cards;
