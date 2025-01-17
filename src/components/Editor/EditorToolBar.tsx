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
import { LANGUAGE_VERSIONS } from "../files/fileData";
import { useEditorContext } from "@/context/editorContext";
import { executeCode } from "@/utils/api";
import { SupportedLanguages, ExecuteCodeResponse } from "@/index";
import Link from "next/link";
import { RiJavascriptFill } from "react-icons/ri";
import { IoLogoReact } from "react-icons/io5";
import { BiLogoTypescript } from "react-icons/bi";
import { AiOutlineJava } from "react-icons/ai";
import { IoLogoPython } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";

import { useRouter } from "next/router";

const languages = Object.entries(LANGUAGE_VERSIONS);

export default function EditorToolBar() {
  const [position, setPosition] = useState("bottom");
  const { language, code, setLanguage, setOutput, setLoader, setIsDarkTheme, setRunReactOutput } =
    useEditorContext();
  const [icon, setIcon] = useState<React.ReactElement | null>(null);
  const router = useRouter();

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
      console.log(response);
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
      default:
        return <CiFileOn size="2rem" color="white" />;
    }
  };

  useEffect(() => {
    const icon = languageIcon();
    setIcon(icon);
  }, [language]);

  // useEffect(() => {
  //   initializeEsbuild();
  // }, []);

//   const handleRunCode = async () => {
//     if (language === ("reactjs" as SupportedLanguages)) {
//       try {
//         const transformedCode = await executeReactCode(code);
//         const htmlTemplate = `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>React Output</title>
//     <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
//   </head>
//   <body>
//     <div id="react-container"></div>
//     <script>
//       (function() {
//         try {
//           ${transformedCode} // Insert the transformed React code here
//           if (typeof App === "undefined") {
//             throw new Error("App component is not defined. Ensure your code includes a valid App component.");
//           }
//           ReactDOM.render(React.createElement(App), document.getElementById('react-container'));
//         } catch (err) {
//           document.getElementById('react-container').innerHTML = "<pre style='color: red;'>Error: " + err.message + "</pre>";
//         }
//       })();
//     </script>
//   </body>
//   </html>
// `;

//         if (iframeRef.current) {
//           const iframeDoc =
//             iframeRef.current.contentDocument ||
//             iframeRef.current.contentWindow?.document;
//           if (iframeDoc) {
//             iframeDoc.open();
//             iframeDoc.write(htmlTemplate);
//             iframeDoc.close();
//           }
//         }
//         setOutput(htmlTemplate);
//         setIframeOutput(iframeRef);
//         console.log("React code executed.");
//       } catch (error) {
//         console.error(error);
//         setOutput("Error executing React code: " + (error as Error).message);
//       }
//     } else {
//       setOutput("Not a React file");
//     }
//   };

  return (
    <div className="flex items-center justify-between gap-6 p-4 bg-gray-800 text-[1rem]">
      <div className="flex items-center gap-4">
        <div>
          {router.pathname == "/react-editor" ? (
            <IoLogoReact size="2rem" color="pink" />
          ) : (
            <>{icon}</>
          )}
        </div>
        <Menubar className="bg-gray-800 text-white border-none">
          <MenubarMenu>
            <MenubarTrigger className="font-bold text-[1rem]">
              File
            </MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup>
                <Link href="/editor">
                  <MenubarRadioItem value="vs-dark">
                    New Code File
                  </MenubarRadioItem>
                </Link>
                <Link href="/react-editor">
                  <MenubarRadioItem value="light">
                    React Editor
                  </MenubarRadioItem>
                </Link>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          {/* Theme Selector */}
          <MenubarMenu>
            <MenubarTrigger className="font-bold text-[1rem]">
              Switch Themes
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
          <MenubarMenu>
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
          </MenubarMenu>
        </Menubar>
      </div>

      {/* Run Button */}
      {router.pathname == "/react-editor" ? (
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
      {/* <iframe
        ref={iframeRef}
        title="Code Output"
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid #ccc",
          marginTop: "10px",
        }}
      /> */}
    </div>
  );
}
