import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { files } from "../files/fileData";
import { useEditorContext } from "@/context/editorContext";
import { EditorRef, MonacoEditorOptions, EditorInstance } from "@/index";

export default function CodeEditor() {
  const editorRef: EditorRef = useRef(null);
  const [value, setValue] = useState("");
  const { language, code, setCode, isDarkTheme } = useEditorContext();

  useEffect(() => {
    if (language && files[language]) {
      setValue(files[language]);
    }

    if (editorRef.current) {
      setCode(editorRef.current.getValue() || "");
    }
  }, [language]);

  const onMount = (editor: EditorInstance) => {
    editorRef.current = editor;
    editor.focus();
    setCode(editorRef.current.getValue());
  };

  const editorOptions: MonacoEditorOptions = {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  };

  const handleEditorChange = (newValue: string | undefined) => {
    setValue(newValue || "");
    setCode(editorRef.current.getValue());
  };

  return (
    <div className="bottom-b-2 h-full">
      {value && (
        <Editor
          height="100%"
          defaultLanguage={language === "reactjs" ? "javascript" : language}
          path={`${language}-file`}
          theme={`${isDarkTheme ? "vs-dark" : "light"}`}
          onChange={handleEditorChange}
          value={code}
          onMount={onMount}
          options={editorOptions}
        ></Editor>
      )}
    </div>
  );
}
