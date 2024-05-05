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
        "flex aspect-video h-full min-h-24 w-auto items-center justify-center overflow-hidden border border-neutral-100 text-neutral-300 transition-transform duration-200 group-hover:scale-95 sm:min-h-48 md:w-full",
        className,
      )}
    >
      {src && (
        <img
          className={cn(
            "w-full bg-cover transition-transform duration-200 group-hover:scale-110",
            className,
          )}
          src={src}
          {...rest}
        />
      )}
      {!src && (
        <MediaImage className="transition-transform duration-200 group-hover:scale-110" />
      )}
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
      className={cn(
        "font-display text-lg font-light text-neutral-800",
        className,
      )}
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
    <div className={cn("group flex gap-3 md:flex-col", className)} {...rest}>
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
