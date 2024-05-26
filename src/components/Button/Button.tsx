import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import cn from "../../utils/cn";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  variant?: "contained" | "outlined" | "text" | "link";
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
          "flex shrink-0 items-center justify-center gap-1 px-4 py-1.5 font-display text-sm font-light",
          {
            "border border-primary-700 bg-primary-700 text-white hover:border-primary-500 hover:bg-primary-500":
              variant === "contained",
            "border border-neutral-200 text-neutral-900 hover:bg-neutral-100":
              variant === "outlined",
            "text-neutral-900 hover:bg-neutral-100": variant === "text",
            "text-neutral-700 underline decoration-neutral-400 underline-offset-4 hover:text-primary-700 hover:decoration-primary-500":
              variant === "link",
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
