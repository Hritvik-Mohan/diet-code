import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { EditorProvider } from "@/context/editorContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <EditorProvider>
    <Component {...pageProps} />
  </EditorProvider>
);
}
