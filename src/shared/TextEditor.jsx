import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor({ initialText, handleDescriptionChange }) {
  const [text, setText] = useState(initialText);

  const handleChange = (content) => {
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
