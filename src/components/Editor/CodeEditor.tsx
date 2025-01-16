import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import { files } from "../files/fileData";
import { useEditorContext } from "@/context/editorContext";
import { EditorRef, MonacoEditorOptions, EditorInstance } from "@/index";

export default function CodeEditor() {
  const editorRef: EditorRef = useRef(null);
  const [value, setValue] = useState('');
  const { language, setCode, isDarkTheme } = useEditorContext();

  useEffect(() => {
    if (language && files[language]) {
      setValue(files[language])
    }
  }, [language])

  const onMount = (editor: EditorInstance) => {
    editorRef.current = editor;
    editor.focus();
  }

  console.log(value);

  const editorOptions: MonacoEditorOptions = {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  }

  const handleEditorChange = (newValue: string | undefined) => {
    setValue(newValue || '');
    setCode(editorRef.current.getValue() || '');
  };

  // console.log(code.current.getValue());
  return (
    <div className="bottom-b-2 h-full">
      <Editor
        height="100%"
        defaultLanguage={language}
        path={`${language}-file`}
        theme={`${isDarkTheme ? 'vs-dark' : 'light' }`}
        onChange={handleEditorChange}
        value={value}
        onMount={onMount}
        options={editorOptions}
      ></Editor>
    </div>
  );
}
