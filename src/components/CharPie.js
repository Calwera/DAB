import React, { useState } from "react";
import { useCost } from "../contexts/CostContext";
import { Pie } from "react-chartjs-2";

const CharPie = () => {
  const ctx = useCost();
  console.log();
  let costSummary = [];
  costSummary.push({
    category: "Jedzenie",
    price: ctx.cost
      .filter((obj) => {
        if (!obj.category.localeCompare("Jedzenie")) return obj.price;
      })
      .reduce((total, obj) => {
        return +obj.price + total;
      }, 0),
  });
  costSummary.push({
    category: "Rachunki",
    price: ctx.cost
      .filter((obj) => {
        if (!obj.category.localeCompare("Rachunki")) return obj.price;
      })
      .reduce((total, obj) => {
        return +obj.price + total;
      }, 0),
  });
  costSummary.push({
    category: "Zakupy",
    price: ctx.cost
      .filter((obj) => {
        if (!obj.category.localeCompare("Zakupy")) return obj.price;
      })
      .reduce((total, obj) => {
        return +obj.price + total;
      }, 0),
  });
  costSummary.push({
    category: "Raty",
    price: ctx.cost
      .filter((obj) => {
        if (!obj.category.localeCompare("Raty")) return obj.price;
      })
      .reduce((total, obj) => {
        return +obj.price + total;
      }, 0),
  });
  costSummary.push({
    category: "Inne",
    price: ctx.cost
      .filter((obj) => {
        if (!obj.category.localeCompare("Inne")) return obj.price;
      })
      .reduce((total, obj) => {
        return +obj.price + total;
      }, 0),
  });

  console.log(costSummary);
  const [chartData, setChartData] = useState({
    labels: costSummary.map((data) => data.category),
    datasets: [
      {
        label: "Kategorie ",
        data: costSummary.map((data) => data.price),
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
