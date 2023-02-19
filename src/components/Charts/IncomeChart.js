import React, { useState } from "react";
import { useCost } from "../../contexts/CostContext";
import { Pie } from "react-chartjs-2";

const IncomeChart = () => {
  const ctx = useCost();
  if (ctx.income) {
    let incomeSummary = [];

    const reduceIncome = (category) => {
      incomeSummary.push({
        category: category,
        price: ctx.income
          .filter((obj) => {
            if (!obj.category.localeCompare(category)) return obj.price;
          })
          .reduce((total, obj) => {
            return +obj.price + total;
          }, 0),
      });
    };

    reduceIncome("Pensja");
    reduceIncome("Sprzedaż");
    reduceIncome("Inne");

    const [chartData, setChartData] = useState({
      labels: incomeSummary.map((data) => data.category),
      datasets: [
        {
          label: "Kategorie ",
          data: incomeSummary.map((data) => data.price),
          backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95"],
          borderColor: "black",
          borderWidth: 2,
          // offset: 20,
        },
      ],
    });
    return (
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>Wykres przychodów</h2>
        <Pie
          className="chart-display"
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Rozkład przychodów",
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

export default IncomeChart;
