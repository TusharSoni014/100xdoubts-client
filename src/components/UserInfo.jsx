import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const user = useSelector((state) => state.appSlice.user);
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const navigate = useNavigate();
  return (
    <div className="__user_info p-4 rounded bg-gray-800 w-[400px] h-fit flex flex-col gap-3">
      <h3 className="font-bold text-xl">Welcome to 100xDoubts</h3>
      {isLoggedIn ? (
        <p>You are logged in as <span className="font-bold">{user.username}</span></p>
      ) : (
        <>
          <button
            className="bg-blue-500 w-full my-3 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </>
      )}
      <div className="__new_doubt border-t-2 border-gray-600 text-gray-400">
        <p>
          Do you have a doubt that you are stuck on? Post a doubt from the
          button below and let the community answer your question/doubt.
        </p>
        <button
          onClick={() => {
            navigate("/create");
          }}
          className="bg-green-500 w-full my-3 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          + New Doubt
        </button>
      </div>
    </div>
  );
}
