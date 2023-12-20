import React from "react";
import UpvoteBtn from "./UpvoteBtn";

export default function DoubtPostItem({ post }) {
  return (
    <div className="__home_post_item p-3 bg-gray-800 rounded">
      <div className="__post_info flex justify-between items-start gap-3">
        <div className="__post_item_left flex gap-2">
          <img
            className="w-9 h-9 rounded-full cursor-pointer"
            src={post.author.avatar}
            alt=""
          />
          <h1 className="break-all break-words">{post?.title}</h1>
        </div>
        <div className="__post_item_right flex gap-2 justify-center items-start text-s h-full flex-nowrap">
          <UpvoteBtn id={post?.url} />
          <div className="__info flex flex-col">
            <a
              target="_blank"
              href={`/doubt/${post?.url}`}
              className="__upvotes text-green-400 font-bold cursor-pointer"
            >
              {post?.upvotes.length}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
