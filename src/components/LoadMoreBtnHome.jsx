import React from "react";
import { handleCatch } from "../utils/utilFunctions";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoadMorePosts, updatePage } from "../redux/slices/homeSlice";
import Loader from "./Loader";

export default function LoadMoreBtnHome() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.homeSlice.page);
  const loadmoreLoading = useSelector(
    (state) => state.homeSlice.loadMoreLoading
  );

  const handleLoadMore = async () => {
    try {
      console.log("before update:" + page);
      dispatch((dispatch) => {
        if (page === 1) {
          dispatch(updatePage(2));
          dispatch(fetchLoadMorePosts({ page: 2 }));
        } else {
          dispatch(updatePage(page + 1));
          dispatch(fetchLoadMorePosts({ page: page + 1 }));
        }
      });
    } catch (error) {
      handleCatch(error);
    }
  };

  return loadmoreLoading ? (
    <Loader />
  ) : (
    <button
      onClick={handleLoadMore}
      disabled={loadmoreLoading}
      className="__load_more_btn_home w-fit bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-greem-300"
    >
      Load More
    </button>
  );
}
