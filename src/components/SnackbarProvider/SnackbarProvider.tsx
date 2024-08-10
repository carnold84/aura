import { Provider, Viewport } from "@radix-ui/react-toast";
import { ReactNode } from "react";

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = ({ children, ...rest }: SnackbarProviderProps) => {
  return (
    <Provider {...rest}>
      {children}
      <Viewport className="fixed left-0 top-0 z-[2147483647] m-0 flex w-full list-none flex-col outline-none" />
    </Provider>
  );
};

export default SnackbarProvider;
