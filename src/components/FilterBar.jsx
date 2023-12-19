import React from "react";
import { useDispatch } from "react-redux";
import { fetchLatestPosts } from "../redux/slices/homeSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  return (
    <div className="__filter_bar bg-gray-700 p-3 rounded sticky top-2 shadow-xl flex gap-3">
      <button
        onClick={() =>
          dispatch(fetchLatestPosts({ page: 1 }))
        }
        className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Refresh Posts
      </button>
      <select className="block p-2 border rounded-md shadow-md bg-gray-800">
        <option value="latest">Latest</option>
        <option value="asc-upvotes">Highest Upvotes</option>
        <option value="des-upvotes">Lowest Upvotes</option>
      </select>
    </div>
  );
}
