import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import cn from "../../utils/cn";

interface PageTitleProps extends ComponentPropsWithoutRef<"h1"> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

const PageTitle = ({
  asChild = false,
  children,
  className,
  ...rest
}: PageTitleProps) => {
  const Comp = asChild ? Slot : "h1";

  return (
    <Comp
      className={cn(
        "font-display text-4xl font-light uppercase text-neutral-600 md:text-5xl",
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
};

interface PageHeaderProps extends ComponentPropsWithoutRef<"header"> {
  children: ReactNode;
  className?: string;
}

const PageHeader = ({ children, className, ...rest }: PageHeaderProps) => {
  return (
    <header
      className={cn("flex items-center justify-between gap-5", className)}
      {...rest}
    >
      {children}
    </header>
  );
};

interface PageHeaderControlsProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

const PageHeaderControls = ({
  children,
  className,
  ...rest
}: PageHeaderControlsProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...rest}>
      {children}
    </div>
  );
};

interface PageContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

const PageContent = ({ children, className, ...rest }: PageContentProps) => {
  return (
    <div className={cn("grow", className)} {...rest}>
      {children}
    </div>
  );
};

interface PageRootProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

const PageRoot = ({ children, className, ...rest }: PageRootProps) => {
  return (
    <div className={cn("flex flex-col gap-5", className)} {...rest}>
      {children}
    </div>
  );
};

PageRoot.Content = PageContent;
PageRoot.Header = PageHeader;
PageRoot.HeaderControls = PageHeaderControls;
PageRoot.Title = PageTitle;

export default PageRoot;
