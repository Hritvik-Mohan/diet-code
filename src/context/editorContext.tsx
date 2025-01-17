import React, { createContext, useContext } from "react";
import { EditorContextProps, SupportedLanguages, UseEditorContextReturnType } from "@/index.d";

const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fileName, setFileName] = React.useState("script.js");
  const [language, setLanguage] = React.useState<SupportedLanguages>("javascript");
  const [code, setCode] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [isReactProject, setIsReactProject] = React.useState(true);
  const [isDarkTheme, setIsDarkTheme] = React.useState(true); 
  const [runReactOutput, setRunReactOutput] = React.useState(false);

  return (
    <EditorContext.Provider
      value={{
        fileName,
        setFileName,
        language,
        setLanguage,
        code,
        setCode,
        output,
        setOutput,
        loader,
        setLoader,
        isReactProject,
        setIsReactProject,
        isDarkTheme, 
        setIsDarkTheme,
        runReactOutput, 
        setRunReactOutput
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = (): UseEditorContextReturnType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within EditorProvider");
  }
  return context;
};
