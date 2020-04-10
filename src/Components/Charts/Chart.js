import React, { useEffect } from "react";
import { fetchDailyData } from "../Api/api";
import { Bar, Line } from "react-chartjs-2";
import { styled } from "styletron-react";

const Container = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  marginTop: "30px",
  justifyContent: "center"
}));

const Charts = ({ data }) => {
  const { confirmed, recovered, deaths, country } = data;
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

  const lineChart =
    dailyData.length > 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#1F1F7C",
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

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "#E7E7F1",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)"
            ],
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
  ) : null;

  return <Container>{country ? barChart : lineChart}</Container>;
};

export default Charts;
