import {
  Close,
  Content,
  Description,
  DialogProps,
  DialogTriggerProps,
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

interface DialogBodyProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
  className?: string;
}

const DialogBody = ({ children, className, ...rest }: DialogBodyProps) => {
  return (
    <div className={cn("px-10", className)} {...rest}>
      {children}
    </div>
  );
};

interface DialogContentProps extends RadixDialogContentProps {
  className?: string;
  description?: string;
  onCloseEnd?: () => void;
  onOpenEnd?: () => void;
}

const DialogContent = ({
  children,
  className,
  description,
  onCloseEnd,
  onOpenEnd,
  ...rest
}: DialogContentProps) => {
  return (
    <Portal>
      <Overlay className="fixed inset-0 bg-black/35 data-[state=closed]:animate-overlayHide data-[state=open]:animate-overlayShow" />
      <Content
        className={cn(
          "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white shadow-xl focus:outline-none data-[state=closed]:animate-dialogContentHide data-[state=open]:animate-dialogContentShow",
          className,
        )}
        onCloseAutoFocus={onCloseEnd}
        onOpenAutoFocus={onOpenEnd}
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

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

const DialogFooter = ({ children, className, ...rest }: DialogFooterProps) => {
  return (
    <footer
      className={cn(
        "flex items-center justify-end gap-5 px-10 py-10",
        className,
      )}
      {...rest}
    >
      {children}
    </footer>
  );
};

interface DialogHeaderProps {
  className?: string;
  isLoading?: boolean;
  title: string;
}

const DialogHeader = ({
  className,
  isLoading,
  title,
  ...rest
}: DialogHeaderProps) => {
  return (
    <header
      className={cn(
        "sticky left-0 top-0 z-10 flex items-center justify-between gap-5 bg-white py-7 pl-10 pr-10",
        className,
      )}
      {...rest}
    >
      {isLoading ? (
        <div className="h-4 w-full max-w-80 bg-neutral-200" />
      ) : (
        <Title className="font-display text-2xl font-light text-neutral-700">
          {title}
        </Title>
      )}
      <Close asChild={true}>
        <IconButton>
          <Xmark />
        </IconButton>
      </Close>
    </header>
  );
};

const DialogTrigger = ({ children, ...rest }: DialogTriggerProps) => {
  return <Trigger {...rest}>{children}</Trigger>;
};

const DialogRoot = ({ children, ...rest }: DialogProps) => {
  return <Root {...rest}>{children}</Root>;
};

const Dialog = Object.assign(DialogRoot, {
  Body: DialogBody,
  Close,
  Content: DialogContent,
  Footer: DialogFooter,
  Header: DialogHeader,
  Trigger: DialogTrigger,
});

export default Dialog;
