import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPosts,
  fetchLatestPosts,
  updateAllPosts,
  updateAutoRefresh,
  updateFilterMode,
  updateSearchMode,
} from "../redux/slices/homeSlice";
import { LuRefreshCw } from "react-icons/lu";
import { handleCatch } from "../utils/utilFunctions";
import { CiSearch } from "react-icons/ci";
import axiosClient from "../utils/axiosClient";
import { TbLoader2 } from "react-icons/tb";

export default function FilterBar() {
  const dispatch = useDispatch();
  const filterMode = useSelector((state) => state.homeSlice.filterMode);
  const autoRefresh = useSelector((state) => state.homeSlice.autoRefresh);
  const searchMode = useSelector((state) => state.homeSlice.searchMode);
  const refreshPostsTimerRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

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
  }, [autoRefresh]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setSearchLoading(true);
      const response = await axiosClient.post("/search", {
        searchText: searchText,
      });
      dispatch(updateSearchMode(true));
      dispatch(updateAllPosts(response.data));
    } catch (error) {
      handleCatch(error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleResetSearch = () => {
    setSearchText("");
    dispatch(updateSearchMode(false));
    dispatch(clearPosts());
    dispatch(fetchLatestPosts({ page: 1 }));
  };

  return (
    <div className="__filter_bar bg-gray-700 p-3 rounded sticky top-2 shadow-xl flex gap-3 justify-between">
      <div className="__left flex gap-2">
        {!searchMode ? (
          <>
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
            <select
              disabled={autoRefresh}
              onChange={(e) => {
                dispatch(updateFilterMode(e.target.value));
              }}
              value={filterMode}
              className="block p-2 border rounded shadow-md transition border-none bg-gray-800 disabled:bg-gray-400"
            >
              <option value="latest">Latest</option>
              <option value="asc-upvotes">Lowest Upvotes</option>
              <option value="des-upvotes">Highest Upvotes</option>
            </select>
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
          </>
        ) : (
          <>
            <button
              onClick={handleResetSearch}
              className="bg-red-500 transition h-fit hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset Search
            </button>
          </>
        )}
      </div>
      <div className="__right">
        <form onSubmit={handleSearch} className="relative h-full flex gap-1">
          <input
            className="outline-none p-2 rounded text-white shadow-md transition bg-gray-800 disabled:bg-gray-400"
            type="text"
            placeholder="Search Doubts..."
            required
            value={searchText}
            disabled={searchLoading || autoRefresh}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            disabled={searchLoading || autoRefresh}
            className=" h-full bg-green-500 transition hover:bg-green-700 text-white font-bold p-3 rounded disabled:bg-green-300 flex justify-center items-center"
            type="submit"
          >
            {searchLoading ? (
              <>
                <TbLoader2 className="animate-spin font-bold" />
              </>
            ) : (
              <CiSearch />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
