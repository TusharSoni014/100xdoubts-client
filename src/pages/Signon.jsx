import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";
import { updateLoginStatus, updateUser } from "../redux/slices/appSlice";
import { handleCatch } from "../utils/utilFunctions";

export default function Signon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function getGoogleUser() {
    try {
      const response = await axiosClient.get("/google/user");
      dispatch(updateUser(response.data));
      dispatch(updateLoginStatus(true));
      navigate("/");
    } catch (error) {
      handleCatch(error);
    }
  }
  useEffect(() => {
    getGoogleUser();
  }, []);
  return (
    <div className="w-full h-[calc(100dvh-60px)] flex justify-center items-center">
      Logging in...
    </div>
  );
}
