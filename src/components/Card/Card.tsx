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

interface CardImgProps extends ComponentPropsWithoutRef<"img"> {
  className?: string;
}

const CardImg = ({ className, src, ...rest }: CardImgProps) => {
  return (
    <div
      className={cn(
        "flex aspect-[3/2] w-auto items-center justify-center overflow-hidden border border-neutral-400 text-neutral-300 transition-transform duration-200 group-hover:scale-95 md:w-full",
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

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className, ...rest }: CardProps) => {
  return (
    <div className={cn("group flex flex-col gap-3", className)} {...rest}>
      {children}
    </div>
  );
};

Card.Actions = CardActions;
Card.Content = CardContent;
Card.Img = CardImg;
Card.Title = CardTitle;

export default Card;
