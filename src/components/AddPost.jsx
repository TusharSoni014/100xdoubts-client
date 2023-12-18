import React from "react";

export default function AddPost() {
  return (
    <div className="__add_post_container border-2 border-red-500 p-3">
      <form className="flex flex-col gap-2">
        <input
          className="w-full outline-none p-2 rounded text-white bg-gray-600"
          type="text"
          placeholder="Title of the Doubt"
        />
        <textarea
          className="resize-none w-full outline-none p-2 rounded text-white bg-gray-600"
          id=""
          cols="30"
          placeholder="Enter the doubt full description"
          rows="5"
        ></textarea>
        <div className="__btn_container">
          <button className="bg-blue-500 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Post Doubt
          </button>
        </div>
      </form>
    </div>
  );
}
