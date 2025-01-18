import React, { useEffect, useState } from "react";
import { useEditorContext } from "@/context/editorContext";
import { Progress } from "@/components/ui/progress";
import { LuLogs } from "react-icons/lu";


export default function Output() {
  const { output, loader } = useEditorContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loader) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);
      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [loader]);

  return (
    <div className="p-4 bg-[rgba(30,30,30)] text-white h-full">
      <div>
        <h1 className="text-xl font-bold pb-4 flex items-center gap-[1rem]">Output <LuLogs /></h1>
      </div>
      {loader ? (
        <div>
          <p className="text-white">Executing...</p>
          <Progress value={progress} className="w-[60%]" />
        </div>
      ) : (
        <p>{output}</p>
      )}
    </div>
  );
}
