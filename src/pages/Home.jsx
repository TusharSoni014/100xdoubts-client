import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestPosts } from "../redux/slices/homeSlice";
import HomePostItem from "../components/HomePostItem";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.homeSlice.allPosts);
  useEffect(() => {
    dispatch(fetchLatestPosts({ page: 1 }));
  }, []);
  return (
    <div className="__home min-h-[calc(100dvh-60px)] w-full">
      <div className="__all_posts p-3 flex flex-col gap-3">
        {posts.map((post) => {
          return <HomePostItem post={post} />;
        })}
      </div>
    </div>
  );
}
