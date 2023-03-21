import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { Result } from "../types/types";

interface ResultsContextType {
  results: Result[];
  searchQuery: string;
  setSearchQuery: (search: string) => void;
}

const ResultsContext = createContext<ResultsContextType>({
  results: [],
  searchQuery: "",
  setSearchQuery: (search: string) => {},
});

interface Props {
  children: ReactNode;
}

const places = [
  {
    id: 1,
    name: "Hotel Wisla",
    description: "Simple hotel.",
    type: "hotel",
  },
  {
    id: 2,
    name: "Hotel Heron",
    description: "Simple hotel.",
    type: "hotel",
  },
  {
    id: 3,
    name: "Beef Bar",
    description: "Simple Bar.",
    type: "bar",
  },
] as Result[];
const getRes = (searchQuery: string) => {
  return places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery)
  );
};

const ResultsProvider = ({ children }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const value = useMemo(() => {
    return {
      results: getRes(searchQuery),
      searchQuery: searchQuery,
      setSearchQuery: setSearchQuery,
    } as ResultsContextType;
  }, [searchQuery]);

  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
};

export { ResultsProvider };
const useResults = () => useContext(ResultsContext);
export default useResults;
