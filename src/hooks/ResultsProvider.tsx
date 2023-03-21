import { createContext, ReactNode, useContext, useMemo } from "react";
import { Result } from "../types/types";

interface ResultsContextType {
  results: Result[];
}

const ResultsContext = createContext<ResultsContextType>({ results: [] });

interface Props {
  children: ReactNode;
}

const ResultsProvider = ({ children }: Props) => {
  const value = useMemo(() => {
    return {
      results: [],
    } as ResultsContextType;
  }, []);
  
  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
};

export { ResultsProvider };
export const useResults = () => useContext(ResultsContext);
