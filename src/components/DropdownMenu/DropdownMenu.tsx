import {
  Arrow,
  Content,
  DropdownMenuContentProps as ContentProps,
  DropdownMenuProps,
  Item,
  DropdownMenuItemProps as ItemProps,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dropdown-menu";

import cn from "../../utils/cn";

interface DropdownMenuItemProps extends ItemProps {
  className?: string;
}

const DropdownMenuItem = ({
  children,
  className,
  ...rest
}: DropdownMenuItemProps) => {
  return (
    <Item
      className={cn(
        "cursor-pointer px-4 py-3 font-display text-sm text-neutral-800 last:border-b-0 hover:bg-neutral-800 hover:text-white focus:outline-none",
        className,
      )}
      {...rest}
    >
      {children}
    </Item>
  );
};

interface DropdownMenuContentProps extends ContentProps {
  className?: string;
}

const DropdownMenuContent = ({
  children,
  className,
  ...rest
}: DropdownMenuContentProps) => {
  return (
    <Portal>
      <Content
        sideOffset={4}
        className={cn(
          "border border-neutral-800 bg-white shadow-md",
          className,
        )}
        {...rest}
      >
        {children}
        <Arrow className="fill-neutral-800" />
      </Content>
    </Portal>
  );
};

const DropdownMenu = ({ children, ...rest }: DropdownMenuProps) => {
  return <Root {...rest}>{children}</Root>;
};

DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Trigger = Trigger;

export default DropdownMenu;
