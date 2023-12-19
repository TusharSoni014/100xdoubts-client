import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPosts,
  fetchLatestPosts,
  updateAutoRefresh,
  updateFilterMode,
} from "../redux/slices/homeSlice";
import { LuRefreshCw } from "react-icons/lu";
import { handleCatch } from "../utils/utilFunctions";

export default function FilterBar() {
  const dispatch = useDispatch();
  const refreshPostsTimerRef = useRef(null);
  const filterMode = useSelector((state) => state.homeSlice.filterMode);
  const autoRefresh = useSelector((state) => state.homeSlice.autoRefresh);

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
  }, [filterMode]);

  const handleAutoRefresh = async () => {
    try {
      dispatch(updateAutoRefresh(!autoRefresh));
    } catch (error) {
      handleCatch(error);
    }
  };

  useEffect(() => {
    if (autoRefresh) {
      refreshPostsTimerRef.current = setInterval(() => {
        dispatch(clearPosts());
        dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
      }, 5 * 1000);
    } else {
      clearInterval(refreshPostsTimerRef.current);
    }

    return () => clearInterval(refreshPostsTimerRef.current);
  }, [autoRefresh, dispatch]);

  return (
    <div className="__filter_bar bg-gray-700 p-3 rounded sticky top-2 shadow-xl flex gap-3">
      <button
        disabled={autoRefresh}
        onClick={() => {
          dispatch(clearPosts());
          dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
        }}
        className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-green-300"
      >
        Refresh Posts
      </button>
      <button
        onClick={handleAutoRefresh}
        className={`${
          autoRefresh
            ? "bg-red-500 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-700"
        } flex justify-center items-center gap-2 transition  text-white font-bold py-2 px-4 rounded`}
      >
        {autoRefresh ? (
          <>
            <LuRefreshCw className="animate-spin" /> Stop Refresh
          </>
        ) : (
          <>
            <LuRefreshCw /> Auto Refresh
          </>
        )}
      </button>
      <select
        disabled={autoRefresh}
        onChange={(e) => {
          dispatch(updateFilterMode(e.target.value));
        }}
        value={filterMode}
        className="block p-2 border rounded-md shadow-md transition bg-gray-800 disabled:bg-gray-400"
      >
        <option value="latest">Latest</option>
        <option value="asc-upvotes">Highest Upvotes</option>
        <option value="des-upvotes">Lowest Upvotes</option>
      </select>
    </div>
  );
}
