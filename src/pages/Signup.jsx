import React, { useState } from "react";
import { handleCatch, handleGoogleLogin } from "../utils/utilFunctions";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateLoginStatus, updateUser } from "../redux/slices/appSlice";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpState, setOtpState] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosClient.post("/user/sendOTP", {
        email: email,
        username: username,
      });
      setOtpState(true);
      toast.success("OTP Sent successfully!");
    } catch (error) {
      handleCatch(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosClient.post("/user/signup", {
        email: email,
        username: username,
        otp: otp,
        password: password,
      });
      console.log(response.data);
      dispatch(updateUser(response.data.user));
      dispatch(updateLoginStatus(true));
      toast.success("Signup Success!");
      navigate("/");
    } catch (error) {
      handleCatch(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="__signup_page h-[calc(100dvh-60px)] w-full flex justify-center items-center">
      <div className="__signup_form_container p-5 rounded bg-gray-800 w-[300px]">
        {!otpState ? (
          <>
            <form onSubmit={handleOTP} className="flex gap-3 flex-col">
              <input
                className="p-2 rounded outline-none text-black"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
              />
              <input
                className="p-2 rounded outline-none text-black"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <input
                className="p-2 rounded outline-none text-black"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                className="bg-blue-500 w-full transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
                type="submit"
                disabled={loading}
              >
                Sign Up
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
          </>
        ) : (
          <>
            <form onSubmit={handleSignup} className="flex gap-3 flex-col">
              <input
                className="p-2 rounded outline-none text-black"
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
                disabled={loading}
              />
              <button
                disabled={loading}
                className="bg-blue-500 w-full transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
                type="submit"
              >
                Complete Signup
              </button>
            </form>
          </>
        )}
        <p className="text-xs m-3 text-center">
          Already have an account? Login{" "}
          <button onClick={() => navigate("/login")} className=" text-blue-500">
            here
          </button>
        </p>
      </div>
    </div>
  );
}
