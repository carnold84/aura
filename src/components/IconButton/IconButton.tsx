import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import cn from "../../utils/cn";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: "outlined" | "plain";
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, variant = "plain", ...rest }, ref) => {
    return (
      <button
        className={cn(
          "shrink-0 rounded-xl p-2 text-neutral-400 hover:bg-slate-100 hover:text-neutral-800",
          {
            "border border-neutral-300": variant === "outlined",
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default IconButton;
