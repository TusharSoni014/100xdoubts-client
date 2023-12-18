import React from "react";
import { FcGoogle } from "react-icons/fc";
import { handleGoogleLogin } from "../utils/utilFunctions";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="__login_page h-[calc(100dvh-60px)] w-full flex justify-center items-center">
      <div className="__login_form_container p-5 rounded bg-gray-800 w-[300px]">
        <form className="flex gap-3 flex-col">
          <input
            className="p-2 rounded outline-none text-black"
            type="text"
            placeholder="Enter Email or Username"
            required
          />
          <input
            className="p-2 rounded outline-none text-black"
            type="password"
            placeholder="Enter Password"
            required
          />
          <button
            className="bg-blue-500 w-full transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p className="w-full text-center my-6 border-t-[1px] border-white leading-[0px]">
          <span className="bg-gray-800 px-3">OR</span>
        </p>
        <button
          onClick={handleGoogleLogin}
          className="bg-white w-full py-2 px-4 text-black rounded transition flex justify-center items-center gap-1"
        >
          <FcGoogle className=" text-xl" /> Sign in with Google
        </button>
        <p className="text-xs m-3 text-center">
          New to 100XDoubts? Create account{" "}
          <button
            onClick={() => navigate("/signup")}
            className=" text-blue-500"
          >
            here
          </button>
        </p>
      </div>
    </div>
  );
}
