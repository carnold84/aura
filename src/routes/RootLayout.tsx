import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "iconoir-react";
import { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import LogoLink from "../components/LogoLink";
import Spinner from "../components/Spinner";
import TextButton from "../components/TextButton";
import AppMenu from "../containers/AppMenu";
import { useAuth } from "../context/AuthProvider";
import ImageListDialog from "./projects/ProjectRoute/components/ImageListDialog";

const routes = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Images", to: "/images" },
];

const RootLayout = () => {
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col gap-5">
      <header className="flex h-24 justify-between md:h-32">
        <div className="absolute left-10 top-11 md:left-20 md:top-16">
          <LogoLink />
        </div>
        <div className="absolute right-10 top-10 md:hidden">
          <AppMenu
            onOpenChange={(open) => setIsMenuOpen(open)}
            open={isMenuOpen}
          >
            <AppMenu.Trigger>
              <TextButton iconLeft={<Menu className="mx-1 h-4 w-4" />}>
                Menu
              </TextButton>
            </AppMenu.Trigger>
            <AppMenu.Content>
              <header className="flex h-24 shrink-0 items-center justify-between md:h-32">
                <div className="flex h-full items-center">
                  <VisuallyHidden>
                    <AppMenu.Title>Menu</AppMenu.Title>
                  </VisuallyHidden>
                  <LogoLink
                    className="absolute left-10 top-11 text-neutral-50 hover:text-primary-500 md:left-20 md:top-16"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
              </header>
              <div className="grow px-8 md:px-20">
                <ul className="flex flex-col gap-4 md:gap-8">
                  {routes.map(({ label, to }) => {
                    return (
                      <li key={label}>
                        <Link
                          className="font-display text-6xl font-extralight text-neutral-400 hover:text-neutral-100 md:text-8xl"
                          onClick={() => setIsMenuOpen(false)}
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
                <TextButton onClick={signOut}>Sign Out</TextButton>
              </footer>
              <AppMenu.CloseButton className="absolute right-10 top-10" />
            </AppMenu.Content>
          </AppMenu>
        </div>
        <ul className="absolute right-20 top-16 hidden gap-6 md:flex">
          {routes.map(({ label, to }) => {
            return (
              <li key={label}>
                <TextButton asChild={true}>
                  <Link onClick={() => setIsMenuOpen(false)} to={to}>
                    {label}
                  </Link>
                </TextButton>
              </li>
            );
          })}
        </ul>
      </header>
      <main className="flex grow justify-center">
        <div className="flex w-full max-w-[1680px] px-10 pb-10 pt-0 md:px-20 md:pb-20">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <ImageListDialog />
    </div>
  );
};

export default RootLayout;
