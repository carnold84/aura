import { forwardRef } from "react";

import cn from "../../utils/cn";
import BaseButton, { BaseButtonProps } from "../BaseButton/BaseButton";

interface TextButtonProps extends BaseButtonProps {
  isInverted?: boolean;
}

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ children, className, isInverted, ...rest }, ref) => {
    return (
      <BaseButton
        className={cn(
          "text-neutral-950 before:-bottom-1.5 before:border-b before:border-neutral-600",
          "before:absolute before:w-full before:origin-left before:scale-x-0 before:content-normal before:transition-transform before:duration-200 before:ease-out before:hover:scale-x-100",
          {
            "text-neutral-300 before:border-neutral-300": isInverted === true,
          },
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </BaseButton>
    );
  },
);

export default TextButton;
