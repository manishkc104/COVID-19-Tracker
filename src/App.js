import React from "react";
import "./App.css";
import { withStyle } from "styletron-react";
import { fetchCountriesById, fetchApiData } from "./Components/Api/api";
import Cards from "./Components/Cards/Cards";
import Charts from "./Components/Charts/Chart";
import Spinner from "./Components/Loader/Spinner";
import Flex from "./Components/SecondaryComponents/Flex";
import Card from "./Components/SecondaryComponents/Card";
import CountryPicker from "./Components/CountryPicker/CountryPicker";

const MainContainer = withStyle(Flex, () => ({
  margin: "2.4rem"
}));

const CardContainer = withStyle(Card, () => ({
  display: "flex",
  padding: "2rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  ":first-child": {
    marginRight: "2rem"
  }
}));

const INITIAL_STATE = {
  confirmed: {},
  recovered: {},
  deaths: {},
  lastUpdate: ""
};

const App = () => {
  const [initialData, setInitialData] = React.useState(INITIAL_STATE);

  const [initialCountryData, setInitialCountryData] = React.useState({
    ...INITIAL_STATE,
    country: "US"
  });

  const [fetching, isFetching] = React.useState(false);

  const fetchCountries = React.useCallback((country = "US") => {
    fetchCountriesById(country).then(response => {
      isFetching(true);
      const {
        data: { confirmed, recovered, deaths, lastUpdate }
      } = response;
      setInitialCountryData(initialCountryData => ({
        ...initialCountryData,
        confirmed,
        recovered,
        deaths,
        lastUpdate
      }));
    });
  }, []);

  React.useEffect(() => {
    fetchApiData()
      .then(response => {
        const {
          data: { confirmed, recovered, deaths, lastUpdate }
        } = response;
        setInitialData(initialData => ({
          ...initialData,
          confirmed,
          recovered,
          deaths,
          lastUpdate
        }));
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => {
        isFetching(false);
      });
  }, []);

  React.useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleCountryChange = country => {
    fetchCountries(country);
  };

  return (
    <MainContainer>
      {fetching ? (
        <React.Fragment>
          <CardContainer>
            <Cards data={initialData} />
            <Charts data={initialData} />
          </CardContainer>
          <CardContainer>
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Cards data={initialCountryData} />
            <Charts data={initialCountryData} countrySelected />
          </CardContainer>
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </MainContainer>
  );
};

export default App;
