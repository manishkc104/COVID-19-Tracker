import React from "react";
import "./App.css";
import { styled } from "styletron-react";
import Cards from "./Components/Cards/Cards";
import { fetchCountriesById, fetchApiData } from "./Components/Api/api";
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
  lastUpdate: "",
  country: ""
};

const App = () => {
  const [initialData, setInitialData] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    fetchApiData().then(response => {
      const {
        data: { confirmed, recovered, deaths, lastUpdate }
      } = response;
      setInitialData({ confirmed, recovered, deaths, lastUpdate });
    });
  }, []);

  const handleCountryChange = country => {
    fetchCountriesById(country).then(response => {
      const {
        data: { confirmed, recovered, deaths, lastUpdate }
      } = response;
      setInitialData({
        ...initialData,
        confirmed,
        recovered,
        deaths,
        lastUpdate,
        country: country
      });
    });
  };

  return (
    <MainContainer>
      <Cards data={initialData} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Charts data={initialData} />
    </MainContainer>
  );
};

export default App;
