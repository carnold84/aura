import {
  DialogContentProps as AppMenuContentProps,
  Close,
  Content,
  DialogCloseProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { Xmark } from "iconoir-react";

import TextButton from "../../components/TextButton";
import cn from "../../utils/cn";

const AppMenuContent = ({
  children,
  className,
  ...rest
}: AppMenuContentProps) => {
  return (
    <Portal>
      <Content
        className={cn(
          "fixed left-0 top-0 flex h-full w-full flex-col justify-center bg-neutral-900 focus:outline-none data-[state=closed]:animate-appMenuHide data-[state=open]:animate-appMenuShow",
          className,
        )}
        {...rest}
      >
        {children}
      </Content>
    </Portal>
  );
};

const AppMenuCloseButton = ({
  className,
  ...rest
}: Omit<DialogCloseProps, "asChild">) => {
  return (
    <Close asChild={true} {...rest}>
      <TextButton
        className={cn("gap-1", className)}
        iconLeft={<Xmark className="h-5 w-5" />}
        isInverted={true}
      >
        Close
      </TextButton>
    </Close>
  );
};

const AppMenuTitle = ({
  children,
  ...rest
}: Omit<DialogTitleProps, "asChild">) => {
  return (
    <Title asChild={true} {...rest}>
      {children}
    </Title>
  );
};

const AppMenuTrigger = ({
  children,
  ...rest
}: Omit<DialogTriggerProps, "asChild">) => {
  return (
    <Trigger asChild={true} {...rest}>
      {children}
    </Trigger>
  );
};

const AppMenuRoot = ({
  children,
  onOpenChange,
  open,
  ...rest
}: DialogProps) => {
  return (
    <Root onOpenChange={onOpenChange} open={open} {...rest}>
      {children}
    </Root>
  );
};

const AppMenu = Object.assign(AppMenuRoot, {
  CloseButton: AppMenuCloseButton,
  Content: AppMenuContent,
  Title: AppMenuTitle,
  Trigger: AppMenuTrigger,
});

export default AppMenu;
