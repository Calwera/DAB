import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import Navbar from "./Navbar";

const MainPage = () => {
  const [addShown, setAddShown] = useState(false);
  const [cost, setCost] = useState([]);

  const showAddHandler = () => {
    setAddShown(true);
  };

  const hideAddHandler = () => {
    setAddShown(false);
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

  return (
    <Fragment>
      <section className="main-page">
        <Navbar onAddShow={showAddHandler} />
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
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default MainPage;
