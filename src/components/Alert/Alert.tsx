import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import cn from "../../utils/cn";

interface AlertProps extends ComponentPropsWithoutRef<"h2"> {
  asChild?: boolean;
  children: ReactNode;
  variant?: "error" | "success";
}

const Alert = forwardRef<HTMLHeadingElement, AlertProps>(
  (
    { asChild = false, children, className, variant = "success", ...rest },
    ref,
  ) => {
    const Comp = asChild ? Slot : "h2";
    return (
      <Comp
        className={cn(
          "mb-2 border px-3 py-2 text-sm font-light",
          {
            "border-success-200 bg-success-50 text-success-900":
              variant === "success",
            "border-error-200 bg-error-50 text-error-900": variant === "error",
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

export default Alert;
