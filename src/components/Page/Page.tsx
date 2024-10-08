import { Slot } from "@radix-ui/react-slot";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import cn from "../../utils/cn";
import BaseGrid from "../BaseGrid";
import { BaseGridRootProps } from "../BaseGrid/BaseGrid";
import LoadingScreen from "../LoadingScreen";

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
        "font-display text-2xl font-light text-neutral-600 md:text-6xl md:font-light",
        className,
      )}
      {...rest}
    >
      {!children && <span className="h-6 w-28 bg-neutral-100" />}
      {children}
    </Comp>
  );
};

interface PageEmptyMessageProps extends ComponentPropsWithoutRef<"header"> {
  children: ReactNode;
  className?: string;
  description: string;
  title: string;
}

const PageEmptyMessage = ({
  children,
  className,
  description,
  title,
  ...rest
}: PageEmptyMessageProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-5",
        className,
      )}
      {...rest}
    >
      <div className="mb-10 flex max-w-[768px] flex-col items-center gap-3">
        <h2 className="text-center font-display text-2xl">{title}</h2>
        <p className="text-center font-display text-lg">{description}</p>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
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

const PageGrid = ({ children }: BaseGridRootProps) => {
  return (
    <BaseGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </BaseGrid>
  );
};

interface PageContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

const PageContent = ({
  children,
  className,
  isLoading = false,
  ...rest
}: PageContentProps) => {
  return (
    <div className={cn("relative grow overflow-hidden", className)} {...rest}>
      {isLoading ? <LoadingScreen /> : children}
    </div>
  );
};

interface PageRootProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

const PageRoot = ({ children, className, ...rest }: PageRootProps) => {
  return (
    <div className={cn("flex grow flex-col gap-8", className)} {...rest}>
      {children}
    </div>
  );
};

PageRoot.Content = PageContent;
PageRoot.EmptyMessage = PageEmptyMessage;
PageRoot.Header = PageHeader;
PageRoot.HeaderControls = PageHeaderControls;
PageRoot.Grid = PageGrid;
PageRoot.GridItem = BaseGrid.Item;
PageRoot.Title = PageTitle;

export default PageRoot;
