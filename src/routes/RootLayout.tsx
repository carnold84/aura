import { Menu } from "iconoir-react";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";

import IconButton from "../components/IconButton";
import LogoLink from "../components/LogoLink";
import Spinner from "../components/Spinner";
import AppMenu from "../containers/AppMenu";

const routes = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Images", to: "/images" },
];

const RootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col gap-3">
      <header className="ms:pb-2 flex justify-between p-5 md:p-12">
        <div className="flex items-center gap-3">
          <AppMenu
            onOpenChange={(open) => setIsMenuOpen(open)}
            open={isMenuOpen}
          >
            <AppMenu.Trigger>
              <IconButton variant="outlined">
                <Menu className="h-5 w-5 text-neutral-600" />
              </IconButton>
            </AppMenu.Trigger>
            <AppMenu.Content
              routes={routes}
              onClose={() => setIsMenuOpen(false)}
            />
          </AppMenu>
          <LogoLink />
        </div>
      </header>
      <main className="flex grow justify-center">
        <div className="w-full max-w-[1680px] p-5 pt-0 md:p-12">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
