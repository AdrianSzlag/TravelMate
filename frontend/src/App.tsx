import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { FocusProvider } from "./store/focus-context";
import { SearchProvider } from "./store/search-context";
import Login, { loader as loginLoader } from "./pages/Login";
import { removeToken } from "./utils/auth";

const logout = () => {
  removeToken();
  return redirect("/login");
};

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Home />, id: "home" },
  { path: "/login", element: <Login />, id: "login", loader: loginLoader },
  { path: "/logout", id: "logout", loader: logout},
  { path: "*", element: <div>Not found</div>, id: "not-found" },
]);

function App() {
  return (
    <SearchProvider>
      <FocusProvider>
        <RouterProvider router={BrowserRouter} />
      </FocusProvider>
    </SearchProvider>
  );
}

export default App;
