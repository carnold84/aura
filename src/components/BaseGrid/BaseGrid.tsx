import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import cn from "../../utils/cn";

interface BaseGridItemProps extends ComponentPropsWithoutRef<"li"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

const BaseGridItem = ({
  asChild = false,
  children,
  className,
  ...rest
}: BaseGridItemProps) => {
  const Comp = asChild ? Slot : "li";
  return (
    <Comp className={className} {...rest}>
      {children}
    </Comp>
  );
};

export interface BaseGridRootProps extends ComponentPropsWithoutRef<"ul"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

const BaseGrid = ({
  asChild = false,
  children,
  className,
  ...rest
}: BaseGridRootProps) => {
  const Comp = asChild ? Slot : "ul";
  return (
    <Comp
      className={cn(
        "grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
};

BaseGrid.Item = BaseGridItem;

export default BaseGrid;
