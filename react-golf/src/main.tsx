import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import ErrorPage from "./routes/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LevelTutorial from "./routes/levels/LevelTutorial";
import Level1 from "./routes/levels/1/Level1";
import Level2 from "./routes/levels/1/Level2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LevelTutorial /> },
      {
        path: "level/1",
        element: <Level1 />,
      },
      {
        path: "level/2",
        element: <Level2 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
