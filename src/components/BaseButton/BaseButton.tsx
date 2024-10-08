import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import cn from "../../utils/cn";

export interface BaseButtonProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: "lg" | "sm";
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      asChild = false,
      children,
      className,
      contentClassName,
      iconLeft,
      iconRight,
      size = "sm",
      ...rest
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "relative z-0 flex shrink-0 items-center justify-center gap-0.5 font-display font-light transition-colors duration-200 focus:outline-none",
          {
            "px-0": !iconLeft && !iconRight,
            "text-sm": size === "sm",
            "text-base": size === "lg",
          },
          className,
        )}
        {...rest}
        ref={ref}
      >
        <span
          className={cn(
            "z-10 flex items-center gap-1",
            {
              "pr-1.5": iconLeft && !iconRight,
              "pl-1.5": !iconLeft && iconRight,
              "px-0": !iconLeft && !iconRight,
            },
            contentClassName,
          )}
        >
          {iconLeft}
          {children}
          {iconRight}
        </span>
      </Comp>
    );
  },
);

export default BaseButton;
