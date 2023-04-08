import React, { useState } from "react";
import "./App.css";
import { SearchProvider } from "./store/search-context";
import Header from "./features/Header";
import Filters from "./features/MenuCarusel/components/Filters";
import Results from "./features/MenuCarusel/components/Results/ResultList";
import { Menu } from "./features/MenuCarusel";
import Map from "./features/Map";
import { FocusProvider } from "./store/focus-context";

function App() {
  const [slide, setSlide] = useState(2);

  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col bg-gray-200 ">
      <Header />
      <SearchProvider>
        <FocusProvider>
          <div className="flex flex-1 flex-col-reverse xs:flex-row">
            <Menu />
            <Map />
          </div>
        </FocusProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
