import { Editor, DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
// import { files } from "../files/fileData";
import { useEditorContext } from "@/context/editorContext";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const [value, setValue] = useState('');
  const [fileName, setFileName] = useState("script.js");

  type FileType = {
    name: string;
    language: string;
    value: string;
  };

  const files: { [key: string]: FileType } = {
    "script.js": {
      name: "script.js",
      language: "javascript",
      value: `// Some JavaScript code example\nconsole.log('Hello, world!');`,
    },
    "style.css": {
      name: "style.css",
      language: "css",
      value: `/* Some CSS code example */\nbody { background-color: lightblue; }`,
    },
    "index.html": {
      name: "index.html",
      language: "html",
      value: `<!-- Some HTML code example -->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Monaco Editor</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n  </body>\n</html>`,
    },
  };

  const file = files[fileName];

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  }

  const { language } = useEditorContext();

  console.log(language);

  return (
    <>
      <Button
        disabled={fileName === "script.js"}
        onClick={() => setFileName("script.js")}
        variant="secondary"
      >
        script.js
      </Button>
      <Button
        disabled={fileName === "style.css"}
        onClick={() => setFileName("style.css")}
        variant="secondary"
      >
        style.css
      </Button>
      <Button
        disabled={fileName === "index.html"}
        onClick={() => setFileName("index.html")}
        variant="secondary"
      >
        index.html
      </Button>
      <Editor
        height="90vh"
        defaultLanguage={file.language}
        defaultValue={file.value}
        path={file.name}
        theme="vs-dark"
        onChange={(value) => setValue(value)}
        value={value}
        onMount={onMount}
      ></Editor>
    </>
  );
}
