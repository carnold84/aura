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
    <div className={cn("px-7 py-7", className)} {...rest}>
      {children}
    </div>
  );
};

interface DialogContentProps extends RadixDialogContentProps {
  className?: string;
  description?: string;
}

const DialogContent = ({
  children,
  className,
  description,
  ...rest
}: DialogContentProps) => {
  return (
    <Portal>
      <Overlay className="fixed inset-0 bg-black/25 data-[state=closed]:animate-overlayHide data-[state=open]:animate-overlayShow" />
      <Content
        className={cn(
          "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl focus:outline-none data-[state=closed]:animate-dialogContentHide data-[state=open]:animate-dialogContentShow",
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

interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

const DialogFooter = ({ children, className, ...rest }: DialogFooterProps) => {
  return (
    <footer
      className={cn(
        "flex items-center justify-end gap-5 px-7 pb-7 pt-2",
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
  title: string;
}

const DialogHeader = ({ className, title, ...rest }: DialogHeaderProps) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between pl-7 pr-5 pt-4",
        className,
      )}
      {...rest}
    >
      <div>
        <Title className="font-display text-xl font-light text-neutral-700">
          {title}
        </Title>
      </div>
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
