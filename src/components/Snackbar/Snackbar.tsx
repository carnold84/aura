import {
  Action,
  Close,
  Description,
  Root,
  Title,
  ToastProps as ToastRootProps,
} from "@radix-ui/react-toast";
import { CheckCircle, Xmark, XmarkCircle } from "iconoir-react";

import cn from "../../utils/cn";

interface SnackbarProps extends ToastRootProps {
  alertType?: "error" | "success";
  description?: string;
  className?: string;
  title: string;
}

const SnackbarRoot = ({
  alertType = "success",
  description,
  className,
  title,
  ...rest
}: SnackbarProps) => {
  return (
    <Root
      className={cn(
        "data-[state=open]:animate-snackbarShow data-[state=closed]:animate-snackbarHide flex justify-between bg-neutral-900 px-5 py-5",
        {
          "bg-red-900": alertType === "error",
        },
        className,
      )}
      {...rest}
    >
      <Title
        className={cn(
          "flex items-center gap-2 font-display text-sm text-white",
        )}
      >
        {alertType === "error" ? <XmarkCircle /> : <CheckCircle />}
        {title}
      </Title>
      <Description>{description}</Description>
      <Close>
        <Xmark className="text-white" />
      </Close>
    </Root>
  );
};

const Snackbar = Object.assign(SnackbarRoot, {
  Action,
});

export default Snackbar;
