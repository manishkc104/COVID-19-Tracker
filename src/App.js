import React from "react";
import "./App.css";
import { styled } from "styletron-react";
import Cards from "./Components/Cards/Cards";
import { getApiData } from "./Components/Api/api";
import Charts from "./Components/Charts/Chart";
import CountryPicker from "./Components/CountryPicker/CountryPicker";

const MainContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
}));

const INITIAL_STATE = {
  confirmed: {},
  recovered: {},
  deaths: {},
  lastUpdate: ""
};

const App = () => {
  const [initialData, setInitialData] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    getApiData().then(response => {
      const {
        data: { confirmed, recovered, deaths, lastUpdate }
      } = response;
      setInitialData({ confirmed, recovered, deaths, lastUpdate });
    });
  }, []);

  return (
    <MainContainer>
      <Cards data={initialData} />
      <CountryPicker />
      <Charts />
    </MainContainer>
  );
};

export default App;
