import React from "react";

export default function FilterBar() {
  return (
    <div className="__filter_bar bg-gray-700 p-3 rounded sticky top-2 shadow-xl">
      <button className="bg-green-500 transition hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Refresh
      </button>
    </div>
  );
}
