import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { handleCatch } from "../utils/utilFunctions";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
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
      ["clean"],
    ],
  };

  const handlePostDoubt = async (e) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        await axiosClient.post("/create", {
          title: title,
          description: description,
        });
        setTitle("");
        setDescription("");
        toast.success("Doubt posted successfully!");
      } else {
        navigate("/login");
      }
    } catch (error) {
      handleCatch(error);
    }
  };
  return (
    <div className="__add_post_container p-3">
      <h1 className="text-4xl my-3">Post a new Doubt</h1>
      <form
        onSubmit={handlePostDoubt}
        className="flex flex-col gap-2 px-8 my-5"
      >
        <input
          className="w-full outline-none p-2 rounded text-white bg-gray-600"
          type="text"
          placeholder="Title of the Doubt"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <ReactQuill
          theme="bubble"
          value={description}
          onChange={setDescription}
          className="bg-gray-600 text-white rounded h-56"
          placeholder="Type the description of the doubt here."
          modules={modules}
        />
        {/* <div className="__img_previews">[Images will preview here]</div> */}
        <div className="__btn_container flex justify-start items-center gap-2">
          {/* <button className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            + Add Image
          </button> */}
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
