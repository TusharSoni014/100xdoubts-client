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
import { IoIosRefresh } from "react-icons/io";
import { toast } from "react-toastify";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filterMode = useSelector((state) => state.homeSlice.filterMode);
  const autoRefresh = useSelector((state) => state.homeSlice.autoRefresh);
  const refreshPostsTimerRef = useRef(null);

  const handleAutoRefresh = async () => {
    try {
      if (!autoRefresh) {
        toast.info("Auto refreshing posts after every 5 seconds!");
      } else {
        toast.info("Auto refresh stopped!");
      }
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
  }, [autoRefresh]);

  return (
    <div className="__filter_bar bg-gray-800 border-[1px] p-3 rounded sticky top-2 shadow-xl flex flex-col gap-3">
      <p className="text-center font-bold">Options</p>
      <select
        disabled={autoRefresh}
        onChange={(e) => {
          dispatch(updateFilterMode(e.target.value));
        }}
        value={filterMode}
        className="block py-[10px] px-4 border rounded shadow-md transition border-none bg-gray-700 disabled:bg-gray-400"
      >
        <option value="latest">Latest</option>
        <option value="asc-upvotes">Lowest Upvotes</option>
        <option value="des-upvotes">Highest Upvotes</option>
      </select>
      <button
        disabled={autoRefresh}
        onClick={() => {
          dispatch(clearPosts());
          dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
        }}
        className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-green-300 flex justify-center items-center gap-2"
      >
        <IoIosRefresh /> Refresh
      </button>
      <button
        onClick={handleAutoRefresh}
        className={`transition ${
          autoRefresh
            ? "bg-red-500 hover:bg-red-700"
            : "bg-transparent border-[1px] border-red-500 text-red-500 hover:bg-red-950"
        } flex justify-center items-center gap-2 text-white font-bold py-2 px-4 rounded`}
      >
        {autoRefresh ? (
          <>
            <LuRefreshCw className="animate-spin" /> Stop Auto-Refresh
          </>
        ) : (
          <>
            <LuRefreshCw /> Enable Auto-Refresh
          </>
        )}
      </button>
    </div>
  );
}
