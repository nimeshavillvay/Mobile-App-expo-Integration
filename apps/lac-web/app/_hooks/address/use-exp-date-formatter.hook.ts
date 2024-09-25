import { useState } from "react";

export const useExpDateFormatter = () => {
  const [date, setDate] = useState<string | undefined>("");

  const formatDate = (inputDate: string) => {
    const value = inputDate.replace(/\D/g, "").match(/(\d{0,2})(\d{0,2})/);

    if (value) {
      const formatted = !value[2]
        ? value[1]?.length === 2 && (date?.length ?? 0) < 3
          ? value[1] + "/"
          : value[1]
        : value[1] + "/" + value[2];

      setDate(formatted);

      return formatted;
    }
  };

  return { date, setDate, formatDate };
};

export default useExpDateFormatter;
