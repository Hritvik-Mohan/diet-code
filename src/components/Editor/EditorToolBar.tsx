import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { files } from "../files/fileData";
import { useEditorContext } from "@/context/editorContext";
import { executeCode } from "@/utils/api";
import { SupportedLanguages, ExecuteCodeResponse } from "@/index";
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { AiOutlineJava } from "react-icons/ai";
import { IoLogoPython } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { FaReact } from "react-icons/fa";
import editorinstances from '../files/editorinstances.json'
import { IoAddOutline } from "react-icons/io5";
import { BsNintendoSwitch } from "react-icons/bs";


export default function EditorToolBar() {
  const [position, setPosition] = useState("bottom");
  const {
    language,
    code,
    setLanguage,
    setOutput,
    setLoader,
    setIsDarkTheme,
    setRunReactOutput,
    setCode,
    setFiles
  } = useEditorContext();
  const [icon, setIcon] = useState<React.ReactElement | null>(null);

  const runCode = async () => {
    if (!code) return;
    setLoader(true);
    try {
      const response = (await executeCode(
        language as SupportedLanguages,
        code
      )) as ExecuteCodeResponse;
      setOutput(response.run.output);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error executing code:", error);
    }
  };

  const languageIcon = () => {
    switch (language) {
      case "javascript":
        return <RiJavascriptFill size="2rem" color="yellow" />;
      case "typescript":
        return <BiLogoTypescript size="2rem" color="lightblue" />;
      case "java":
        return <AiOutlineJava size="2rem" color="white" />;
      case "python":
        return <IoLogoPython size="2rem" color="green" />;
      case "reactjs":
        return <FaReact size="2rem" color="pink" />;
      default:
        return <CiFileOn size="2rem" color="white" />;
    }
  };

  useEffect(() => {
    const icon = languageIcon();
    setIcon(icon);
  }, [language]);
  useEffect(() => {
    setFiles(editorinstances); 
  }, []);

  const handleNewFile = (fileType: keyof typeof files, fileExtension: string) => {
    const newFile = {
      [fileType]: {
        code: files[fileType],
        extension: fileExtension,
        language: fileType
      },
    };

    setLanguage(fileType);
    
    setFiles((prevFiles: typeof files) => [...Object.values(prevFiles), newFile]);

    setLanguage(fileType);
    setCode(newFile[fileType].code);
  };

  return (
    <div className="flex items-center justify-between gap-6 p-4 bg-gray-800 text-[1rem]">
      <div className="flex items-center gap-4">
        <div>{icon}</div>
        <Menubar className="bg-gray-800 text-white border-none">
          <MenubarMenu>
            <MenubarTrigger className="font-bold text-[1rem] flex items-center gap-[4px]">
              <div>New Code File</div> <IoAddOutline size={24}/>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup>
                <MenubarRadioItem value="vs-dark" onClick={() => handleNewFile("javascript", "js")}>
                  New JavaScript File
                </MenubarRadioItem>
                <MenubarRadioItem value="vs-dark" onClick={() => handleNewFile("typescript", "ts")}>
                  New TypeScript File
                </MenubarRadioItem>
                <MenubarRadioItem value="vs-dark" onClick={() => handleNewFile("reactjs", "jsx")}>
                  New React JS File
                </MenubarRadioItem>
                <MenubarRadioItem value="vs-dark" onClick={() => handleNewFile("python", "py")}>
                  New Python File
                </MenubarRadioItem>
                <MenubarRadioItem value="vs-dark" onClick={() => handleNewFile("java", "java")}>
                  New Java
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          {/* Theme Selector */}
          <MenubarMenu>
            <MenubarTrigger className="font-bold text-[1rem] flex items-center gap-[8px]">
              <div>Switch Themes</div> <BsNintendoSwitch />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem disabled>Appearance</MenubarItem>
              <MenubarSeparator />
              <MenubarRadioGroup value={position} onValueChange={setPosition}>
                <MenubarRadioItem
                  value="vs-dark"
                  onClick={() => setIsDarkTheme(true)}
                >
                  vs-dark
                </MenubarRadioItem>
                <MenubarRadioItem
                  value="light"
                  onClick={() => setIsDarkTheme(false)}
                >
                  light
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          {/* Language Selector */}
          {/* <MenubarMenu>
            <MenubarTrigger className="font-bold text-[1rem]">
              Select Programming Languages
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem disabled>Languages</MenubarItem>
              <MenubarSeparator />
              <MenubarRadioGroup
                value={language}
                onValueChange={(value) =>
                  setLanguage(value as SupportedLanguages)
                }
              >
                {languages.map(([lang, version], index) => (
                  <MenubarRadioItem key={`${lang}-${index}`} value={lang}>
                    {lang}
                    <p className="ml-2 text-gray-500">{version}</p>
                  </MenubarRadioItem>
                ))}
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu> */}
        </Menubar>
      </div>

      {/* Run Button */}
      {language == "reactjs" ? (
        <Button
          variant="secondary"
          className="bg-green-700 text-white font-bold text-[1rem]"
          onClick={() => setRunReactOutput(true)}
        >
          Run React Code
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="bg-green-700 text-white font-bold w-[6rem] text-[1rem]"
          onClick={runCode}
        >
          Run
        </Button>
      )}
    </div>
  );
}
