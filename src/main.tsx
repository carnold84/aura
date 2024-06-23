import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";

import Router from "./Router";
import SnackbarProvider from "./components/SnackbarProvider";
import AuthProvider from "./context/AuthProvider";
import "./index.css";
import DataProvider from "./stores/data";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Suspense fallback={"Loading..."}>
        <AuthProvider>
          <SnackbarProvider>
            <DataProvider>
              <Router />
            </DataProvider>
          </SnackbarProvider>
        </AuthProvider>
      </Suspense>
    </StrictMode>,
  );
}
