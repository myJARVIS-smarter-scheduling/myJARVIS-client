import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  initialText: string;
  handleDescriptionChange: (content: string) => void;
}

function TextEditor({ initialText, handleDescriptionChange }: TextEditorProps) {
  const [text, setText] = useState(initialText);

  const handleChange = (content: string) => {
    setText(content);
    handleDescriptionChange(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={text}
      onChange={handleChange}
      style={{ height: "200px" }}
    />
  );
}

export default TextEditor;
