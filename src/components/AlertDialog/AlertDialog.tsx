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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
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
    <div className={cn("flex flex-col gap-1 px-7 pt-7", className)} {...rest}>
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
  description?: string;
}

const AlertDialogContent = ({
  children,
  className,
  description,
  ...rest
}: AlertDialogContentProps) => {
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

const AlertDialogDescription = ({
  children,
  className,
  ...rest
}: AlertDialogDescriptionProps) => {
  return (
    <Description
      className={cn("text-base text-neutral-600", className)}
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
      className={cn("flex justify-end gap-4 p-7 pt-5", className)}
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
      className={cn("text-lg font-medium text-neutral-700", className)}
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
