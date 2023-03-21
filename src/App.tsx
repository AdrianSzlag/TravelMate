import "./App.css";
import { ResultsProvider } from "./hooks/useResults";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Results from "./components/ResultList";

function App() {
  return (
    <div className="">
      <Header />
      <ResultsProvider>
        <div className="flex  md:mt-4 md:gap-4">
          <Filters />
          <Results />
        </div>
      </ResultsProvider>
    </div>
  );
}

export default App;
