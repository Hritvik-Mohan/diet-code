import React from "react";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  return (
    <>
      {router.pathname == "/react-editor" ? (
        <div className="text-white bg-gray-800 h-[100vh] p-8 font-medium">
          React
        </div>
      ) : (
        <div className="text-white bg-gray-800 h-[100vh] p-8 font-medium">
          new_file.js
        </div>
      )}
    </>
  );
}
