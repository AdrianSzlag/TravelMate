import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { PlaceData } from "../types/types";

interface ResultsContextType {
  results: PlaceData[];
  searchQuery: string;
  setSearchQuery: (search: string) => void;
}

const SearchContext = createContext<ResultsContextType>({
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
    thumbnail: "hotel.png",
  },
  {
    id: 2,
    name: "Hotel Heron",
    description: "Simple hotel.",
    type: "hotel",
    thumbnail: "hotel.png",
  },
  {
    id: 3,
    name: "Beef Bar",
    description: "Simple Bar.",
    type: "bar",
    thumbnail: "hotel.png",
  },
] as PlaceData[];

const getRes = (searchQuery: string) => {
  return places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery)
  );
};

const SearchProvider = ({ children }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const value = useMemo(() => {
    return {
      results: getRes(searchQuery),
      searchQuery: searchQuery,
      setSearchQuery: setSearchQuery,
    } as ResultsContextType;
  }, [searchQuery]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchProvider };
const useSearch = () => useContext(SearchContext);
export default useSearch;
