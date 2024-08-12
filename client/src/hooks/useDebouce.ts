import { useState, useEffect } from "react";

export const useDebouce = (value: string | number, delay: number) => {
  const [valueDebouce, setValueDebouce] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setValueDebouce(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [delay, value]);

  return valueDebouce;
};
