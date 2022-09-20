import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = (props) => {
  const { logout } = useAuth();
  const logoutHandler = async () => {
    try {
      const logoutSuccesfull = await logout();
    } catch {
      setError("Failed to log out");
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
            usuń
          </button>
        </li>
        <li className="main-page__nav-list-item">
          <button
            onClick={props.onDisplayShow}
            className="main-page__nav-list-link"
          >
            <img
              className="main-page__nav-icon"
              src="icons/show.svg"
              alt="show"
            />
            wyświetl koszta
          </button>
        </li>
        <li className="main-page__nav-list-item">
          <button
            onClick={props.onSummaryShow}
            className="main-page__nav-list-link"
          >
            <img
              className="main-page__nav-icon"
              src="icons/showall.svg"
              alt="showall"
            />
            Podsumuj
          </button>
        </li>
        <li className="main-page__nav-list-item">
          <button className="main-page__nav-list-link" onClick={logoutHandler}>
            Wyloguj
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
