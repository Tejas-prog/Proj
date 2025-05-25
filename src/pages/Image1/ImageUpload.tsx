import React, { useState } from "react";
import "./Image.css";

const ImageUpload = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setSubmitted(false);
    }
  };

  const handleSubmit = () => {
    if (fileName) {
      setSubmitted(true);
    }
  };

  return (
    <div className="image-container">
      <h2 className="image-title">Upload Image</h2>

      <input
        type="file"
        accept="image/*"
        className="file-input"
        onChange={handleFileChange}
      />

      {fileName && <p className="file-name">Selected File: {fileName}</p>}

      {fileName && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}

      {submitted && (
        <p className="coming-soon">🚧 Feature coming soon 🚧</p>
      )}
    </div>
  );
};

export default ImageUpload;
