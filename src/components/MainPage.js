import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";
import AddModal from "./modals/AddModal";
import Navbar from "./Navbar";

const MainPage = () => {
  const [addShown, setAddShown] = useState(false);

  const showAddHandler = () => {
    setAddShown(true);
  };

  const hideAddHandler = () => {
    setAddShown(false);
  };

  return (
    <Fragment>
      <section className="main-page">
        <Navbar onAddShow={showAddHandler} />
        <div className="main-page__content-center">
          <Header />
          <MainContent />
          {addShown && <AddModal closeAddModal={hideAddHandler} />}
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default MainPage;
