import { ComponentPropsWithRef, ReactNode } from "react";

import cn from "../../utils/cn";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
}

const Button = ({ children, variant = "outlined", ...rest }: ButtonProps) => {
  return (
    <button
      className={cn("px-4 py-2", {
        "border border-purple-700 bg-purple-700 text-white hover:bg-purple-500":
          variant === "contained",
        "border border-neutral-200 text-neutral-900 hover:bg-neutral-100":
          variant === "outlined",
        "text-neutral-900 hover:bg-neutral-100": variant === "text",
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
