import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const CostSummary = () => {
  const [cost, setCost] = useState("");
  const date = new Date();
  const month = date.getFullYear() + "-" + (+date.getMonth() + 1) + "-" + "01";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = ref(database, "cost/");

        await onValue(data, (snapshot) => {
          const dataSnapshot = snapshot.val();
          const array = Object.keys(dataSnapshot).map((key) => {
            return { ...dataSnapshot[key], id: key };
          });

          const totalAmount = array
            .filter((item) => item.date >= month)
            .reduce((prev, curr) => prev + +curr.price, 0);
          setCost(totalAmount);
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="counter">
      <h3 className="counter__title">Wydatki</h3>
      <div className="counter__value">{cost}</div>
      <div className="counter__title">{month}</div>
    </section>
  );
};

export default CostSummary;
