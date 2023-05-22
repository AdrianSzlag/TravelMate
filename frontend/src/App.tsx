import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login, { loader as loginLoader } from "./pages/Login";
import Register, { loader as registerLoader } from "./pages/Registration";
import { removeAuthData } from "./utils/auth";
import { getRedirectLoader } from "./utils/redirect";

const logout = () => {
  removeAuthData();
  return redirect("/login");
};

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Home />, id: "home" },
  { path: "/search", element: <Home />, id: "search" },
  { path: "/place/:placeId", element: <Home />, id: "place" },
  { path: "/login", element: <Login />, id: "login", loader: loginLoader },
  {
    path: "/register",
    element: <Register />,
    id: "register",
    loader: registerLoader,
  },
  { path: "/logout", id: "logout", loader: logout },
  { path: "*", element: <div>Not found</div>, id: "not-found" },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
