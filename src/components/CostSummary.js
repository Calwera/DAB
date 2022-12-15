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
    <section>
      <h3>Wydatki</h3>
      <div>{cost}</div>
      <div>Za miesiąc</div>
      <div>{month}</div>
    </section>
  );
};

export default CostSummary;
