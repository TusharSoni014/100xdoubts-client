import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { handleCatch } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePostTitle } from "../redux/slices/newDoubtSlice";
import { TbLoader2 } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { clearPosts, fetchLatestPosts } from "../redux/slices/homeSlice";

export default function AddPost() {
  const dispatch = useDispatch();
  const postTitle = useSelector((state) => state.newDoubtSlice.title);
  const filterMode = useSelector((state) => state.homeSlice.filterMode);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const navigate = useNavigate();

  const handlePostDoubt = async (e) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        setLoading(true);
        await axiosClient.post("/create", {
          title: postTitle,
        });
        dispatch(updatePostTitle(""));
        dispatch(clearPosts());
        dispatch(fetchLatestPosts({ page: 1, filter: filterMode }));
        toast.success("Doubt posted successfully!");
      } else {
        navigate("/login");
      }
    } catch (error) {
      handleCatch(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="__add_post_container p-3 bg-gray-800 rounded w-[350px]">
    <p className="font-bold mb-2">Post a New Doubt</p>
      <form onSubmit={handlePostDoubt} className="flex flex-col gap-2">
        <input
          disabled={loading}
          className="outline-none p-2 rounded text-white bg-gray-600 disabled:bg-gray-400"
          type="text"
          placeholder="Type your doubt here..."
          required
          onChange={(e) => dispatch(updatePostTitle(e.target.value))}
          value={postTitle}
        />
        <div className="__btn_container flex justify-start items-center gap-2">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 transition hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-10 rounded w-full flex justify-center items-center gap-2"
          >
            {loading ? <TbLoader2 className="animate-spin" /> : <IoMdSend className=" text-lg"/>}{" "}
            Post Doubt
          </button>
        </div>
      </form>
    </div>
  );
}
