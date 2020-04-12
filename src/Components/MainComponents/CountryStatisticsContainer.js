import React from "react";
import { fetchCountriesById } from "../Api/api";
import Cards from "../../Components/Cards/Cards";
import Charts from "../../Components/Charts/Chart";
import Spinner from "../../Components/Loader/Spinner";
import CountryPicker from "../../Components/CountryPicker/CountryPicker";
import CardContainer from "../SecondaryComponents/CardContainer";

const CountryStatistics = ({ data }) => {
  const [initialCountryData, setInitialCountryData] = React.useState({
    ...data,
    country: "US"
  });

  const [fetching, isFetching] = React.useState(false);

  const fetchCountries = React.useCallback((country = "US") => {
    fetchCountriesById(country)
      .then(response => {
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
    <React.Fragment>
      {fetching ? (
        <Spinner />
      ) : (
        <CardContainer>
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Cards data={initialCountryData} />
          <Charts data={initialCountryData} />
        </CardContainer>
      )}
    </React.Fragment>
  );
};

export default CountryStatistics;
