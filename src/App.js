import React from "react";
import Cards from "./Components/Cards/Cards";
import Charts from "./Components/Charts/Chart";
import CountryPicker from "./Components/CountryPicker/CountryPicker";
import { styled } from "styletron-react";
import "./App.css";

const MainContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const App = () => {
  return (
    <MainContainer>
      <Cards />
      <CountryPicker />
      <Charts />
    </MainContainer>
  );
};

export default App;
