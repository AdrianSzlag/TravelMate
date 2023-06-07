import React, { useEffect, useState } from "react";
import { fetchPlaces } from "store/places-actions";
import { useAppDispatch } from "hooks/redux-hooks";

interface Props {
  onSubmit: () => void;
}

const Filters = ({ onSubmit }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilterFrom, setPriceFilterFrom] = useState<string>("");
  const [priceFilterTo, setPriceFilterTo] = useState<string>("");
  const dispatch = useAppDispatch();
  const [firstLoad, setFirstLoad] = useState(true);

  const wrongPriceFilter =
    priceFilterFrom &&
    priceFilterTo &&
    parseInt(priceFilterFrom) > parseInt(priceFilterTo)
      ? "border-red-500"
      : "";

  const fetch = () => {
    const priceFrom = priceFilterFrom.length > 0 ? priceFilterFrom : undefined;
    const priceTo = priceFilterTo.length > 0 ? priceFilterTo : undefined;
    const type = typeFilter.length > 0 ? typeFilter : undefined;
    dispatch(fetchPlaces(searchQuery, priceFrom, priceTo, type));
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
    if (firstLoad) {
      setFirstLoad(false);
      fetch();
      return;
    }
    const timeout = setTimeout(() => {
      fetch();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  return (
    <form
      className="flex h-full w-full flex-col gap-2 bg-gray-100 px-4 py-5"
      onSubmit={onSubmitHandler}
    >
      <h2 className="text-2xl font-bold text-gray-600">Search</h2>
      <input
        type="text"
        className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm"
        name="destination"
        placeholder="Anything.."
        value={searchQuery}
        onChange={onChangeHandler}
      />
      <h3 className="text-lg font-semibold text-gray-600">Filters</h3>
      <label className="mb-1 block text-sm font-medium text-gray-900">
        Type
      </label>
      <select
        className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm"
        name="type"
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
      >
        <option value="">Any</option>
        <option value="hotel">Hotel</option>
        <option value="restaurant">Restaurant</option>
        <option value="bar">Bar</option>
      </select>
      <label className="mb-1 block text-sm font-medium text-gray-900">
        Price
      </label>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          className={`${wrongPriceFilter} block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm`}
          name="priceFrom"
          placeholder="From"
          value={priceFilterFrom}
          onChange={(e) => setPriceFilterFrom(e.target.value)}
        />
        <div>-</div>
        <input
          type="number"
          className={`${wrongPriceFilter} block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm`}
          name="priceTo"
          placeholder="To"
          value={priceFilterTo}
          onChange={(e) => setPriceFilterTo(e.target.value)}
        />
      </div>

      <button
        className="mt-4 w-full self-end justify-self-end bg-blue-700 p-2 text-center text-white transition-colors hover:bg-blue-900"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};
export default Filters;
