import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLatestPosts } from "../redux/slices/homeSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLatestPosts({ page: 1 }));
  }, []);
  return (
    <div className="__home min-h-[calc(100dvh-60px)] w-full">
      <div className="__all_posts p-3 border-2 border-green-500"></div>
    </div>
  );
}
