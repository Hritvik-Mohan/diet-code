import React, { createContext, useContext } from "react";

interface EditorContextProps {
    fileName: string;
    setFileName: (fileName: string) => void;
    language: string;
    setLanguage: (language: string) => void;
}

const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fileName, setFileName] = React.useState("script.js");
    const [language, setLanguage] = React.useState("javascript");

    return (
        <EditorContext.Provider value={{ fileName, setFileName, language, setLanguage }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("useEditorContext must be used within EditorProvider");
    }
    return context;
}