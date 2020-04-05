import React from "react";
import "./App.css";
import { styled } from "styletron-react";
import Cards from "./Components/Cards/Cards";
import { getApiData } from "./Components/Api/api";

const MainContainer = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
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
    (async function getFunction() {
      const response = await getApiData();
      const {
        data: { confirmed, recovered, deaths, lastUpdate }
      } = response;
      setInitialData({ confirmed, recovered, deaths, lastUpdate });
    })();
  }, []);

  return (
    <MainContainer>
      <Cards data={initialData} />
    </MainContainer>
  );
};

export default App;
