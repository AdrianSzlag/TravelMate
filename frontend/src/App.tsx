import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login, { loader as loginLoader } from "./pages/Login";
import Register, { loader as registerLoader } from "./pages/Registration";
import store from "store";
import { authenticate, logout } from "store/auth-actions";
import { removeToken } from "utils/auth";
import { useEffect } from "react";
import { useAppDispatch } from "hooks/redux-hooks";

const logoutLoader = () => {
  removeToken();
  store.dispatch(logout());
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
  { path: "/logout", id: "logout", loader: logoutLoader },
  { path: "*", element: <div>Not found</div>, id: "not-found" },
]);

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authenticate());
  }, []);
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
