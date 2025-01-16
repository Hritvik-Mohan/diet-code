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

const languages = Object.entries(LANGUAGE_VERSIONS);
console.log(languages);

export default function EditorToolBar() {
  const [position, setPosition] = React.useState("bottom");

  const { language, setLanguage } = useEditorContext();

  console.log(language);

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
          <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
            {languages.map(([lang, version], index) => (
              <DropdownMenuRadioItem key={`${lang}-${index}`} value={lang}>
                {lang}
                <p className="ml-2 text-gray-500">{version}</p>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="outline">Run</Button>
    </div>
  );
}
