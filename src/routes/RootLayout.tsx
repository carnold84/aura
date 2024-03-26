import { User } from "iconoir-react";
import { Link, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";

const RootLayout = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex justify-between p-12">
        <Link to="/">Aura</Link>
        <div className="flex gap-8">
          <Link to="/">Home</Link> <Link to={"/projects"}>Projects</Link>
          <Link to={"/images"}>Images</Link>
          <button className="flex gap-2" onClick={signOut}>
            <User />
          </button>
        </div>
      </header>
      <main className="grow p-12 pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
