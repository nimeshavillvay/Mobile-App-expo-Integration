import type { ChangeEvent } from "react";
import { useState } from "react";

export const usePhoneNumberFormatter = () => {
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

  const formatPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

    if (value) {
      const formatted = !value[2]
        ? value[1]
        : "(" + value[1] + ") " + value[2] + (value[3] ? "-" + value[3] : "");

      setPhoneNumber(formatted);

      return formatted;
    }
  };

  return { phoneNumber, setPhoneNumber, formatPhoneNumber };
};

export default usePhoneNumberFormatter;
