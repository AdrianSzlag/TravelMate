import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { FocusProvider } from "./store/focus-context";
import { SearchProvider } from "./store/search-context";

const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Home />, id: "home" },
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
