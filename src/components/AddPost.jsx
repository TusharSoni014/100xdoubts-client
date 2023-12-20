import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { handleCatch, topics } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updatePostDescription,
  updatePostTitle,
} from "../redux/slices/newDoubtSlice";

export default function AddPost() {
  const dispatch = useDispatch();
  const postTitle = useSelector((state) => state.newDoubtSlice.title);
  const postDescription = useSelector(
    (state) => state.newDoubtSlice.description
  );
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ direction: "rtl" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["code-block"],
    ],
  };

  const handlePostDoubt = async (e) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        await axiosClient.post("/create", {
          title: postTitle,
          description: postDescription,
        });
        dispatch(updatePostTitle(""));
        dispatch(updatePostDescription(""));
        toast.success("Doubt posted successfully!");
      } else {
        navigate("/login");
      }
    } catch (error) {
      handleCatch(error);
    }
  };
  return (
    <div className="__add_post_container w-full">
      <form onSubmit={handlePostDoubt} className="flex flex-col gap-2">
        <input
          className="w-full outline-none p-2 rounded text-white bg-gray-600"
          type="text"
          placeholder="Title of the Doubt"
          required
          onChange={(e) => dispatch(updatePostTitle(e.target.value))}
          value={postTitle}
        />
        <ReactQuill
          theme="snow"
          value={postDescription}
          onChange={(value) => dispatch(updatePostDescription(value))}
          className="bg-gray-600 text-white"
          placeholder="Type the description of the doubt here."
          modules={modules}
        />
        {/* <div className="__img_previews">[Images will preview here]</div> */}
        <div className="__btn_container flex justify-start items-center gap-2">
          {/* <button className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            + Add Image
          </button> */}
          <select
            onChange={(e) => console.log(e.target.value)}
            className="block py-[10px] px-4 border rounded shadow-md transition border-none bg-gray-800 disabled:bg-gray-400"
            value={"None"}
          >
            {topics.map((topic, index) => {
              return (
                <option key={index} value={topic}>
                  {topic}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="bg-blue-500 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Doubt
          </button>
        </div>
      </form>
    </div>
  );
}
