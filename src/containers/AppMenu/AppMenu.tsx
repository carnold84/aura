import {
  Close,
  Content,
  DialogProps,
  DialogTriggerProps,
  Portal,
  DialogContentProps as RadixDialogContentProps,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Xmark } from "iconoir-react";
import { Link, To } from "react-router-dom";

import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import LogoLink from "../../components/LogoLink";
import { useAuth } from "../../context/AuthProvider";
import cn from "../../utils/cn";

interface Route {
  label: string;
  to: To;
}

interface AppMenuContentProps extends RadixDialogContentProps {
  className?: string;
  onClose?: () => void;
  routes: Route[];
}

const AppMenuContent = ({
  className,
  onClose,
  routes,
  ...rest
}: AppMenuContentProps) => {
  const { signOut } = useAuth();

  return (
    <Portal>
      <Content
        className={cn(
          "data-[state=closed]:animate-appMenuHide data-[state=open]:animate-appMenuShow fixed left-0 top-0 flex h-full w-full flex-col justify-center bg-neutral-900 focus:outline-none",
          className,
        )}
        {...rest}
      >
        <header className="flex shrink-0 items-center justify-between py-16 pl-20 pr-16">
          <div className="flex h-full items-center">
            <VisuallyHidden>
              <Title>Menu</Title>
            </VisuallyHidden>
            <LogoLink
              className="text-neutral-50 hover:text-primary-500"
              onClick={onClose}
            />
          </div>
          <Close asChild={true}>
            <IconButton className="text-neutral-500 hover:bg-neutral-800 hover:text-neutral-50">
              <Xmark />
            </IconButton>
          </Close>
        </header>
        <div className="grow px-20">
          <ul className="flex flex-col gap-8">
            {routes.map(({ label, to }) => {
              return (
                <li key={label}>
                  <Link
                    className="font-display text-8xl font-extralight text-neutral-400 hover:text-neutral-100"
                    onClick={onClose}
                    to={to}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <footer className="flex shrink-0 p-6">
          <Button
            className="text-neutral-400 hover:text-neutral-200 hover:decoration-neutral-200"
            onClick={signOut}
            variant="link"
          >
            Sign Out
          </Button>
        </footer>
      </Content>
    </Portal>
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
  Content: AppMenuContent,
  Trigger: AppMenuTrigger,
});

export default AppMenu;
