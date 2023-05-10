import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home, { loader as HomeLoader } from "./pages/Home";
import { FocusProvider } from "./store/focus-context";
import { SearchProvider } from "./store/search-context";
import Login from "./pages/Login";

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Home />, id: "home", loader: HomeLoader },
  { path: "/login", element: <Login />, id: "login" },
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
