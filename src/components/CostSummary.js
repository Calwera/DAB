import React, { useEffect, useState, useContext, Fragment } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useCost } from "../contexts/CostContext";
import { useIncome } from "../contexts/IncomeContext";

const CostSummary = () => {
  const navigate = useNavigate();
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const ctx = useCost();
  const ctx2 = useIncome();
  const [cost, setCost] = useState("");
  const [income, setIncome] = useState("");

  const today =
    date.getFullYear() +
    "-" +
    (+date.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    "-" +
    "01";

  useEffect(() => {
    const fetchData = async () => {
      // Przepisac na funckcje
      try {
        const data = ref(database, "cost/");
        const data2 = ref(database, "income/");
        await onValue(data, (snapshot) => {
          const dataSnapshot = snapshot.val();
          const array = Object.keys(dataSnapshot).map((key) => {
            return { ...dataSnapshot[key], id: key };
          });

          ctx.setCost(array.filter((item) => item.date >= today));

          const totalAmount = array
            .filter((item) => item.date >= today)
            .reduce((prev, curr) => prev + +curr.price, 0);

          setCost(totalAmount);
        });
        await onValue(data2, (snapshot) => {
          const dataSnapshot = snapshot.val();
          const array = Object.keys(dataSnapshot).map((key) => {
            return { ...dataSnapshot[key], id: key };
          });

          ctx2.setIncome(array);

          const totalAmount = array
            .filter((item) => item.date >= today)
            .reduce((prev, curr) => prev + +curr.price, 0);

          setIncome(totalAmount);
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const clickHandlerCost = () => {
    navigate("/Wydatkiwyk");
  };

  const clickHandlerIncome = () => {
    navigate("Przychodwyk");
  };

  return (
    <section className="container">
      <div className="counter" onClick={clickHandlerCost}>
        <h3 className="counter__title">Wydatki</h3>
        <div className="counter__value">{cost}</div>
        <div className="counter__title">{month}</div>
      </div>
      <div className="counter" onClick={clickHandlerIncome}>
        <h3 className="counter__title">Przychody</h3>
        <div className="counter__income">{income}</div>
        <div className="counter__title">{month}</div>
      </div>
      <div className="counter">
        <h3 className="counter__title">Balans</h3>
        {income - cost > 0 && (
          <div className="counter__income">{income - cost}</div>
        )}
        {income - cost <= 0 && (
          <div className="counter__value">{income - cost}</div>
        )}
        <div className="counter__title">{month}</div>
      </div>
    </section>
  );
};

export default CostSummary;
