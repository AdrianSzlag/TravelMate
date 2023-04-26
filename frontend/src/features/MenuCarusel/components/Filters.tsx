import React from "react";
import useResults from "../../../store/search-context";

interface Props {
  onSubmit: () => void;
}

const Filters = ({ onSubmit }: Props) => {
  const { searchQuery, setSearchQuery } = useResults();
  return (
    <form
      className="flex h-full w-full flex-col gap-2 bg-yellow-300 px-4 py-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="text-xl font-medium ">Search</h2>
      <input
        type="text"
        className="w-full rounded border px-1 py-0.5"
        name="destination"
        placeholder="Anything.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="w-full self-end justify-self-end bg-blue-700 p-2 text-center text-white transition-colors hover:bg-blue-900"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};
export default Filters;
