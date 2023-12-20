import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoubtPost } from "../redux/slices/doubtPageSlice";
import Loader from "../components/Loader";
import UserInfo from "../components/UserInfo";
import UpvoteBtn from "../components/UpvoteBtn";

export default function DoubtPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.doubtPageSlice.loading);
  const doubtPost = useSelector((state) => state.doubtPageSlice.doubtPostData);

  useEffect(() => {
    dispatch(fetchDoubtPost({ doubtId: id }));
  }, []);

  return (
    <div className="__doubt_page w-full min-h-[calc(100dvh-60px)]">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex p-5 gap-5">
          <div className="__post_details w-full flex flex-col gap-5 min-w-[70%]">
            <div className="p-5 flex flex-col gap-3 bg-gray-800 rounded">
              <div className="__author flex items-center gap-3">
                <div className=" bg-gray-700 cursor-pointer w-fit flex justify-center items-center gap-2 rounded px-3 py-2">
                  <img
                    className=" w-8 h-8 rounded-full"
                    src={doubtPost?.author?.avatar}
                    alt="user avatar"
                  />
                  <p>{doubtPost?.author?.username}</p>
                </div>
                <UpvoteBtn id={id} />
              </div>
              <p className="font-bold text-green-400">
                Upvotes: {doubtPost?.upvotes?.length}
              </p>
              <div className="__title">
                <h1 className="p-2 text-2xl font-bold break-all break-words">
                  {doubtPost?.title}
                </h1>
                {doubtPost?.topic && (
                  <p className=" rounded-full bg-green-900 w-fit px-4 font-bold">
                    Topic: {doubtPost?.topic}
                  </p>
                )}
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: doubtPost?.description }}
                className="p-2 break-words break-all overflow-auto"
              />
            </div>
            {/* <div className="__comments_container p-5 rounded bg-gray-800">
              <h2 className=" text-xl font-bold">Comments</h2>
              <div className="__comments">coming soon...</div>
            </div> */}
          </div>
          <UserInfo />
        </div>
      )}
    </div>
  );
}
