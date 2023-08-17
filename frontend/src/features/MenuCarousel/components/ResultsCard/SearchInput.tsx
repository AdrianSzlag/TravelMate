import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useEffect, useState } from "react";
import { searchActions } from "store/search-slice";
import { search } from "store/search-actions";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchInput = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const searchQuery = useAppSelector((state) => state.search.search);
  const dispatch = useAppDispatch();
  const setSearchQuery = (query: string) => {
    dispatch(searchActions.setSearch(query));
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const onSubmitHandler = () => {
    dispatch(search());
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
  }, [searchQuery]);
  return (
    <div className="relative mx-2 mt-1 mb-1 lg:mt-2">
      <input
        type="text"
        className="block w-full rounded border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-[#2563eb] focus:ring-[#2563eb]"
        name="destination"
        placeholder="Search..."
        value={searchQuery}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <div className="absolute top-0 bottom-0 right-0 flex w-fit items-center p-2.5">
        <BiSearchAlt2 className="h-full w-auto cursor-pointer text-gray-400" />
      </div>
    </div>
  );
};

export default SearchInput;
