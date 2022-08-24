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

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    valueChangedHandler,
    isValid: valueIsValid,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
