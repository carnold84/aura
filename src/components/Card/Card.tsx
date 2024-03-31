import { Slot } from "@radix-ui/react-slot";
import { MediaImage } from "iconoir-react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import cn from "../../utils/cn";

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

const CardActions = ({ children, className, ...rest }: CardActionsProps) => {
  return (
    <div className={cn("flex justify-end gap-2 p-4", className)} {...rest}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

const CardContent = ({ children, className, ...rest }: CardContentProps) => {
  return (
    <div className={cn("flex flex-col gap-0", className)} {...rest}>
      {children}
    </div>
  );
};

interface CardImageProps extends ComponentPropsWithoutRef<"img"> {
  className?: string;
}

const CardImage = ({ className, src, ...rest }: CardImageProps) => {
  return (
    <div
      className={cn(
        "flex aspect-video h-full min-h-24 w-auto items-center justify-center border-none bg-neutral-50 text-neutral-400 sm:min-h-32 md:h-auto md:w-full",
        className,
      )}
    >
      {src && (
        <img className={cn("h-full w-full bg-cover", className)} {...rest} />
      )}
      {!src && <MediaImage />}
    </div>
  );
};

interface CardTitleProps {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}

const CardTitle = ({
  asChild,
  children,
  className,
  ...rest
}: CardTitleProps) => {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      className={cn("font-display text-lg text-neutral-800", className)}
      {...rest}
    >
      {children}
    </Comp>
  );
};

interface CardRootProps {
  children: ReactNode;
  className?: string;
}

const CardRoot = ({ children, className, ...rest }: CardRootProps) => {
  return (
    <div className={cn("flex gap-3 md:flex-col", className)} {...rest}>
      {children}
    </div>
  );
};

const Card = Object.assign(CardRoot, {
  Actions: CardActions,
  Content: CardContent,
  Image: CardImage,
  Title: CardTitle,
});

export default Card;
