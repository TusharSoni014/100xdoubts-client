import React from "react";
import AddPost from "../components/AddPost";

export default function Create() {
  return (
    <div className="__create w-full min-h-[calc(100dvh-60px)] p-5 flex gap-2">
      <AddPost />
      <div className="__info p-5 bg-gray-800 rounded w-[400px]">
        <h1 className="text-xl font-bold mb-2">Posting a new Doubt</h1>
        <p className="text-gray-400">
          While Posting your doubt, please keep these points in your mind to
          keep this community clean and useful for everyone!
        </p>
        <ul className="list-disc pl-5 my-2">
          <li>
            <strong>Be Clear and Specific</strong>
          </li>
          <li>
            <strong>Use Descriptive Titles</strong>
          </li>
          <li>
            <strong>Search Before Posting</strong>
          </li>
          <li>
            <strong>Provide Code and Context</strong>
          </li>
          <li>
            <strong>Use Proper Topic/Tags Selection</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
