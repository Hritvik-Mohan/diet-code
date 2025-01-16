import CodeEditor from "@/components/Editor/CodeEditor";
import EditorToolBar from "@/components/Editor/EditorToolBar";
import Output from "@/components/Editor/Output";
import ReactOutputWindow from "@/components/Editor/ReactOutputWindow";
import Sidebar from "@/components/Editor/Sidebar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

export default function Editor() {
  return (
    <div className="h-screen flex flex-col">
      <EditorToolBar />
      <PanelGroup direction="horizontal" className="flex-1">
        <Panel defaultSize={15} minSize={5}>
          <Sidebar />
        </Panel>
        <PanelResizeHandle className="w-[3px] hover:w-[8px] bg-[#414141]" />
        <Panel
          defaultSize={70}
          minSize={20}
          className="flex flex-col gap-[2rem]"
        >
          <CodeEditor />
        </Panel>
          <Panel defaultSize={50} minSize={20}>
            <PanelGroup direction="vertical" className="">
              <Panel>
                <ReactOutputWindow />
              </Panel>
              <PanelResizeHandle />
              <Panel>
                <Output />
              </Panel>
            </PanelGroup>
          </Panel>
      </PanelGroup>
    </div>
  );
}
