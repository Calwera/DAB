import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const logoutHandler = async () => {
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  };
  // TO DO STYLE USER
  return (
    <nav className="main-page__nav">
      <div className="main-page__user">{currentUser.email}</div>
      <ul className="main-page__nav-list">
        <Link to="/addCost" className="main-page__nav-list-link">
          <li className="main-page__nav-list-item">
            <button>
              <img
                className="main-page__nav-icon"
                src="icons/add.svg"
                alt="add"
              />
              dodaj
            </button>
          </li>
        </Link>
        {/* <li className="main-page__nav-list-item">
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
        </li> */}
        <li className="main-page__nav-list-item">
          <Link to="/displayCost" className="main-page__nav-list-link">
            <button>
              <img
                className="main-page__nav-icon"
                src="icons/show.svg"
                alt="show"
              />
              wyświetl
            </button>
          </Link>
        </li>
        <li className="main-page__nav-list-item">
          <Link to="/summaryCheck" className="main-page__nav-list-link">
            <button>
              <img
                className="main-page__nav-icon"
                src="icons/showall.svg"
                alt="showall"
              />
              Podsumuj
            </button>
          </Link>
        </li>
        <li className="main-page__nav-list-item">
          <Link to="/Chart" className="main-page__nav-list-link">
            <button>
              <img
                className="main-page__nav-icon"
                src="icons/showall.svg"
                alt="showall"
              />
              Wykres
            </button>
          </Link>
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
