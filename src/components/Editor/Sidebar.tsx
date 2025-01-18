import React, { useEffect, useState } from "react";
import editorinstances from "../files/editorinstances.json";
import { useEditorContext } from "@/context/editorContext";
import { Button } from "../ui/button";
import { SupportedLanguages } from "@/index";
import { FiEdit } from "react-icons/fi";
import { LuFiles } from "react-icons/lu";


type FileObject = {
  [key: string]: {
    code: string;
    extension: string;
    language: SupportedLanguages;
  };
};

export default function Sidebar() {
  const { files, setFiles, setCode, setLanguage } = useEditorContext();
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState<string>("");

  useEffect(() => {
    setFiles(editorinstances);
  }, []);

  const handleFileClick = (
    fileName: string,
    fileCode: string,
    fileLanguage: SupportedLanguages
  ) => {
    setLanguage(fileLanguage);
    setCode(fileCode);
    setActiveFile(fileName);
  };

  const handleRenameFile = (fileName: string) => {
    setRenamingFile(fileName);
    setNewFileName(fileName);
  };

  const handleSaveRename = () => {
    if (renamingFile && newFileName) {
      setFiles((prevFiles: FileObject[]) =>
        prevFiles.map((fileObj) => {
          const key = Object.keys(fileObj)[0];
          if (key === renamingFile) {
            return {
              [newFileName]: {
                ...fileObj[renamingFile!],
                code: fileObj[renamingFile!].code,
                extension: fileObj[renamingFile!].extension,
                language: fileObj[renamingFile!].language,
              },
            };
          }
          return fileObj;
        })
      );
      setActiveFile(newFileName);
      setRenamingFile(null);
      setNewFileName("");
    }
  };

  const handleCancelRename = () => {
    setRenamingFile(null);
    setNewFileName("");
  };

  return (
    <>
      <div className="text-white bg-gray-800 h-[100vh] p-4 font-medium">
        <div className="text-[1rem] font-medium flex items-center gap-[1rem]"><LuFiles size={18}/> Files:</div>
        <div className="w-[100#] h-[1px] bg-gray-700 mt-[1rem]"></div>
        <div className="mt-4">
          {files.map((fileObj: FileObject, index: number) => {
            const fileName: string = Object.keys(fileObj)[0];
            const fileCode: string = fileObj[fileName].code;
            const fileExtension: string = fileObj[fileName].extension;
            const fileLanguage: SupportedLanguages = fileObj[fileName].language;
            const isActive: boolean = activeFile === fileName;
            return (
              <div
                key={index}
                className="flex mb-4 cursor-pointer rounded-lg"
                onClick={() =>
                  handleFileClick(fileName, fileCode, fileLanguage)
                }
              >
                {renamingFile === fileName ? (
                  <div className="flex flex-col">
                    <div>
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNewFileName(e.target.value)
                        }
                        className="bg-gray-700 text-gray-300 rounded-lg p-2"
                      />
                      <span className="font-bold">.{fileExtension}</span>
                    </div>
                    <div className="mt-2">
                      <Button variant="secondary" onClick={handleSaveRename}>
                        Save
                      </Button>
                      <Button onClick={handleCancelRename} className="ml-2">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p
                    className={`p-2 rounded-lg font-bold text-gray-300 hover:bg-gray-600
                  ${isActive ? "text-white" : "hover:text-white"} 
                  ${isActive ? "bg-gray-700 active:text-gray-200" : ""}`}
                  >
                    {index+1}. {fileName}.{fileExtension}
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        handleRenameFile(fileName);
                      }}
                      className="ml-2 text-gray-500 hover:text-gray-300"
                    >
                      <FiEdit />
                    </button>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
