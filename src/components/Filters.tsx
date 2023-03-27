import React from "react";
import { useEffect, useState } from "react";
import useResults from "../hooks/useResults";

const Filters = () => {
  const { searchQuery, setSearchQuery } = useResults();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(searchQuery);
  }, []);

  return (
    <form className="flex h-fit w-[250px] flex-col gap-2 bg-yellow-400 px-4 py-5">
      <h2 className="text-xl font-medium ">Search</h2>
      <input
        type="text"
        className="w-full rounded border px-1 py-0.5"
        name="destination"
        placeholder="Anything.."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="mt-20 w-full bg-blue-700 p-2 text-center text-white transition-colors hover:bg-blue-900"
        onClick={(e) => {
          e.preventDefault();
          setSearchQuery(value);
        }}
      >
        Search
      </button>
    </form>
  );
};
export default Filters;
