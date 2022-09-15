import React, { Fragment, useState } from "react";
import CostEntry from "./CostEntry";

const MainContent = (props) => {
  const [error, setError] = useState(null);

  const deleteItem = (id) => {
    props.filterCostArray(id);
  };

  const confirmHandler = async () => {
    setError(null);
    try {
      const response = await fetch(
        "https://domowa-aplikacja-budzetu-44d26-default-rtdb.europe-west1.firebasedatabase.app/cost.json",
        {
          method: "POST",
          body: JSON.stringify(props.costArray),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      props.deleteCostArray();
    } catch (error) {
      setError(error.message);
    }
  };

  const declineHandler = () => {
    props.deleteCostArray();
  };

  return (
    <Fragment>
      <li className="main-page__content-center">
        {props.costArray.map((item) => (
          <CostEntry cost={item} key={item.id} deleteHandler={deleteItem} />
        ))}
      </li>
      {error && <p>{error}</p>}
      {props.costArray.length > 0 && (
        <div className="main-page">
          <button className="button-big confirm" onClick={confirmHandler}>
            Zapisz koszty w bazie
          </button>
          <button className="button-big cancel" onClick={declineHandler}>
            Anuluj
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default MainContent;
