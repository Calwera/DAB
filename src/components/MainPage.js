import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import ShowModal from "./modals/ShowModal";
import SummaryModal from "./modals/SummaryModal";
import SummaryDisplay from "./SummaryDisplay";
import Navbar from "./Navbar";
import Card from "./UI/Card";
import CostSummary from "./CostSummary";
import Charts from "./Charts";

import IncomeChart from "./Charts/IncomeChart";
import CostChart from "./Charts/CostChart";

const MainPage = () => {
  const [cost, setCost] = useState([]);
  const [income, setIncome] = useState([]);
  const [summaryValue, setSummaryValue] = useState("");

  const addCost = (cost) => {
    setCost((prevCost) => {
      return [...prevCost, cost];
    });
  };

  const addIncome = (income) => {
    setIncome((prevIncome) => {
      return [...prevIncome, income];
    });
  };

  const deleteCost = (id) => {
    setCost((prevCost) => {
      const cost = prevCost.filter((ele) => {
        return ele.id !== id;
      });
      return cost;
    });
  };

  const deleteIncome = (id) => {
    setIncome((prevIncome) => {
      const income = prevIncome.filter((ele) => {
        return ele.id !== id;
      });
      return income;
    });
  };

  const releaseCostArray = () => {
    setCost([]);
    return cost;
  };

  const releaseIncomeArray = () => {
    setIncome([]);
    return income;
  };

  const displaySavedCost = (array) => {
    releaseCostArray();
    releaseIncomeArray();

    if (array.category) {
      if (array.category === "Wszystko") {
        const filteredArray = array.cost.filter(
          (cost) => cost.date >= array.dateFrom && cost.date <= array.dateTo
        );
        if (array.cost) {
          filteredArray.forEach((item) => addCost(item));
          return;
        }
        if (array.income) {
          filteredArray.forEach((item) => addIncome(item));
          return;
        }
      }

      const filteredArray = array.cost.filter(
        (cost) =>
          cost.category === array.category &&
          cost.date >= array.dateFrom &&
          cost.date <= array.dateTo
      );

      if (array.cost) {
        filteredArray.forEach((item) => addCost(item));
      } else {
        filteredArray.forEach((item) => addIncome(item));
      }
    } else {
      if (array.cost) {
        array.cost.forEach((item) => addCost(item));
      }
      if (array.income) {
        array.income.forEach((item) => addIncome(item));
      }
    }
  };

  const showSummary = (sum) => {
    setSummaryValue(sum);
  };
  const releaseSummary = () => {
    setSummaryValue("");
  };

  return (
    <Card>
      <section className="main-page">
        <Navbar />
        <div className="main-page__content-center">
          <Header />
          <Routes>
            <Route
              path="/summary"
              element={
                summaryValue && (
                  <SummaryDisplay
                    summaryArray={summaryValue}
                    deleteSummary={releaseSummary}
                  />
                )
              }
            ></Route>
            <Route
              path="/cost"
              element={
                (cost.length > 0 || income.length > 0) && (
                  <MainContent
                    costArray={cost}
                    deleteCostArray={releaseCostArray}
                    filterCostArray={deleteCost}
                    incomeArray={income}
                    deleteIncomeArray={releaseIncomeArray}
                    filterIncomeArray={deleteIncome}
                  />
                )
              }
            ></Route>
            <Route
              path="/"
              element={cost.length === 0 && !summaryValue && <CostSummary />}
            ></Route>
            <Route
              path="/addCost"
              element={<AddModal addCost={addCost} addIncome={addIncome} />}
            ></Route>
            <Route
              path="/displayCost"
              element={<ShowModal onDisplaySavedCost={displaySavedCost} />}
            ></Route>
            <Route
              path="/summaryCheck"
              element={<SummaryModal onSummaryShow={showSummary} />}
            ></Route>
            <Route path="/Chart" element={<Charts />}></Route>
            <Route path="/Wydatkiwyk" element={<CostChart />} />
            <Route path="/Przychodwyk" element={<IncomeChart />} />
          </Routes>
        </div>
      </section>
      <Footer />
    </Card>
  );
};

export default MainPage;
