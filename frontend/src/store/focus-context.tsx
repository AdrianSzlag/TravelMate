import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IPlace } from "../types/types";
import useSearch from "./search-context";

interface FocusContextType {
  focused: IPlace | null;
  setFocused: (focused: IPlace | null) => void;
}

const FocusContext = createContext<FocusContextType>({
  focused: null,
  setFocused: (focused: IPlace | null) => {},
});

interface Props {
  children: ReactNode;
}

const FocusProvider = ({ children }: Props) => {
  const [focusedItem, setFocusedItem] = useState<IPlace | null>(null);
  const { results } = useSearch();

  const setFocused = (focused: IPlace | null) => {
    console.log("setFocused", focused);
    console.log("results", results);

    const exists = results.filter((result) => result._id === focused?._id);
    if (exists.length > 0) {
      setFocusedItem(exists[0]);
    } else {
      setFocusedItem(null);
    }
  };

  useEffect(() => {
    if (focusedItem && !results.includes(focusedItem)) {
      setFocusedItem(null);
    }
  }, [results]);

  const value = useMemo(() => {
    return {
      focused: focusedItem,
      setFocused,
    };
  }, [focusedItem, results]);

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
};

export { FocusProvider };
const useFocus = () => useContext(FocusContext);
export default useFocus;
