import React, { Fragment, useState } from "react";
import CostEntry from "./CostEntry";
import { ref, set } from "firebase/database";
import { database } from "../firebase";

const MainContent = (props) => {
  const [error, setError] = useState(null);

  const deleteItem = (id) => {
    props.filterCostArray(id);
  };

  const confirmHandler = async () => {
    setError(null);

    const date = new Date();
    const dateToInteger = date.toLocaleDateString().split(".").join("");
    try {
      await Promise.all(
        props.costArray.map(async (cost, id) => {
          set(ref(database, "cost/" + dateToInteger + id), {
            category: cost.category,
            date: cost.date,
            price: cost.price,
            description: cost.description,
          });
        })
      );

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
      <div className="main-page__content-center">
        <ul>
          {props.costArray.map((item) => (
            <CostEntry
              cost={item}
              key={item.key || item.id}
              deleteHandler={deleteItem}
            />
          ))}
        </ul>
      </div>
      {error && <p>{error}</p>}
      {props.costArray.length > 0 && props.costArray[0].id === undefined && (
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
