import React, { useEffect } from "react";
import { fetchDailyData } from "../Api/api";
import { Line } from "react-chartjs-2";
import { styled } from "styletron-react";

const Container = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  width: "55%",
  marginTop: "30px",
  justifyContent: "center"
}));

const Charts = () => {
  const [dailyData, setDailyData] = React.useState({});

  useEffect(() => {
    fetchDailyData().then(response => {
      const modifiedData = response.data.map(data => ({
        confirmed: data.confirmed.total,
        deaths: data.deaths.total,
        date: data.reportDate
      }));
      setDailyData(modifiedData);
    });
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true
          }
        ]
      }}
    />
  ) : null;

  return <Container>{lineChart}</Container>;
};

export default Charts;
