import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";

const CostSummary = () => {
  const navigate = useNavigate();
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  const [cost, setCost] = useState("");
  const [arrToSort, setArrToSort] = useState("");

  const today = date.getFullYear() + "-" + (+date.getMonth() + 1) + "-" + "01";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = ref(database, "cost/");

        await onValue(data, (snapshot) => {
          const dataSnapshot = snapshot.val();
          const array = Object.keys(dataSnapshot).map((key) => {
            return { ...dataSnapshot[key], id: key };
          });

          setArrToSort(array.filter((item) => item.date >= today));

          const totalAmount = array
            .filter((item) => item.date >= today)
            .reduce((prev, curr) => prev + +curr.price, 0);
          setCost(totalAmount);
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
    <section className="counter" onClick={clickHandler}>
      <h3 className="counter__title">Wydatki</h3>
      <div className="counter__value">{cost}</div>
      <div className="counter__title">{month}</div>
    </section>
  );
};

export default CostSummary;
