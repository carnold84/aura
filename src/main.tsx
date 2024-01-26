import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import RootLayout from "./routes/RootLayout";

const Dashboard = lazy(() => import("./routes/dashboard/Dashboard"));
const Images = lazy(() => import("./routes/images/Images"));
const Image = lazy(() => import("./routes/images/Image"));
const Links = lazy(() => import("./routes/links/Image"));
const Project = lazy(() => import("./routes/projects/Project"));
const Projects = lazy(() => import("./routes/projects/Projects"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "projects",
        children: [
          {
            path: "",
            element: <Projects />,
          },
          {
            path: ":projectId",
            element: <Project />,
          },
        ],
      },
      {
        path: "images",
        children: [
          {
            path: "",
            element: <Images />,
          },
          {
            path: ":imageId",
            element: <Image />,
          },
        ],
      },
      {
        path: "links",
        element: <Links />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense fallback={"Loading..."}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </Suspense>
    </StrictMode>,
  );
}
