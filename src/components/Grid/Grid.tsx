import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import cn from "../../utils/cn";

interface GridItemProps extends ComponentPropsWithoutRef<"li"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

const GridItem = ({
  asChild = false,
  children,
  className,
  ...rest
}: GridItemProps) => {
  const Comp = asChild ? Slot : "li";
  return (
    <Comp className={className} {...rest}>
      {children}
    </Comp>
  );
};

interface GridRootProps extends ComponentPropsWithoutRef<"ul"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

const GridRoot = ({
  asChild = false,
  children,
  className,
  ...rest
}: GridRootProps) => {
  const Comp = asChild ? Slot : "ul";
  return (
    <Comp
      className={cn(
        "grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
};

GridRoot.Item = GridItem;

export default GridRoot;
