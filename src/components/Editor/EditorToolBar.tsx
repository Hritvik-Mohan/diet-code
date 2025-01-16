import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_VERSIONS } from "../files/fileData";
import { useEditorContext } from "@/context/editorContext";
import { executeCode } from "@/utils/api";
import { SupportedLanguages, ExecuteCodeResponse } from "@/index";

const languages = Object.entries(LANGUAGE_VERSIONS);

export default function EditorToolBar() {
  const [position, setPosition] = React.useState("bottom");

  const { language, code, setLanguage, setOutput } = useEditorContext();

  const runCode = async () => {
    if (!code) return;
    try {
      const response = await executeCode(language as SupportedLanguages, code) as ExecuteCodeResponse;
      setOutput(response.run.output);
      console.log(response);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  return (
    <div className="flex items-center justify-evenly p-2 bg-gray-800">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Switch themes</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="vs-dark">
              vs-dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light">light</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Select programming languages</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Languages</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as SupportedLanguages)}>
            {languages.map(([lang, version], index) => (
              <DropdownMenuRadioItem key={`${lang}-${index}`} value={lang}>
                {lang}
                <p className="ml-2 text-gray-500">{version}</p>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline" onClick={runCode}>Run</Button>
    </div>
  );
}
