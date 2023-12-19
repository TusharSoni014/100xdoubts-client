import React from "react";
import { handleCatch } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { updateUpvotedPosts } from "../redux/slices/appSlice";

export default function DoubtPostItem({ post }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.appSlice.user);
  const handleUpvote = async () => {
    const response = await axiosClient.post("/upvote", {
      postId: post.url,
    });
    dispatch(updateUpvotedPosts(post.url));
    console.log(response.data);
    try {
    } catch (error) {
      handleCatch(error);
    }
  };
  return (
    <div className="__home_post_item p-4 bg-gray-800 rounded">
      <div className="__post_info flex justify-between items-center gap-2">
        <a
          target="_blank"
          href={`/doubt/${post.url}`}
          className="__post_item_left"
        >
          <h1 className="font-bold text-xl cursor-pointer">{post?.title}</h1>
        </a>
        <div className="__post_item_right flex gap-2 justify-center items-center">
          {user.upvotedPosts.includes(post.url) ? (
            <button
              onClick={handleUpvote}
              className="bg-red-500 transition h-fit hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Downvote
            </button>
          ) : (
            <button
              onClick={handleUpvote}
              className="bg-green-500 transition h-fit hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Upvote
            </button>
          )}

          <div className="__info flex flex-col">
            <a
              target="_blank"
              href={`/doubt/${post.url}`}
              className="__upvotes text-green-400 font-bold cursor-pointer"
            >
              {post?.upvotes.length} Upvotes
            </a>
            <a
              target="_blank"
              href={`/doubt/${post.url}`}
              className="__comments text-gray-400 cursor-pointer"
            >
              {post?.comments.length} Comments
            </a>
          </div>
        </div>
      </div>
      <div className="__post_footer border-t-2 border-gray-600 mt-3">
        <p className="text-gray-200 rounded-full w-fit px-3 my-2 bg-gray-600">
          Posted By: <span className="font-bold">{post?.author.username}</span>
        </p>
        <p className="text-gray-400 text-xs">
          Posted At: {post?.createdAt.split("T")[0]}
        </p>
      </div>
    </div>
  );
}
