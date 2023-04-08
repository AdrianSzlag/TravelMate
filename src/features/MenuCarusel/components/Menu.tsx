import { useState } from "react";
import Filters from "./Filters";
import ResultList from "../../../components/ResultList";
import useFocus from "../../../store/focus-context";
import useSearch from "../../../store/search-context";
import BackButton from "./BackButton";
import Carusel from "./Carusel";
import CaruselItem from "./CaruselItem";

const Menu = () => {
  const { results } = useSearch();
  const { focused, setFocused } = useFocus();
  const [active, setActive] = useState(false);

  return (
    <Carusel>
      <CaruselItem>
        <Filters onSubmit={() => setActive(true)} />
      </CaruselItem>
      {active && (
        <CaruselItem>
          <BackButton onClick={() => setActive(false)} />
          <ResultList />
        </CaruselItem>
      )}
      {active && focused != null && (
        <CaruselItem>
          <BackButton onClick={() => setFocused(null)} />
          <div>hello</div>
        </CaruselItem>
      )}
    </Carusel>
  );
};

export default Menu;
