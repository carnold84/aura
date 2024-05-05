import classnames, { Argument } from "classnames";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: Argument[]) => {
  return twMerge(classnames(inputs));
};

export default cn;
