import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import ShowModal from "./modals/ShowModal";
import SummaryModal from "./modals/SummaryModal";
import SummaryDisplay from "./SummaryDisplay";
import Navbar from "./Navbar";
import Card from "./UI/Card";
import { Routes, Route } from "react-router-dom";
import CostSummary from "./CostSummary";

const MainPage = () => {
  const [cost, setCost] = useState([]);
  const [summaryValue, setSummaryValue] = useState("");

  const addCost = (cost) => {
    setCost((prevCost) => {
      return [...prevCost, cost];
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

  const releaseCostArray = () => {
    setCost([]);
    return cost;
  };

  const displaySavedCost = (array) => {
    releaseCostArray();

    if (array.category) {
      if (array.category === "Wszystko") {
        const filteredArray = array.cost.filter(
          (cost) => cost.date >= array.dateFrom && cost.date <= array.dateTo
        );
        filteredArray.forEach((item) => addCost(item));
        return;
      }

      const filteredArray = array.cost.filter(
        (cost) =>
          cost.category === array.category &&
          cost.date >= array.dateFrom &&
          cost.date <= array.dateTo
      );
      filteredArray.forEach((item) => addCost(item));
    } else {
      array.cost.forEach((item) => addCost(item));
    }
  };

  const showSummary = (sum) => {
    setSummaryValue(sum);
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
                summaryValue && <SummaryDisplay summaryArray={summaryValue} />
              }
            ></Route>
            <Route
              path="/cost"
              element={
                cost.length > 0 && (
                  <MainContent
                    costArray={cost}
                    deleteCostArray={releaseCostArray}
                    filterCostArray={deleteCost}
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
              element={<AddModal addCost={addCost} />}
            ></Route>
            <Route
              path="/displayCost"
              element={<ShowModal onDisplaySavedCost={displaySavedCost} />}
            ></Route>
            <Route
              path="/summaryCheck"
              element={<SummaryModal onSummaryShow={showSummary} />}
            ></Route>
          </Routes>
        </div>
      </section>
      <Footer />
    </Card>
  );
};

export default MainPage;
