import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const user = useSelector((state) => state.appSlice.user);
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const navigate = useNavigate();
  return (
    <div className="__user_info p-4 rounded bg-gray-800 w-full h-fit flex flex-col gap-3">
      {isLoggedIn ? (
        <p>
          You are logged in as{" "}
          <span className="font-bold">{user.username}</span>
        </p>
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
    </div>
  );
}
