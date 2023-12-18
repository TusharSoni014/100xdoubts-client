import React from "react";
import { TbLoader2 } from "react-icons/tb";

export default function Loader() {
  return (
    <div className="__loader w-full m-3 flex justify-center items-center">
      <TbLoader2 className="animate-spin" />
    </div>
  );
}
