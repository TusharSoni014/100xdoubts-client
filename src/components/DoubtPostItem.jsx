import React from "react";

export default function DoubtPostItem({ post }) {
  return (
    <div className="__home_post_item p-4 bg-gray-700 rounded">
      <div className="__post_info flex justify-between items-center gap-2">
        <a
          target="_blank"
          href={`/doubt/${post.url}`}
          className="__post_item_left"
        >
          <h1 className="font-bold text-xl cursor-pointer">{post?.title}</h1>
        </a>
        <div className="__post_item_right flex flex-col">
          <a target="_blank" href={`/doubt/${post.url}`} className="__comments text-gray-400 cursor-pointer">
            {post?.comments.length} Comments
          </a>
          <a target="_blank" href={`/doubt/${post.url}`} className="__upvotes text-gray-400 cursor-pointer">
            {post?.upvotes.length} Upvotes
          </a>
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
