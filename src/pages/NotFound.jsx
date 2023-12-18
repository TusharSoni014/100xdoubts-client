import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="__not_found w-full h-[calc(100dvh-60px)] bg-black flex justify-center items-center flex-col gap-3">
      <p className="text-3xl">404 - Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Home
      </button>
    </div>
  );
}
