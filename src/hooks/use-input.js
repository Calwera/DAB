import { useState } from "react";

const useInput = (valideValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState("");

  const valueIsValid = valideValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangedHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  return {
    value: enteredValue,
    hasError,
    valueChangedHandler,
    inputBlurHandler,
  };
};

export default useInput;
