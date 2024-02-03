import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import RootLayout from "./routes/RootLayout";

const DashboardRoute = lazy(() => import("./routes/dashboard/DashboardRoute"));
const ImagesRoute = lazy(() => import("./routes/images/ImagesRoute"));
const ImageRoute = lazy(() => import("./routes/images/ImageRoute"));
const ProjectRoute = lazy(
  () => import("./routes/projects/ProjectRoute/ProjectRoute"),
);
const ProjectsRoute = lazy(
  () => import("./routes/projects/ProjectsRoute/ProjectsRoute"),
);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <DashboardRoute />,
      },
      {
        path: "projects",
        children: [
          {
            path: "",
            element: <ProjectsRoute />,
          },
          {
            path: ":projectId",
            element: <ProjectRoute />,
          },
        ],
      },
      {
        path: "images",
        children: [
          {
            path: "",
            element: <ImagesRoute />,
          },
          {
            path: ":imageId",
            element: <ImageRoute />,
          },
        ],
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
