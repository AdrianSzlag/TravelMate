import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { IPlace } from "../types/types";

interface ResultsContextType {
  results: IPlace[];
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
    coordinates: [19.99629671664809, 50.08399993925693],
  },
  {
    id: 2,
    name: "Hotel Heron",
    description: "Simple hotel.",
    type: "hotel",
    thumbnail: "hotel.png",
    coordinates: [19.94173898739982, 50.071942298900524],
  },
  {
    id: 3,
    name: "Beef Bar",
    description: "Simple Bar.",
    type: "bar",
    thumbnail: "hotel.png",
    coordinates: [19.941015236678783, 50.06301434728838],
  },
] as IPlace[];

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
