import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PlaceData } from "../types/types";
import useSearch from "./search-context";

interface FocusContextType {
  focused: PlaceData | null;
  setFocused: (focused: PlaceData | null) => void;
}

const FocusContext = createContext<FocusContextType>({
  focused: null,
  setFocused: (focused: PlaceData | null) => {},
});

interface Props {
  children: ReactNode;
}

const FocusProvider = ({ children }: Props) => {
  const [focusedItem, setFocusedItem] = useState<PlaceData | null>(null);
  const { results } = useSearch();

  const setFocused = (focused: PlaceData | null) => {
    if (focused && results.includes(focused)) {
      setFocusedItem(focused);
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
  }, [focusedItem]);

  return (
    <FocusContext.Provider value={value}>{children}</FocusContext.Provider>
  );
};

export { FocusProvider };
const useFocus = () => useContext(FocusContext);
export default useFocus;
