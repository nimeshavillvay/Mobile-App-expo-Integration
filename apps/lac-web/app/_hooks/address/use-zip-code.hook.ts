import type { ChangeEvent } from "react";
import { useState } from "react";

export const useZipCodeFormatter = () => {
  const [zipCode, setZipCode] = useState<string | undefined>("");

  const formatZipCode = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");

    if (value?.length > 5) {
      value = value.slice(0, 5);
    }

    if (value || value === "") {
      setZipCode(value);

      return value;
    }
  };

  return { zipCode, setZipCode, formatZipCode };
};

export default useZipCodeFormatter;
