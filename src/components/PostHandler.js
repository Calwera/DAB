import React, { Fragment } from "react";

const PostHandler = (props) => {
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
    <>
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
    </>
  );
};

export default PostHandler;
