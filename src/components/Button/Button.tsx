import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import cn from "../../utils/cn";
import classes from "./Button.module.css";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  variant?: "link" | "outlined" | "text";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      iconLeft,
      iconRight,
      variant = "outlined",
      ...rest
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          classes.base,
          {
            [classes.link]: variant === "link",
            [classes.outlined]: variant === "outlined",
            [classes.text]: variant === "text",
            [classes.iconBoth]: !iconLeft && !iconRight,
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        <span
          className={cn(classes.content, {
            [classes.iconLeft]: iconLeft && !iconRight,
            [classes.iconRight]: !iconLeft && iconRight,
            [classes.iconBoth]: !iconLeft && !iconRight,
          })}
        >
          {iconLeft}
          {children}
          {iconRight}
        </span>
      </Comp>
    );
  },
);

export default Button;
