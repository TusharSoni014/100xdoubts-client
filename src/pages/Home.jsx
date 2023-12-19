import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestPosts } from "../redux/slices/homeSlice";
import Loader from "../components/Loader";
import DoubtPostItem from "../components/DoubtPostItem";
import UserInfo from "../components/UserInfo";
import FilterBar from "../components/FilterBar";
import LoadMoreBtnHome from "../components/LoadMoreBtnHome";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.homeSlice.allPosts);
  const loading = useSelector((state) => state.homeSlice.loading);
  const filterMode = useSelector((state) => state.homeSlice.filterMode);
  const isMorePostAvailable = useSelector(
    (state) => state.homeSlice.isMorePostAvailable
  );

  useEffect(() => {
    dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
  }, []);

  return (
    <div className="__home min-h-[calc(100dvh-60px)] w-full mt-10 p-5 gap-5 flex">
      <div className="__all_posts flex flex-col gap-5 w-full">
        <FilterBar />
        {loading ? (
          <Loader />
        ) : (
          posts?.map((post, index) => {
            return <DoubtPostItem key={index} post={post} />;
          })
        )}
        {isMorePostAvailable && (
          <div className="__btn_container flex justify-center items-center">
            <LoadMoreBtnHome />
          </div>
        )}
      </div>
      <UserInfo />
    </div>
  );
}
