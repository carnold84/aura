import {
  Action,
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogDescriptionProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
  Cancel,
  Content,
  Description,
  Overlay,
  Portal,
  AlertDialogContentProps as RadixAlertDialogContentProps,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-alert-dialog";
import { ComponentPropsWithRef, ReactNode } from "react";

import cn from "../../utils/cn";
import PrimaryButton from "../PrimaryButton";
import TextButton from "../TextButton";

const AlertDialogAction = ({
  asChild = true,
  children,
  className,
  ...rest
}: AlertDialogActionProps) => {
  return (
    <Action asChild={asChild} className={className} {...rest}>
      <PrimaryButton>{children}</PrimaryButton>
    </Action>
  );
};

interface AlertDialogBodyProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
  className?: string;
}

const AlertDialogBody = ({
  children,
  className,
  ...rest
}: AlertDialogBodyProps) => {
  return (
    <div className={cn("flex flex-col gap-2 px-7 pt-7", className)} {...rest}>
      {children}
    </div>
  );
};

const AlertDialogCancel = ({
  asChild = true,
  children,
  className,
  ...rest
}: AlertDialogCancelProps) => {
  return (
    <Cancel asChild={asChild} className={className} {...rest}>
      <TextButton>{children}</TextButton>
    </Cancel>
  );
};

interface AlertDialogContentProps extends RadixAlertDialogContentProps {
  className?: string;
}

const AlertDialogContent = ({
  children,
  className,
  ...rest
}: AlertDialogContentProps) => {
  return (
    <Portal>
      <Overlay className="fixed inset-0 bg-black/35 data-[state=closed]:animate-overlayHide data-[state=open]:animate-overlayShow" />
      <Content
        className={cn(
          "fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl focus:outline-none data-[state=closed]:animate-dialogContentHide data-[state=open]:animate-dialogContentShow",
          className,
        )}
        {...rest}
      >
        {children}
      </Content>
    </Portal>
  );
};

const AlertDialogDescription = ({
  children,
  className,
  ...rest
}: AlertDialogDescriptionProps) => {
  return (
    <Description
      className={cn("text-sm text-neutral-600", className)}
      {...rest}
    >
      {children}
    </Description>
  );
};

interface AlertDialogFooterProps {
  children: ReactNode;
  className?: string;
}

const AlertDialogFooter = ({
  children,
  className,
  ...rest
}: AlertDialogFooterProps) => {
  return (
    <footer
      className={cn("flex items-center justify-end gap-4 p-7 pt-5", className)}
      {...rest}
    >
      {children}
    </footer>
  );
};

const AlertDialogTitle = ({
  children,
  className,
  ...rest
}: AlertDialogTitleProps) => {
  return (
    <Title
      className={cn(
        "font-display text-lg font-normal text-neutral-700",
        className,
      )}
      {...rest}
    >
      {children}
    </Title>
  );
};

const AlertDialogTrigger = ({ children, ...rest }: AlertDialogTriggerProps) => {
  return <Trigger {...rest}>{children}</Trigger>;
};

const AlertDialogRoot = ({ children, ...rest }: AlertDialogProps) => {
  return <Root {...rest}>{children}</Root>;
};

const AlertDialog = Object.assign(AlertDialogRoot, {
  Action: AlertDialogAction,
  Body: AlertDialogBody,
  Cancel: AlertDialogCancel,
  Content: AlertDialogContent,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Trigger: AlertDialogTrigger,
});

export default AlertDialog;
