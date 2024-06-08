import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import RootLayout from "./routes/RootLayout";

/* import DashboardRoute from "./routes/dashboard/DashboardRoute";
import ImagesRoute from "./routes/images/ImagesRoute";
import ImageRoute from "./routes/images/ImageRoute";
import ProjectRoute from "./routes/projects/ProjectRoute/ProjectRoute";
import ProjectsRoute from "./routes/projects/ProjectsRoute/ProjectsRoute"; */

const DashboardRoute = lazy(() => import("./routes/dashboard/DashboardRoute"));
const ImagesRoute = lazy(() => import("./routes/images/ImagesRoute"));
const ImageRoute = lazy(() => import("./routes/images/ImageRoute"));
const ProjectRoute = lazy(
  () => import("./routes/projects/ProjectRoute/ProjectRoute"),
);
const ProjectsRoute = lazy(
  () => import("./routes/projects/ProjectsRoute/ProjectsRoute"),
);

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
          {
            path: ":projectId/images/:imageId",
            element: <ImageRoute />,
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

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
