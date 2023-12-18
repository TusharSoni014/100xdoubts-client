import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { handleCatch, handleGoogleLogin } from "../utils/utilFunctions";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { useDispatch } from "react-redux";
import { updateLoginStatus, updateUser } from "../redux/slices/appSlice";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/user/login", {
        username: email,
        password: password,
      });
      dispatch(updateUser(response.data.user));
      dispatch(updateLoginStatus(true));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      handleCatch(error);
    }
  };
  return (
    <div className="__login_page h-[calc(100dvh-60px)] w-full flex justify-center items-center">
      <div className="__login_form_container p-5 rounded bg-gray-800 w-[300px]">
        <form onSubmit={handleLogin} className="flex gap-3 flex-col">
          <input
            className="p-2 rounded outline-none text-black"
            type="text"
            placeholder="Enter Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="p-2 rounded outline-none text-black"
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
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
