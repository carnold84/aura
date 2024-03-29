import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import cn from "../../utils/cn";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  variant?: "contained" | "outlined" | "text";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, children, className, variant = "outlined", ...rest },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "font-display flex shrink-0 justify-center rounded-xl px-3 py-2 text-sm font-light",
          {
            "border-primary-700 bg-primary-700 hover:border-primary-500 hover:bg-primary-500 border text-white":
              variant === "contained",
            "border border-neutral-300 text-neutral-900 hover:bg-neutral-100":
              variant === "outlined",
            "text-neutral-900 hover:bg-neutral-100": variant === "text",
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Comp>
    );
  },
);

export default Button;
