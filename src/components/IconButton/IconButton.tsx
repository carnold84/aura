import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

import cn from "../../utils/cn";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        className={cn(
          "relative shrink-0 p-1.5 text-neutral-400 before:-bottom-0 before:border-b before:border-neutral-600 hover:text-neutral-800",
          "before:absolute before:left-0 before:w-full before:origin-left before:scale-x-0 before:content-normal before:transition-transform before:duration-200 before:ease-out before:hover:scale-x-100",
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
