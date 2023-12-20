import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import { handleCatch } from "../utils/utilFunctions";
import { updateUpvotedPosts } from "../redux/slices/appSlice";
import Loader from "./Loader";
import { TbLoader2 } from "react-icons/tb";

export default function UpvoteBtn({ id }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const user = useSelector((state) => state.appSlice.user);

  const handleUpvote = async () => {
    if (isLoggedIn) {
      setLoading(true);
      await axiosClient.post("/upvote", {
        postId: id,
      });
      dispatch(updateUpvotedPosts(id));
    } else {
      navigate("/login");
    }
    try {
    } catch (error) {
      handleCatch(error);
    } finally {
      setLoading(false);
    }
  };
  return user?.upvotedPosts?.includes(id) ? (
    <button
      onClick={handleUpvote}
      disabled={loading}
      className="bg-red-500 transition h-fit hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 disabled:bg-red-300"
    >
      {loading && <TbLoader2 className="animate-spin" />} Downvote
    </button>
  ) : (
    <button
      onClick={handleUpvote}
      disabled={loading}
      className="bg-green-500 transition h-fit hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 disabled:bg-green-300"
    >
      {loading && <TbLoader2 className="animate-spin" />} Upvote
    </button>
  );
}
