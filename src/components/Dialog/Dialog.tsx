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
          "fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-white shadow-xl focus:outline-none data-[state=closed]:animate-dialogContentHide data-[state=open]:animate-dialogContentShow",
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
        "flex justify-end gap-2 border-t border-t-neutral-200 p-4",
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
        "flex items-center justify-between border-b border-b-neutral-200 px-6 py-4",
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
