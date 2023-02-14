import React, { Fragment, useState } from "react";
import CostEntry from "./CostEntry";
import { ref, remove, set } from "firebase/database";
import { database } from "../firebase";
import Alert from "./UI/Alert";
import { useNavigate } from "react-router-dom";

const MainContent = (props) => {
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({
    message: "",
    isLoading: false,
    id: null,
  });
  const navigate = useNavigate();

  const deleteItem = (id) => {
    setAlert({
      message: "Jesteś pewny ze chcesz usunąć?",
      isLoading: true,
      id,
    });
  };

  const confirmDelete = (id) => {
    setAlert({
      message: "",
      isLoading: false,
      id: null,
    });
    if (id === null) return;
    remove(ref(database, "cost/" + id));
    props.filterCostArray(id);
  };

  const confirmHandler = async () => {
    setError(null);

    const date = new Date();
    const dateToInteger =
      date.toLocaleDateString().split(".").join("") + date.getUTCMilliseconds();

    try {
      await Promise.all(
        props.costArray.map(async (cost, id) => {
          console.log(cost.user);
          set(ref(database, "cost/" + dateToInteger + id), {
            category: cost.category,
            date: cost.date,
            price: cost.price,
            description: cost.description,
            user: cost.user,
          });
        })
      );
      setAlert({
        message: "Dodano Wydatek",
        isLoading: true,
        id: 1,
      });

      await Promise.all(
        props.incomeArray.map(async (income, id) => {
          set(ref(database, "income/" + dateToInteger + id), {
            category: income.category,
            date: income.date,
            price: income.price,
            user: income.user,
          });
        })
      );
      setAlert({
        message: "Dodano Przychod",
        isLoading: true,
        id: 1,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const addConfirm = () => {
    setAlert({
      message: "",
      isLoading: false,
      id: null,
    });
    props.deleteCostArray();
    props.deleteIncomeArray();
    navigate("/");
  };

  const declineHandler = () => {
    props.deleteCostArray();
    props.deleteIncomeArray();
    navigate("/");
  };

  return (
    <Fragment>
      <section className="main-page__content-center">
        <h2 className="main-page__header">
          <div>Kwota</div>
          <div>Kategoria</div>
          <div>Data</div>
          <div>opis</div>
          <div>użytkownik</div>
        </h2>
        <ul>
          {props.costArray.map((item) => (
            <CostEntry
              cost={item}
              key={item.key || item.id}
              deleteHandler={deleteItem}
            />
          ))}

          {props.incomeArray.map((item) => (
            <CostEntry cost={item} key={item.key} deleteHandler={deleteItem} />
          ))}
        </ul>
      </section>
      {error && <p>{error}</p>}
      {props.costArray.length > 0 ||
        (props.incomeArray.length > 0 && (
          // props.costArray[0].id === undefined &&
          <div className="main-page">
            <button className="button-big confirm" onClick={confirmHandler}>
              Zapisz wydatki w bazie
            </button>
            <button className="button-big cancel" onClick={declineHandler}>
              Anuluj
            </button>
          </div>
        ))}
      {props.costArray.length > 0 && props.costArray[0].id && (
        <button className="button-big cancel" onClick={declineHandler}>
          Wyjdz
        </button>
      )}
      {alert.isLoading && (
        <Alert
          onAddCost={addConfirm}
          onDeleteHandler={confirmDelete}
          message={alert.message}
          id={alert.id}
        />
      )}
    </Fragment>
  );
};

export default MainContent;
