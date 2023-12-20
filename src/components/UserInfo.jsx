import React from "react";
import { useSelector } from "react-redux";

export default function UserInfo() {
  const user = useSelector((state) => state.appSlice.user);
  return (
    <div className="__user_info p-4 rounded bg-gray-800 w-full h-fit flex flex-col gap-3">
      <p>
        You are logged in as <span className="font-bold">{user?.username}</span>
      </p>
    </div>
  );
}
