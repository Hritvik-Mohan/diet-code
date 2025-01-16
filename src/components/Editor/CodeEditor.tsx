import { Editor } from '@monaco-editor/react'
import React from 'react'

export default function CodeEditor() {
  return (
    <Editor height="90vh" defaultLanguage='javascript' defaultValue='// some comment'></Editor>
  )
}
