import "./App.css";
import { ResultsProvider } from "./hooks/ResultsProvider";
import Header from "./components/Header";

function App() {
  return (
    <div className="">
      <Header />
      <ResultsProvider>sdf</ResultsProvider>
    </div>
  );
}

export default App;
