import React, { useEffect, useRef } from "react";
import { useEditorContext } from "@/context/editorContext";
import { executeReactCode, initializeEsbuild } from "@/utils/reactExecutor";
import { SupportedLanguages } from "@/index";

export default function ReactOutputWindow() {
  const { language, code, setOutput, runReactOutput, setRunReactOutput } = useEditorContext();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    initializeEsbuild();
  }, []);

  const handleRunCode = async () => {
    if (language === ("reactjs" as SupportedLanguages)) {
      try {
        const transformedCode = await executeReactCode(code);
        const htmlTemplate = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React Output</title>
            <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
          </head>
          <body>
            <div id="react-container"></div>
            <script>
              (function() {
                try {
                  ${transformedCode} // Insert the transformed React code here
                  if (typeof App === "undefined") {
                    throw new Error("App component is not defined. Ensure your code includes a valid App component.");
                  }
                  ReactDOM.render(React.createElement(App), document.getElementById('react-container'));
                } catch (err) {
                  document.getElementById('react-container').innerHTML = "<pre style='color: red;'>Error: " + err.message + "</pre>";
                }
              })();
            </script>
          </body>
          </html>
        `;

        if (iframeRef.current) {
          const iframeDoc =
            iframeRef.current.contentDocument ||
            iframeRef.current.contentWindow?.document;
          if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(htmlTemplate);
            iframeDoc.close();
          }
        }
        setOutput(htmlTemplate);
        setRunReactOutput(false);
      } catch (error) {
        console.error(error);
        setOutput("Error executing React code: " + (error as Error).message);
      }
    } else {
      setOutput("Not a React file");
    }
  };

  if (runReactOutput) {
    handleRunCode();
  }

  return (
    <div className="h-full w-full">
      <iframe
        ref={iframeRef}
        title="Code Output"
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}
