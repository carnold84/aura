import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, User } from "iconoir-react";
import { Suspense, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Drawer from "../components/Drawer";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthProvider";

const LogoLink = ({ ...rest }) => {
  return (
    <Link className="text-neutral-600 hover:text-neutral-900" to="/" {...rest}>
      <Logo />
    </Link>
  );
};

const RootLayout = () => {
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col gap-3">
      <header className="flex justify-between p-5 lg:p-12">
        <div className="flex items-center gap-3">
          <Drawer
            onOpenChange={(open) => setIsMenuOpen(open)}
            open={isMenuOpen}
          >
            <Drawer.Trigger asChild={true}>
              <IconButton variant="outlined">
                <Menu className="h-5 w-5 text-neutral-600" />
              </IconButton>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <VisuallyHidden>
                  <Drawer.Title>Menu</Drawer.Title>
                </VisuallyHidden>
                <LogoLink onClick={() => setIsMenuOpen(false)} />
              </Drawer.Header>
              <Drawer.Body>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      className="font-display text-2xl font-extralight text-neutral-500 hover:text-neutral-800"
                      onClick={() => setIsMenuOpen(false)}
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-display text-2xl font-extralight text-neutral-500 hover:text-neutral-800"
                      onClick={() => setIsMenuOpen(false)}
                      to={"/projects"}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="font-display text-2xl font-extralight text-neutral-500 hover:text-neutral-800"
                      onClick={() => setIsMenuOpen(false)}
                      to={"/images"}
                    >
                      Images
                    </Link>
                  </li>
                </ul>
              </Drawer.Body>
              <Drawer.Footer>
                <button className="flex gap-2" onClick={signOut}>
                  <User />
                </button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>
          <LogoLink />
        </div>
      </header>
      <main className="flex grow justify-center">
        <div className="w-full max-w-[1680px] p-5 pt-0 lg:p-12">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
