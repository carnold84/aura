import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthProvider";

const RootLayout = () => {
  const { signOut } = useAuth();

  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to={"/projects"}>Projects</Link>
        <Link to={"/images"}>Images</Link>
        <button onClick={signOut}>Log Out</button>
      </div>
      <hr />
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
    </>
  );
};

export default RootLayout;
