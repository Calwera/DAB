import { useState } from "react";

const useShow = () => {
  const [show, setShow] = useState(false);

  const showHandler = () => {
    setShow(true);
  };

  const hideHandler = () => {
    setShow(false);
  };

  return {
    show,
    showHandler,
    hideHandler,
  };
};

export default useShow;
