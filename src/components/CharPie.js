import React, { useState } from "react";
import { useCost } from "../contexts/CostContext";
import { Pie } from "react-chartjs-2";

const CharPie = () => {
  const ctx = useCost();
  if (ctx.cost) {
    let costSummary = [];

    const reduceCost = (category) => {
      costSummary.push({
        category: category,
        price: ctx.cost
          .filter((obj) => {
            if (!obj.category.localeCompare(category)) return obj.price;
          })
          .reduce((total, obj) => {
            return +obj.price + total;
          }, 0),
      });
    };

    reduceCost("Jedzenie");
    reduceCost("Rachunki");
    reduceCost("Raty");
    reduceCost("Zakupy");
    reduceCost("Inne");

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
          // offset: 20,
        },
      ],
    });
    return (
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>Wykres wydatków</h2>
        <Pie
          className="chart-display"
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
  } else {
    return <div>Nie ma co wyświetlić</div>;
  }
};

export default CharPie;
