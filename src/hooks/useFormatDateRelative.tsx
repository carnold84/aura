import {
  format,
  formatDistanceToNow,
  isPast,
  isThisWeek,
  isValid,
} from "date-fns";
import { useMemo } from "react";

const useFormatDateRelative = (value?: string) => {
  return useMemo(() => {
    if (!value || isValid(value)) {
      return;
    }

    const date = format(value, "d MMMM yyyy");

    if (!isThisWeek(value)) {
      return <span>{date}</span>;
    }

    const distance = formatDistanceToNow(value);

    if (isPast(value)) {
      return (
        <span>
          <span>{distance} ago </span>
          <span className="opacity-70">({date})</span>
        </span>
      );
    } else {
      return (
        <span>
          <span>{distance} </span>
          <span className="opacity-70">({date})</span>
        </span>
      );
    }
  }, [value]);
};

export default useFormatDateRelative;
