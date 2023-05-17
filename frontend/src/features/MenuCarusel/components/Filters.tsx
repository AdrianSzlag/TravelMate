import React, { useCallback, useEffect, useState } from "react";
import { fetchPlaces } from "../../../store/places-actions";
import { useAppDispatch } from "../../../hooks/redux-hooks";

interface Props {
  onSubmit: () => void;
}

const Filters = ({ onSubmit }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();

  const fetch = () => {
    dispatch(fetchPlaces(searchQuery));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch();
    onSubmit();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  return (
    <form
      className="flex h-full w-full flex-col gap-2 bg-yellow-300 px-4 py-5"
      onSubmit={onSubmitHandler}
    >
      <h2 className="text-xl font-medium ">Search</h2>
      <input
        type="text"
        className="w-full rounded border px-1 py-0.5"
        name="destination"
        placeholder="Anything.."
        value={searchQuery}
        onChange={onChangeHandler}
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
