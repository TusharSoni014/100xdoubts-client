import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoubtPost } from "../redux/slices/doubtPageSlice";
import { TbLoader2 } from "react-icons/tb";

export default function DoubtPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((state) => state.doubtPageSlice.loading);
  const doubtPost = useSelector((state) => state.doubtPageSlice.doubtPostData);

  useEffect(() => {
    dispatch(fetchDoubtPost({ doubtId: id }));
  }, [dispatch]);

  return (
    <div className="__doubt_page w-full min-h-[calc(100dvh-60px)]">
      {loading ? (
        <div className="__loader w-full h-[calc(100dvh-60px)] flex justify-center items-center">
          <TbLoader2 className="animate-spin" />
        </div>
      ) : (
        <div>
          <h1></h1>
        </div>
      )}
    </div>
  );
}
