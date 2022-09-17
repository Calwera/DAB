import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import ShowModal from "./modals/ShowModal";
import SummaryModal from "./modals/SummaryModal";
import Navbar from "./Navbar";
import useShow from "../hooks/use-show"; // DOpisac custom hook'a

const MainPage = () => {
  const [addShown, setAddShown] = useState(false);
  const [displayShown, setDisplayShown] = useState(false);
  const [summaryShown, setSummaryShown] = useState(false);
  const [cost, setCost] = useState([]);

  const showAddHandler = () => {
    setAddShown(true);
  };

  const hideAddHandler = () => {
    setAddShown(false);
  };

  const showDisplayHandler = () => {
    setDisplayShown(true);
  };

  const hideDisplayHandler = () => {
    setDisplayShown(false);
  };

  const showSummaryHandler = () => {
    setSummaryShown(true);
  };

  const hideSummaryHandler = () => {
    setSummaryShown(false);
  };

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
    console.log(sum);
  };

  return (
    <Fragment>
      <div className="background-image">
        <section className="main-page">
          <Navbar
            onAddShow={showAddHandler}
            onDisplayShow={showDisplayHandler}
            onSummaryShow={showSummaryHandler}
          />
          <div className="main-page__content-center">
            <Header />
            <MainContent
              costArray={cost}
              deleteCostArray={releaseCostArray}
              filterCostArray={deleteCost}
            />
            {addShown && (
              <AddModal closeAddModal={hideAddHandler} addCost={addCost} />
            )}
            {displayShown && (
              <ShowModal
                closeDisplayModal={hideDisplayHandler}
                onDisplaySavedCost={displaySavedCost}
              />
            )}
            {summaryShown && (
              <SummaryModal
                closeSummaryModal={hideSummaryHandler}
                onSummaryShow={showSummary}
              />
            )}
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
};

export default MainPage;
