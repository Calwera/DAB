import React, { useState } from "react";
import { useCost } from "../contexts/CostContext";
import { Pie } from "react-chartjs-2";

const CharPie = (props) => {
  const ctx = useCost();

  // console.log(ctx.cost);
  // const costSum = ctx.cost.

  const [chartData, setChartData] = useState({
    labels: ctx.cost.map((data) => data.category),
    datasets: [
      {
        label: "Kategorie ",
        data: ctx.cost.map((data) => data.price),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#adeaaa",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  console.log(chartData);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Rozkład kosztów",
            },
          },
        }}
      />
    </div>
  );
};

export default CharPie;
