import React from "react";
import { useEditorContext } from "@/context/editorContext";

export default function Output() {
  const { output } = useEditorContext();
  console.log(":: output from output component ::", output);
  return (
    <div className="p-4 bg-[rgba(30,30,30)] text-white h-full">
        <div>
            <h1 className="text-xl font-bold pb-4">Output</h1>
        </div>
      {output}
    </div>
  );
}
