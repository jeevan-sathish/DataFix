import { useState } from "react";
import { FaDatabase, FaUpload, FaDownload } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [before, setBefore] = useState(null);
  const [after, setAfter] = useState(null);
  const [csv, setCsv] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Upload file");

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    setData(result.data);
    setBefore(result.before);
    setAfter(result.after);
    setCsv(result.csv);

    setLoading(false);
  };

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cleaned_dataset.csv";
    a.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}

      <header className="bg-indigo-600 text-white p-4 shadow">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <FaDatabase /> DataFix
        </div>
      </header>

      {/* Main */}

      <main className="flex-1 p-10">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Clean Your Dataset Instantly
          </h1>

          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 rounded"
            />

            <button
              onClick={uploadFile}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              <FaUpload /> Upload Dataset
            </button>
          </div>

          {loading && (
            <div className="flex justify-center mt-6">
              <ClipLoader size={40} />
            </div>
          )}

          {/* Data Preview */}

          {data && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-3">
                Cleaned Data Preview
              </h2>

              <pre className="bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(data, null, 2)}
              </pre>

              <button
                onClick={downloadCSV}
                className="mt-4 flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                <FaDownload /> Download Cleaned CSV
              </button>
            </div>
          )}

          {/* Dataset Stats */}

          {before && after && (
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div>
                <h3 className="font-bold text-lg mb-2">Before Cleaning</h3>

                <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(before, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">After Cleaning</h3>

                <pre className="bg-green-50 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(after, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}

      <footer className="bg-gray-900 text-white text-center p-4">
        Built with love 💗 by jeevan S
      </footer>
    </div>
  );
}
