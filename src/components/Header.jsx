import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <nav className="__header h-[60px] bg-gray-900 text-white p-3 flex justify-between items-center">
      <h3 className="font-bold">100xDoubts</h3>
      <div className="__btn_container">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}
