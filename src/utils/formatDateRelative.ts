import {
  format,
  formatDistanceToNow,
  isPast,
  isThisWeek,
  isValid,
} from "date-fns";

const formatDateRelative = (value?: string) => {
  if (!value || isValid(value)) {
    return;
  }

  const date = format(value, "d MMMM yyyy");

  if (!isThisWeek(value)) {
    return date;
  }

  const distance = formatDistanceToNow(value);

  if (isPast(value)) {
    return `${distance} ago (${date})`;
  } else {
    return `${distance} (${date})`;
  }
};

export default formatDateRelative;
