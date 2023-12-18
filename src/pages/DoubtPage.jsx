import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoubtPost } from "../redux/slices/doubtPageSlice";
import Loader from "../components/Loader";

export default function DoubtPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.doubtPageSlice.loading);
  const doubtPost = useSelector((state) => state.doubtPageSlice.doubtPostData);

  useEffect(() => {
    dispatch(fetchDoubtPost({ doubtId: id }));
  }, [dispatch]);

  return (
    <div className="__doubt_page w-full min-h-[calc(100dvh-60px)]">
      {loading ? (
        <Loader />
      ) : (
        <div className="__post_details">
          <div className="p-3 m-3 flex flex-col gap-3 bg-gray-800 rounded">
            <div className="__author bg-gray-700 cursor-pointer w-fit flex justify-center items-center gap-2 rounded px-3 py-2">
              <img
                className=" w-8 h-8 rounded-full"
                src={doubtPost?.author?.avatar}
                alt=""
              />
              <p>{doubtPost?.author?.username}</p>
            </div>
            <h1 className="p-2 text-2xl font-bold">{doubtPost?.title}</h1>
            <p className="p-2">{doubtPost?.description}</p>
          </div>
          <div className="__comments_container p-3 m-3 rounded bg-gray-800">
            <h2 className=" text-xl font-bold">Comments</h2>
            <div className="__comments">coming soon...</div>
          </div>
        </div>
      )}
    </div>
  );
}
