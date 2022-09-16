import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import ShowModal from "./modals/ShowModal";
import Navbar from "./Navbar";

const MainPage = () => {
  const [addShown, setAddShown] = useState(false);
  const [displayShown, setDisplayShown] = useState(false);
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
      const filteredArray = array.cost.filter(
        (cost) => cost.category === array.category
      );
      filteredArray.forEach((item) => addCost(item));
    } else {
      array.cost.forEach((item) => addCost(item));
    }
  };

  return (
    <Fragment>
      <div className="background-image">
        <section className="main-page">
          <Navbar
            onAddShow={showAddHandler}
            onDisplayShow={showDisplayHandler}
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
          </div>
        </section>
      </div>
      <Footer />
    </Fragment>
  );
};

export default MainPage;
