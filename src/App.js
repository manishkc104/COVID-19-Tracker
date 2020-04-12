import React from "react";
import "./App.css";
import { withStyle } from "styletron-react";
import Flex from "./Components/SecondaryComponents/Flex";
import WorldStatistics from "./Components/MainComponents/WorldStatisticsContainer";
import CountryStatistics from "./Components/MainComponents/CountryStatisticsContainer";

const MainContainer = withStyle(Flex, () => ({
  margin: "2.4rem"
}));

const INITIAL_STATE = {
  confirmed: {},
  recovered: {},
  deaths: {},
  lastUpdate: ""
};

const App = () => {
  return (
    <MainContainer>
      <WorldStatistics data={INITIAL_STATE} />
      <CountryStatistics data={INITIAL_STATE} />
    </MainContainer>
  );
};

export default App;
