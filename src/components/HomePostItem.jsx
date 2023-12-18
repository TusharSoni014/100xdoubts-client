import React from "react";
import { FaRegCommentAlt } from "react-icons/fa";

export default function HomePostItem({ post }) {
  return (
    <div className="__home_post_item p-3 bg-gray-700 rounded flex justify-between items-center">
      <div className="__post_item_left">
        <h1 className="font-bold text-xl cursor-pointer">{post?.title}</h1>
        <p className="text-gray-400 text-xs cursor-pointer">
          Posted At: {post?.createdAt.split("T")[0]}
        </p>
      </div>
      <div className="__post_item_right cursor-pointer">
        <FaRegCommentAlt />
      </div>
    </div>
  );
}
