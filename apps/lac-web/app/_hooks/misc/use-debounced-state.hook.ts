// eslint-disable-next-line no-restricted-imports
import { useEffect, useState } from "react";

const useDebouncedState = <T>(value: T, delay = 500) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return state;
};

export default useDebouncedState;
