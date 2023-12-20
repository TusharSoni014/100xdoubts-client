import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPosts, fetchLatestPosts } from "../redux/slices/homeSlice";
import Loader from "../components/Loader";
import DoubtPostItem from "../components/DoubtPostItem";
import UserInfo from "../components/UserInfo";
import FilterBar from "../components/FilterBar";
import LoadMoreBtnHome from "../components/LoadMoreBtnHome";
import AddPost from "../components/AddPost";
import Footer from "../components/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.homeSlice.allPosts);
  const loading = useSelector((state) => state.homeSlice.loading);
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const filterMode = useSelector((state) => state.homeSlice.filterMode);
  const isMorePostAvailable = useSelector(
    (state) => state.homeSlice.isMorePostAvailable
  );

  useEffect(() => {
    dispatch(clearPosts());
    dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
  }, [filterMode]);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
    }
  }, []);

  return (
    <>
      <div className="__home h-[calc(100dvh-60px)] w-full p-3 gap-3 flex relative">
        <div className="__all_posts flex gap-3 min-w-[70%] overflow-auto">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-col gap-3 w-full">
              {posts?.map((post, index) => {
                return <DoubtPostItem key={index} post={post} />;
              })}
              {isMorePostAvailable && posts.length !== 0 ? (
                <div className="__btn_container flex justify-center items-center">
                  <LoadMoreBtnHome />
                </div>
              ) : null}
              {posts.length === 0 && (
                <p className="text-center text-gray-600 font-bold select-none text-xl">
                  No Posts Found!
                </p>
              )}
            </div>
          )}
        </div>
        <div className="__right flex flex-col gap-3 sticky top-2">
          <AddPost />
          {isLoggedIn && <UserInfo />}
          <FilterBar />
        </div>
      </div>
      <Footer />
    </>
  );
}
