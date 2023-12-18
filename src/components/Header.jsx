import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleCatch } from "../utils/utilFunctions";
import { CiLogout } from "react-icons/ci";
import axiosClient from "../utils/axiosClient";
import { updateLoginStatus, updateUser } from "../redux/slices/appSlice";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.appSlice.isLoggedIn);
  const user = useSelector((state) => state.appSlice.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async (e) => {
    try {
      await axiosClient.post("/user/logout");
      dispatch(updateUser({}));
      dispatch(updateLoginStatus(false));
    } catch (error) {
      handleCatch(error);
    }
  };

  return (
    <nav className="__header h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <h3 onClick={() => navigate("/")} className="font-bold cursor-pointer">
        100xDoubts
      </h3>
      <div className="__btn_container flex justify-center items-center gap-3">
        {isLoggedIn ? (
          <>
            <button
              onClick={handleSignout}
              className="bg-red-500 transition hover:bg-red-700 text-white font-bold py-3 px-4 rounded"
            >
              <CiLogout />
            </button>
            <button
              onClick={() => navigate("/create")}
              className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              + New Doubt
            </button>
            <button className="__avatar_btn w-[40px] h-[40px]">
              <img
                className="w-full h-full rounded-[50%]"
                src={user.picture}
                alt=""
              />
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
