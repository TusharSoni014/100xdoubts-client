import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPosts,
  fetchLatestPosts,
  updateFilterMode,
} from "../redux/slices/homeSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filterMode = useSelector((state) => state.homeSlice.filterMode);
  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
  }, [filterMode]);
  return (
    <div className="__filter_bar bg-gray-700 p-3 rounded sticky top-2 shadow-xl flex gap-3">
      <button
        onClick={() => {
          dispatch(clearPosts());
          dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
        }}
        className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Posts
      </button>
      <select
        onChange={(e) => {
          dispatch(updateFilterMode(e.target.value));
        }}
        value={filterMode}
        className="block p-2 border rounded-md shadow-md bg-gray-800"
      >
        <option value="latest">Latest</option>
        <option value="asc-upvotes">Highest Upvotes</option>
        <option value="des-upvotes">Lowest Upvotes</option>
      </select>
    </div>
  );
}
