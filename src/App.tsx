import React, { useState } from "react";
import "./App.css";
import { SearchProvider } from "./store/search-context";
import Header from "./features/Header";
import Filters from "./features/MenuCarusel/components/Filters";
import Results from "./components/ResultList";
import { Menu } from "./features/MenuCarusel";
import Map from "./features/Map";

function App() {
  const [slide, setSlide] = useState(2);

  return (
    <div className="flex h-full w-full flex-col bg-gray-200">
      <Header />
      <SearchProvider>
        <div className="flex">
          <Menu />
          <Map />
        </div>
      </SearchProvider>
    </div>
  );
}

export default App;
