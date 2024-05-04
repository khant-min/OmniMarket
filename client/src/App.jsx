import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/common/MainLayout";
import Home from "./pages/Home";
import "./App.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <div>about</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
