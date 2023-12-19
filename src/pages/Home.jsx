import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestPosts } from "../redux/slices/homeSlice";
import Loader from "../components/Loader";
import DoubtPostItem from "../components/DoubtPostItem";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.homeSlice.allPosts);
  const loading = useSelector((state) => state.homeSlice.loading);
  useEffect(() => {
    dispatch(fetchLatestPosts({ page: 1 }));
  }, []);
  return (
    <div className="__home min-h-[calc(100dvh-60px)] w-full">
      {loading ? (
        <Loader />
      ) : (
        <div className="__all_posts p-3 flex flex-col gap-3">
          {posts.map((post, index) => {
            return <DoubtPostItem key={index} post={post} />;
          })}
        </div>
      )}
    </div>
  );
}
