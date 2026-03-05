import React, { useState } from "react";

const App = () => {

  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData
    });

    const result = await res.json();

    console.log(result);

    setData(result.data);
  };

  return (
    <div>

      <h1>Upload CSV</h1>

      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>CSV Data</h2>

      {data.map((row, index) => (
        <pre key={index}>
          {JSON.stringify(row)}
        </pre>
      ))}

    </div>
  );
};

export default App;