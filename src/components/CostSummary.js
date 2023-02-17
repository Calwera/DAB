import React, { useEffect, useState, useContext, Fragment } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useCost } from "../contexts/CostContext";

const CostSummary = () => {
  const navigate = useNavigate();
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const ctx = useCost();
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

  const clickHandler = () => {
    navigate("/ChartPie");
  };

  return (
    <section className="container">
      <div className="counter" onClick={clickHandler}>
        <h3 className="counter__title">Wydatki</h3>
        <div className="counter__value">{cost}</div>
        <div className="counter__title">{month}</div>
      </div>
      <div className="counter" onClick={clickHandler}>
        <h3 className="counter__title">Przychody</h3>
        <div className="counter__value">{income}</div>
        <div className="counter__title">{month}</div>
      </div>
      <div className="counter" onClick={clickHandler}>
        <h3 className="counter__title">Balans</h3>
        <div className="counter__value">{income - cost}</div>
        <div className="counter__title">{month}</div>
      </div>
    </section>
  );
};

export default CostSummary;
