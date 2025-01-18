export type SupportedLanguages = 'javascript' | "typescript" | "python" | "java" | "reactjs";

export interface LangaugeVersions {
    [language: string]: string;
}

export interface EditorContextProps {
    fileName: string;
    setFileName: (fileName: string) => void;
    language: SupportedLanguages;
    setLanguage: (language: SupportedLanguages) => void;
    code: string;
    setCode: (code: string) => void;
    output: string;
    setOutput: (output: string) => void;
    loader: boolean;
    setLoader: (loader: boolean) => void;
    isReactProject: boolean;
    setIsReactProject: (isReactProject: boolean) => void;
    isDarkTheme: boolean;
    setIsDarkTheme: (isDarkTheme: boolean) => void;
    runReactOutput: boolean;
    setRunReactOutput: (runReactOutput: boolean) => void;
    files: Array, 
    setFiles: (files: Array) => void;
}

export type UseEditorContextReturnType = EditorContextProps;

export interface ExecuteCodeResponse {
    run: {
        output: string;
    };
}

export interface EditorInstance {
    focus: () => void;
    getValue: () => string;
}

export interface MonacoEditorOptions {
    fontSize: number;
    lineHeight: number;
    letterSpacing: number;
}

export interface MonacoEditorProps {
    height: string | number;
    defaultLanguage: SupportedLanguages;
    path: string;
    theme: string;
    onChange: (newValue: string) => void;
    value: string;
    onMount: (editor: EditorContextProps.IStandaloneCodeEditor) => void;
    options: MonacoEditorOptions;
}

export interface FileObject {
    [key: string]: {
      code: string;
      extension: string;
      language: string;
    };
  }

export type EditorRef = React.MutableRefObject<editor.IStandaloneCodeEditor | null>;