import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { searchActions } from "store/search-slice";
import { search } from "store/search-actions";
import { placesActions } from "store/places-slice";

interface Props {
  onSubmit: () => void;
}

const Filters = ({ onSubmit }: Props) => {
  const typeFilter = useAppSelector((state) => state.search.type);
  const priceFilterFrom = useAppSelector((state) => state.search.priceFrom);
  const priceFilterTo = useAppSelector((state) => state.search.priceTo);

  const dispatch = useAppDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const setTypeFilter = (type: string) => {
    dispatch(searchActions.setType(type));
  };
  const setPriceFilterFrom = (price: string) => {
    dispatch(searchActions.setPriceFrom(price));
  };
  const setPriceFilterTo = (price: string) => {
    dispatch(searchActions.setPriceTo(price));
  };

  const wrongPriceFilter =
    priceFilterFrom &&
    priceFilterTo &&
    parseInt(priceFilterFrom) > parseInt(priceFilterTo)
      ? "border-red-500"
      : "";

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(search());
    onSubmit();
  };

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    const timeout = setTimeout(() => {
      dispatch(search());
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [typeFilter, priceFilterFrom, priceFilterTo]);

  return (
    <form
      className="flex h-full w-full flex-col gap-2 bg-gray-100 px-4 py-5"
      onSubmit={onSubmitHandler}
    >
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
      <div className="flex items-center gap-2">
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
        Show results
      </button>
    </form>
  );
};
export default Filters;
