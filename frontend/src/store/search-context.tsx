import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IPlace } from "../types/types";
import useApi from "../hooks/use-api";

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

const SearchProvider = ({ children }: Props) => {
  const { data, loading, error, fetch } = useApi<IPlace[]>("/api/search", {
    method: "POST",
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch({ searchQuery: searchQuery });
  }, [searchQuery]);

  const value = useMemo(() => {
    console.log("data", data);
    return {
      results: data ? data : [],
      searchQuery,
      setSearchQuery,
    } as ResultsContextType;
  }, [searchQuery, data]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export { SearchProvider };
const useSearch = () => useContext(SearchContext);
export default useSearch;
