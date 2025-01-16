import CodeEditor from "@/components/Editor/CodeEditor";
import EditorToolBar from "@/components/Editor/EditorToolBar";
import Sidebar from "@/components/Editor/Sidebar";
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Editor() {
//   const [fileName, setFileName] = useState("script.js");
//   const file = files[fileName];

  return (
    <div>
      <EditorToolBar />
      <PanelGroup direction="horizontal">
        <Panel defaultSize={15} minSize={5}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle className="w-[3px] hover:w-[8px] bg-[#414141]" />
        <Panel defaultSize={70} minSize={20}>
          <CodeEditor />
        </Panel>
      </PanelGroup>
    </div>
  );
}
