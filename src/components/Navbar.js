import React from "react";

const Navbar = (props) => {
  const showHandler = async () => {
    try {
      const response = await fetch(
        "https://domowa-aplikacja-budzetu-44d26-default-rtdb.europe-west1.firebasedatabase.app/cost.json"
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Cannot fetch data");
      }
      console.log(data);
      // OSO CHODZI!!!!
      const array = Object.keys(data)
        .map((key) => data[key])
        .reduce((acc, val) => [...acc, ...val]);
      console.log(array);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="main-page__nav">
      <ul className="main-page__nav-list">
        <li className="main-page__nav-list-item">
          <button
            className="main-page__nav-list-link"
            onClick={props.onAddShow}
          >
            <img
              className="main-page__nav-icon"
              src="icons/add.svg"
              alt="add"
            />
            dodaj
          </button>
        </li>
        <li className="main-page__nav-list-item">
          <button className="main-page__nav-list-link">
            <img
              className="main-page__nav-icon"
              src="icons/add.svg"
              alt="change"
            />
            zmodyfikuj
          </button>
        </li>
        <li className="main-page__nav-list-item">
          <button className="main-page__nav-list-link">
            <img
              className="main-page__nav-icon"
              src="icons/remove.svg"
              alt="Delete"
            />
            usun
          </button>
        </li>
        <li className="main-page__nav-list-item">
          <button onClick={showHandler} className="main-page__nav-list-link">
            <img
              className="main-page__nav-icon"
              src="icons/show.svg"
              alt="show"
            />
            wyświetl
          </button>
        </li>
        <li className="main-page__nav-list-item">
          <button className="main-page__nav-list-link">
            <img
              className="main-page__nav-icon"
              src="icons/showall.svg"
              alt="showall"
            />
            wyświetl wszystko
          </button>
        </li>
      </ul>
      <img
        src="/icons/dab_main.svg"
        alt="App Logo"
        className="main-page__nav-list-link"
      />
    </nav>
  );
};

export default Navbar;
