import { forwardRef } from "react";

import cn from "../../utils/cn";
import BaseButton, { BaseButtonProps } from "../BaseButton/BaseButton";

interface PrimaryButtonProps extends BaseButtonProps {
  isInverted?: boolean;
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <BaseButton
        className={cn(
          "hover_bg_anim border border-neutral-950 px-4 py-1.5 text-neutral-950 hover:text-white ",
          "before:absolute before:top-0 before:h-full before:w-full before:origin-left before:scale-x-0 before:content-normal before:bg-neutral-950 before:transition-transform before:duration-200 before:ease-out before:hover:scale-x-100",
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

export default PrimaryButton;
