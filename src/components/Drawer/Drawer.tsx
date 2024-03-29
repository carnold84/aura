import {
  Close,
  Content,
  Description,
  DialogTitleProps,
  Overlay,
  Portal,
  DialogContentProps as RadixDialogContentProps,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Xmark } from "iconoir-react";
import { ComponentPropsWithRef, ReactNode } from "react";

import cn from "../../utils/cn";
import IconButton from "../IconButton";

interface DrawerBodyProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
  className?: string;
}

const DrawerBody = ({ children, className, ...rest }: DrawerBodyProps) => {
  return (
    <div className={cn("grow px-10 py-5", className)} {...rest}>
      {children}
    </div>
  );
};

interface DrawerContentProps extends RadixDialogContentProps {
  className?: string;
  description?: string;
}

const DrawerContent = ({
  children,
  className,
  description,
  ...rest
}: DrawerContentProps) => {
  return (
    <Portal>
      <Overlay className="fixed inset-0 bg-black/25 data-[state=closed]:animate-overlayHide data-[state=open]:animate-overlayShow" />
      <Content
        className={cn(
          "data-[state=closed]:animate-drawerContentHide data-[state=open]:animate-drawerContentShow fixed left-0 top-0 flex h-full w-full max-w-80 flex-col bg-white shadow-xl focus:outline-none",
          className,
        )}
        {...rest}
      >
        {children}
        {description && (
          <VisuallyHidden>
            <Description>{description}</Description>
          </VisuallyHidden>
        )}
      </Content>
    </Portal>
  );
};

interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

const DrawerFooter = ({ children, className, ...rest }: DrawerFooterProps) => {
  return (
    <footer
      className={cn(
        "flex shrink-0 justify-end border-t border-t-neutral-200 px-6 py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </footer>
  );
};

interface DrawerTitleProps extends DialogTitleProps {
  className?: string;
}

const DrawerTitle = ({ children, className, ...rest }: DrawerTitleProps) => {
  return (
    <Title
      className={cn(
        "font-display text-lg font-light text-neutral-600",
        className,
      )}
      {...rest}
    >
      {children}
    </Title>
  );
};

interface DrawerHeaderProps {
  children?: ReactNode;
  className?: string;
}

const DrawerHeader = ({ children, className, ...rest }: DrawerHeaderProps) => {
  return (
    <header
      className={cn(
        "flex shrink-0 items-center justify-between py-5 pl-7 pr-5",
        className,
      )}
      {...rest}
    >
      <div>{children}</div>
      <Close asChild={true}>
        <IconButton>
          <Xmark />
        </IconButton>
      </Close>
    </header>
  );
};

const Drawer = Object.assign(Root, {
  Body: DrawerBody,
  Close,
  Content: DrawerContent,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Trigger: Trigger,
});

export default Drawer;
