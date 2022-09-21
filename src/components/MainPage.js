import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import ShowModal from "./modals/ShowModal";
import SummaryModal from "./modals/SummaryModal";
import SummaryDisplay from "./SummaryDisplay";
import Navbar from "./Navbar";
import useShow from "../hooks/use-show";

const MainPage = () => {
  const [cost, setCost] = useState([]);
  const [summaryValue, setSummaryValue] = useState(null);

  const {
    show: addShown,
    showHandler: showAddHandler,
    hideHandler: hideAddHandler,
  } = useShow();

  const {
    show: summaryShown,
    showHandler: showSummaryHandler,
    hideHandler: hideSummaryHandler,
  } = useShow();

  const {
    show: displayShown,
    showHandler: showDisplayHandler,
    hideHandler: hideDisplayHandler,
  } = useShow();

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
            {summaryValue && <SummaryDisplay summaryArray={summaryValue} />}
            {cost.length > 0 && (
              <MainContent
                costArray={cost}
                deleteCostArray={releaseCostArray}
                filterCostArray={deleteCost}
              />
            )}
            {cost.length === 0 && !summaryValue && (
              <p>Brak danych do wyświetlenia</p>
            )}

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
