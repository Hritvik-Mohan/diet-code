import { Editor } from "@monaco-editor/react";

export default function Home() {
  return (
    <div>
      <Editor height="90vh" defaultLanguage="javascript" defaultPath="// some comment"></Editor>
    </div>
  );
}
