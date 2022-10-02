import React, { Fragment, useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import ShowModal from "./modals/ShowModal";
import SummaryModal from "./modals/SummaryModal";
import SummaryDisplay from "./SummaryDisplay";
import Navbar from "./Navbar";
import useShow from "../hooks/use-show";
import DeleteModal from "./modals/DeleteModal";

const MainPage = () => {
  const [cost, setCost] = useState([]);
  const [summaryValue, setSummaryValue] = useState(null);

  useEffect(() => {
    setSummaryValue();
  }, [cost]);

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

  const {
    show: deleteShown,
    showHandler: showDeleteHandler,
    hideHandler: hideDeleteHandler,
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
      console.log("dzialam", cost);
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
        // dodać parametr który rozpozna maincontent
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
            onDeleteShow={showDeleteHandler}
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
            {deleteShown && (
              <DeleteModal closeDeleteModal={hideDeleteHandler} />
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
