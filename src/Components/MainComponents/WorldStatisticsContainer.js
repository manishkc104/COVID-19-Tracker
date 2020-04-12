import React from "react";
import { fetchApiData } from "../Api/api";
import Cards from "../../Components/Cards/Cards";
import Charts from "../../Components/Charts/Chart";
import CardContainer from "../SecondaryComponents/CardContainer";
import Spinner from "../Loader/Spinner";

const WorldStatistics = ({ data }) => {
  const [initialData, setInitialData] = React.useState(data);

  const [fetching, isFetching] = React.useState(true);

  React.useEffect(() => {
    fetchApiData()
      .then(response => {
        isFetching(false);
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
        isFetching(true);
      });
  }, []);

  return (
    <React.Fragment>
      {fetching ? (
        <CardContainer>
          <Cards data={initialData} />
          <Charts data={initialData} />
        </CardContainer>
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

export default WorldStatistics;
